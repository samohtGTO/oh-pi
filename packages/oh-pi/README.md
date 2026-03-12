# @ifi/oh-pi

> All-in-one setup for pi-coding-agent — extensions, themes, prompts, skills, and ant-colony swarm.

## Install

Install each package directly so pi can load extensions with proper module resolution:

```bash
pi install npm:@ifi/oh-pi-extensions
pi install npm:@ifi/oh-pi-ant-colony
pi install npm:@ifi/oh-pi-themes
pi install npm:@ifi/oh-pi-prompts
pi install npm:@ifi/oh-pi-skills
```

Or install everything at once:

```bash
pi install npm:@ifi/oh-pi-extensions && pi install npm:@ifi/oh-pi-ant-colony && pi install npm:@ifi/oh-pi-themes && pi install npm:@ifi/oh-pi-prompts && pi install npm:@ifi/oh-pi-skills
```

## Packages

| Package                 | Contents                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| `@ifi/oh-pi-extensions` | safe-guard, git-guard, auto-session, custom-footer, compact-header, auto-update, bg-process |
| `@ifi/oh-pi-ant-colony` | Multi-agent swarm extension (`/colony`, colony commands)                                    |
| `@ifi/oh-pi-themes`     | cyberpunk, nord, gruvbox, tokyo-night, catppuccin, oh-p-dark                                |
| `@ifi/oh-pi-prompts`    | review, fix, explain, refactor, test, commit, pr, and more                                  |
| `@ifi/oh-pi-skills`     | web-search, debug-helper, git-workflow, rust-workspace-bootstrap, and more                  |
| `@ifi/oh-pi-agents`     | AGENTS.md templates for common roles                                                        |

> **Note:** `safe-guard` is included in `@ifi/oh-pi-extensions` but disabled by default. Enable it
> via `pi config` if you want command/path safety prompts.

## TUI Configurator

```bash
npx @ifi/oh-pi-cli
```
