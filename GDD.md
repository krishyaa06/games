# Game Design Document

## Product vision
PRISM: CHAOS PROTOCOL is a fast, social, 2–8 player party-game platform. It borrows the low-friction room-and-round structure of browser party games while using original modes, rules, presentation, and progression.

## Audience and session
- Friends and casual groups
- Target session: 10–20 minutes
- Target room size: 2–8 players
- Web-first, responsive and installable as a PWA later

## Core match loop
1. Create or join a public/private room.
2. Select a mode and round settings.
3. Server validates readiness and starts the match.
4. Players complete timed mode-specific objectives.
5. Server validates submissions and calculates points.
6. Results, XP and achievements are shown.

## Modes
### Creative Chaos
A rotating player receives a prompt and creates a drawing; others submit guesses. Scoring rewards correct guesses and prompt completion. Drawing tools and prompt packs are original.

### Mystery Protocol
Players receive private roles and public clues. The group discusses evidence and votes. The server privately distributes role data and validates voting.

### Word Wars
Players solve timed word, association and riddle challenges. The server validates answers and applies time/round scoring.

### Hidden Identity
Players receive secret identities and objectives. Public actions and clue rounds create deduction opportunities. Private objectives are never broadcast to other players.

## Progression
- XP and levels
- Cosmetic-only avatar unlocks
- Achievements and statistics
- Match history and seasonal leaderboards

## Room rules
- 2–8 players
- Host-controlled mode and settings
- Private room code and public matchmaking
- Reconnect grace period
- Host migration
- Server-authoritative timer, phase and score

## Safety and moderation
- Mute, block, report and room kick controls
- Chat rate limits and input length limits
- No public display of private role data
- Host controls cannot bypass server-side game validation

## MVP acceptance criteria
- A player can create a room and share a code.
- Up to 8 clients can join and see synchronized lobby state.
- Host can start and end a basic round.
- Server owns room membership, phase and score.
- Disconnected players can reconnect during a grace period.
- Layout works on phone and desktop.
