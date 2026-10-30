import { useState } from "react";

const modes = [
  ["CREATIVE CHAOS", "Draw, improvise and decode the unexpected.", "✦"],
  ["MYSTERY PROTOCOL", "Uncover secrets, inspect clues and vote.", "⌕"],
  ["WORD WARS", "Race through riddles and word challenges.", "⌘"],
  ["HIDDEN IDENTITY", "Protect your objective. Read the room.", "◈"]
];

export default function App() {
  const [name, setName] = useState("");
  const [mode, setMode] = useState(0);
  const [roomCode, setRoomCode] = useState("");
  return <main className="shell">
    <nav><div className="brand-mark">P</div><span>PRISM <b>PROTOCOL</b></span><span className="nav-tag">CHAOS DIVISION</span></nav>
    <section className="hero">
      <p className="eyebrow">A NEW KIND OF PARTY GAME</p>
      <h1>ENTER THE<br/><span>CHAOS.</span></h1>
      <p className="intro">Four worlds. Eight players. One unpredictable match.<br/>Bring your friends. Expect the unexpected.</p>
      <div className="join-panel">
        <label htmlFor="player">YOUR PLAYER NAME</label>
        <input id="player" maxLength={20} placeholder="Enter a display name" value={name} onChange={e => setName(e.target.value)} />
        <div className="actions">
          <button className="primary" onClick={() => alert(name.trim() ? "Lobby creation will connect to the multiplayer server in the next implementation milestone." : "Enter a player name first.")}>CREATE ROOM ↗</button>
          <div className="room-join"><input aria-label="Room code" maxLength={6} placeholder="ROOM CODE" value={roomCode} onChange={e => setRoomCode(e.target.value.toUpperCase())}/><button onClick={() => alert("Room joining will be connected in the next implementation milestone.")}>JOIN</button></div>
        </div>
      </div>
    </section>
    <section className="modes"><div className="section-heading"><span>SELECT YOUR REALITY</span><small>01 — GAME MODES</small></div>
      <div className="mode-grid">{modes.map(([title, desc, icon], i) => <button key={title} onClick={() => setMode(i)} className={`mode-card ${mode === i ? "selected" : ""}`}><span className="mode-icon">{icon}</span><strong>{title}</strong><small>{desc}</small><em>{mode === i ? "SELECTED" : "EXPLORE MODE"} ↗</em></button>)}</div>
    </section>
    <footer><span>© PRISM PROTOCOL</span><span>PLAY DIFFERENT.</span><span>2–8 PLAYERS · WEB + MOBILE</span></footer>
  </main>;
}
