# Architecture

## Runtime topology
- `apps/web`: React client; renders lobby and game UI.
- `apps/server`: Express + Socket.IO; authoritative room state and events.
- `packages/shared`: event names and transport-safe TypeScript contracts.
- `packages/game-rules`: pure scoring and mode rules (to be expanded).
- PostgreSQL: planned durable users, profiles, stats and match history.
- Redis: planned Socket.IO adapter and ephemeral distributed room state.

## Trust boundaries
The browser is untrusted. It may request actions, but it never decides scores, timers, role assignments, or phase transitions. The server validates every event against the authenticated socket and current room phase.

## Initial socket events
Client to server:
- `room:create`
- `room:join`
- `room:ready`
- `match:start`
- `match:submit`

Server to client:
- `room:state`
- `room:error`
- `match:state`
- `match:results`

## Planned persistence
Users, sessions, profiles, friendships, room history, match results, achievements, reports and moderation actions.

## Scaling
Start with one Node process. Add Redis adapter and shared ephemeral state only when multiple server instances are needed. Use sticky sessions where required by the deployment topology.
