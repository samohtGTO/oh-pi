#!/usr/bin/env node

// Thin compatibility package: `@ifi/oh-pi` is the public npx entrypoint,
// while `@ifi/oh-pi-cli` owns the interactive installer implementation.
import { INSTALLER_PACKAGES } from "./package-list.mjs";

if (process.argv.includes("--help") || process.argv.includes("-h")) {
	console.log(
		`
oh-pi — interactive setup for pi-coding-agent

Usage:
  npx @ifi/oh-pi              Launch the interactive TUI configurator
  npx @ifi/oh-pi --yes        Run with defaults / skip confirmation prompts
  npx @ifi/oh-pi --help       Show this help

The interactive configurator lets you select extensions, themes, prompts, skills,
and supporting oh-pi packages before installing them into pi.

Available installer packages:
${INSTALLER_PACKAGES.map((pkg) => `  • ${pkg}`).join("\n")}
`.trim(),
	);
	process.exit(0);
}

await import("@ifi/oh-pi-cli/dist/bin/oh-pi.js");
