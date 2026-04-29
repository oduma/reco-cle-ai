# Clementine Remote Integration — Decision Record

## Status: Abandoned

Phase 4 originally planned to control the Clementine player directly using its **TCP/protobuf Remote protocol** (`INSERT_URLS` message on port 5500).

The integration was implemented and fully wired (backend TCP service, protobuf schema, Angular playlist service, controller). It was abandoned after testing confirmed a **crash bug in the Clementine player itself**: Clementine crashes in its `INSERT_URLS` signal handler regardless of the message content, playlist ID, or connection handshake sequence. The bug is reproducible and not caused by the client code.

## What replaced it

Phase 4 was redesigned as a **copy-to-clipboard** action on local track cards. Clicking the icon on a local (blue) card copies `Artist – Title` to the system clipboard using the browser Clipboard API. No network calls, no external dependencies.

See the phased development plan for the current Phase 4 definition.
