---
default: major
---

# Add several new packages

Document the packages that have been created since the last tagged release (`v0.4.4`) so the next release notes explain what each new workspace package provides.

- `@ifi/pi-extension-adaptive-routing` (`packages/adaptive-routing`) adds optional adaptive and delegated model routing for pi, including routing policy support and evaluation tooling for selecting better models per task.
- `@ifi/pi-background-tasks` (`packages/background-tasks`) adds reactive background shell tasks with `/bg`, log viewing, keyboard access, and agent wakeups when long-running commands emit output.
- `@ifi/pi-diagnostics` (`packages/diagnostics`) adds prompt-completion diagnostics with timestamps, per-turn durations, live timing widgets, and observability for pi sessions.
- `@ifi/pi-provider-catalog` (`packages/providers`) adds an experimental multi-provider catalog backed by `models.dev`, including provider/model discovery and lazy API-key login flows.
- `@ifi/pi-provider-cursor` (`packages/cursor`) adds an experimental Cursor provider with OAuth login, model discovery, and direct AgentService streaming support.
- `@ifi/pi-provider-ollama` (`packages/ollama`) adds experimental Ollama local and cloud provider support, including local model discovery, Ollama Cloud login, model management, and streaming integration.
- `@ifi/pi-remote-tailscale` (`packages/pi-remote-tailscale`) adds secure remote session sharing over Tailscale HTTPS with WebSocket transport, PTY support, QR codes, token auth, and TUI status widgets.
- `@ifi/pi-bash-live-view` (`packages/pi-bash-live-view`) adds PTY-backed live bash execution with a real-time terminal widget, `/bash-pty`, and a `bash_live_view` tool for interactive command output.
- `@ifi/pi-pretty` (`packages/pi-pretty`) adds prettier terminal output for pi, including Shiki-highlighted file reads, colored bash summaries, tree-view directory listings, icons, and enhanced search/read tools.
- `@ifi/pi-analytics-extension` (`packages/analytics-extension`) adds analytics tracking for pi sessions with `/analytics` terminal stats, `/analytics-dashboard`, model/token/cost capture, and SQLite persistence.
- `@ifi/pi-analytics-db` (`packages/analytics-db`) adds the shared SQLite database layer for analytics, including Drizzle ORM schema, migrations, and typed query helpers for sessions, turns, models, providers, codebases, and aggregates.
- `@ifi/pi-analytics-dashboard` (`packages/analytics-dashboard`) adds a private React and Vite dashboard for visualizing AI usage across overview, model, codebase, and insight pages.
- `@ifi/oh-pi-docs` (`packages/docs`) adds the private documentation site package for developing and building the oh-pi documentation site.
