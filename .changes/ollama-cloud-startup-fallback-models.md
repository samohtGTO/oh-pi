---
default: patch
---

Seed Ollama cloud fallback models during startup so scoped model filters can resolve known cloud models before async discovery completes.

- register fallback cloud models immediately on startup
- keep async public/authenticated discovery replacing the startup seed afterward
- add smoke coverage for the initial fallback model list
