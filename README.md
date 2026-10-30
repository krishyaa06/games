# PRISM: CHAOS PROTOCOL

An original 2–8 player browser-based multiplayer party game platform by Prism Protocol.

## Planned game modes
- Creative Chaos — drawing and guessing challenges
- Mystery Protocol — secret roles and clue deduction
- Word Wars — timed word and riddle challenges
- Hidden Identity — secret objectives and social deduction

## Stack
- Web: React, TypeScript, Vite
- Realtime: Node.js, Express, Socket.IO
- Shared contracts: TypeScript
- Planned persistence: PostgreSQL
- Planned horizontal scaling: Redis + Socket.IO adapter

## Development
Requirements: Node.js 20+ and pnpm.

```bash
pnpm install
pnpm dev
```

The initial scaffold is intentionally small. Authentication, persistence, matchmaking, moderation, and production deployment are roadmap items, not yet implemented.
