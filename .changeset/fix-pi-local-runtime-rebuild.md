---
default: patch
---

Fix `pnpm pi:local` so it rebuilds `@ifi/oh-pi-core` from the workspace root before syncing local runtime artifacts, avoiding misleading package-local pnpm failures during local source switching.
