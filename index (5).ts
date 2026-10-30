export type GameMode =
  | "creative-chaos"
  | "mystery-protocol"
  | "word-wars"
  | "hidden-identity";

export type RoomPhase = "lobby" | "playing" | "results";

export interface PublicPlayer {
  id: string;
  displayName: string;
  ready: boolean;
  connected: boolean;
}

export interface RoomSnapshot {
  code: string;
  hostId: string;
  mode: GameMode;
  phase: RoomPhase;
  players: PublicPlayer[];
  maxPlayers: 8;
}

export interface ClientToServerEvents {
  "room:create": (payload: { displayName: string; mode: GameMode }, ack: (result: { ok: boolean; code?: string; error?: string }) => void) => void;
  "room:join": (payload: { code: string; displayName: string }, ack: (result: { ok: boolean; error?: string }) => void) => void;
  "room:ready": (payload: { ready: boolean }) => void;
  "match:start": () => void;
}

export interface ServerToClientEvents {
  "room:state": (snapshot: RoomSnapshot) => void;
  "room:error": (message: string) => void;
}
