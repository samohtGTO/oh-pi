---
default: patch
---

Reduce provider-catalog login clutter by switching to a paged `/providers login` flow that shows at most 10 providers at a time, lazily registers selected providers, and keeps persisted or env-configured providers available across sessions.
