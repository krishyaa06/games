import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import type { ClientToServerEvents, ServerToClientEvents, GameMode, RoomSnapshot } from "@prism/shared";

const app = express();
app.use(cors({ origin: process.env.WEB_ORIGIN?.split(",") ?? "*" }));
app.get("/health", (_req, res) => res.json({ ok: true, service: "prism-chaos-server" }));

const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: { origin: process.env.WEB_ORIGIN?.split(",") ?? "*", methods: ["GET", "POST"] }
});

type Player = { id: string; displayName: string; ready: boolean; connected: boolean };
type Room = { code: string; hostId: string; mode: GameMode; phase: "lobby" | "playing" | "results"; players: Player[] };
const rooms = new Map<string, Room>();

function makeCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
}
function snapshot(room: Room): RoomSnapshot {
  return { code: room.code, hostId: room.hostId, mode: room.mode, phase: room.phase,
    players: room.players.map(({ id, displayName, ready, connected }) => ({ id, displayName, ready, connected })),
    maxPlayers: 8 };
}
function publish(room: Room) { io.to(room.code).emit("room:state", snapshot(room)); }

io.on("connection", (socket) => {
  socket.on("room:create", ({ displayName, mode }, ack) => {
    const cleanName = displayName.trim().slice(0, 20);
    if (!cleanName) return ack({ ok: false, error: "Choose a display name." });
    let code = makeCode();
    while (rooms.has(code)) code = makeCode();
    const room: Room = { code, hostId: socket.id, mode, phase: "lobby",
      players: [{ id: socket.id, displayName: cleanName, ready: true, connected: true }] };
    rooms.set(code, room);
    socket.join(code);
    ack({ ok: true, code });
    publish(room);
  });

  socket.on("room:join", ({ code, displayName }, ack) => {
    const room = rooms.get(code.toUpperCase());
    const cleanName = displayName.trim().slice(0, 20);
    if (!room) return ack({ ok: false, error: "Room not found." });
    if (!cleanName) return ack({ ok: false, error: "Choose a display name." });
    if (room.phase !== "lobby") return ack({ ok: false, error: "This match has already started." });
    if (room.players.length >= 8) return ack({ ok: false, error: "Room is full." });
    room.players.push({ id: socket.id, displayName: cleanName, ready: false, connected: true });
    socket.join(room.code);
    ack({ ok: true });
    publish(room);
  });

  socket.on("room:ready", ({ ready }) => {
    for (const room of rooms.values()) {
      const player = room.players.find(p => p.id === socket.id);
      if (player && room.phase === "lobby") { player.ready = Boolean(ready); publish(room); break; }
    }
  });

  socket.on("match:start", () => {
    for (const room of rooms.values()) {
      if (room.hostId !== socket.id || room.phase !== "lobby") continue;
      if (room.players.length < 2 || room.players.some(p => !p.ready)) {
        socket.emit("room:error", "At least two players must join and everyone must be ready.");
        break;
      }
      room.phase = "playing";
      publish(room);
      break;
    }
  });

  socket.on("disconnect", () => {
    for (const room of rooms.values()) {
      const player = room.players.find(p => p.id === socket.id);
      if (player) { player.connected = false; publish(room); }
    }
  });
});

const port = Number(process.env.PORT ?? 3001);
httpServer.listen(port, () => console.log(`Prism server listening on ${port}`));
