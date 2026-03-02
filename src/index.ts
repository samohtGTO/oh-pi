import * as p from "@clack/prompts";
import chalk from "chalk";
import { selectLanguage, getLocale } from "./i18n.js";
import { t } from "./i18n.js";
import { welcome } from "./tui/welcome.js";
import { selectMode } from "./tui/mode-select.js";
import { setupProviders, type ProviderSetupResult } from "./tui/provider-setup.js";
import { selectPreset } from "./tui/preset-select.js";
import { selectTheme } from "./tui/theme-select.js";
import { selectKeybindings } from "./tui/keybinding-select.js";
import { selectExtensions } from "./tui/extension-select.js";
import { selectAgents } from "./tui/agents-select.js";
import { confirmApply } from "./tui/confirm-apply.js";
import { detectEnv, type EnvInfo } from "./utils/detect.js";
import type { OhPConfig } from "./types.js";
import { EXTENSIONS } from "./registry.js";

type CustomTab = "providers" | "appearance" | "features" | "agents" | "finish";

/**
 * 主入口函数。检测环境、选择语言、展示欢迎界面，根据用户选择的模式执行对应配置流程，最终确认并应用配置。
 */
export async function run() {
  const env = await detectEnv();
  await selectLanguage();
  welcome(env);

  const mode = await selectMode(env);
  let config: OhPConfig;

  if (mode === "quick") {
    config = await quickFlow(env);
  } else if (mode === "preset") {
    config = await presetFlow(env);
  } else {
    config = await customFlow(env);
  }

  config.locale = getLocale();
  await confirmApply(config, env);
}

/**
 * 快速配置流程。仅需设置提供商和主题，其余选项使用推荐默认值。
 * @param env - 当前检测到的环境信息
 * @returns 生成的配置对象
 */
async function quickFlow(env: EnvInfo): Promise<OhPConfig> {
  const providerSetup = await setupProviders(env);
  return {
    ...providerSetup,
    theme: "dark",
    keybindings: "default",
    extensions: ["safe-guard", "git-guard", "auto-session-name", "custom-footer", "compact-header", "auto-update"],
    prompts: ["review", "fix", "explain", "commit", "test"],
    agents: "general-developer",
    thinking: "medium",
  };
}

/**
 * 预设配置流程。用户选择一个预设方案，再配置提供商，合并生成最终配置。
 * @param env - 当前检测到的环境信息
 * @returns 生成的配置对象
 */
async function presetFlow(env: EnvInfo): Promise<OhPConfig> {
  const preset = await selectPreset();
  const providerSetup = await setupProviders(env);
  return { ...preset, ...providerSetup };
}

/**
 * 自定义配置流程。用户逐项选择主题、快捷键、扩展、代理等，并可配置高级选项（如自动压缩阈值）。
 * @param env - 当前检测到的环境信息
 * @returns 生成的配置对象
 */
async function customFlow(env: EnvInfo): Promise<OhPConfig> {
  const defaultExtensions = EXTENSIONS.filter(e => e.default).map(e => e.name);
  let providerSetup: ProviderSetupResult | null = null;
  let theme = "dark";
  let keybindings = "default";
  let extensions = defaultExtensions;
  let agents = "general-developer";

  while (true) {
    const tabBar = [
      chalk.cyan(`[${t("custom.tabProviders")}]`),
      chalk.cyan(`[${t("custom.tabAppearance")}]`),
      chalk.cyan(`[${t("custom.tabFeatures")}]`),
      chalk.cyan(`[${t("custom.tabAgents")}]`),
      chalk.green(`[${t("custom.tabFinish")}]`),
    ].join(chalk.gray("  |  "));
    const providerStatus = summarizeProviders(providerSetup);
    p.note(`${tabBar}\n${providerStatus}`, t("custom.tabHeader"));

    const tab = await p.select({
      message: t("custom.tabPrompt"),
      options: [
        { value: "providers" as CustomTab, label: t("custom.tabProviders"), hint: providerStatus },
        { value: "appearance" as CustomTab, label: t("custom.tabAppearance"), hint: `${theme} · ${keybindings}` },
        { value: "features" as CustomTab, label: t("custom.tabFeatures"), hint: t("custom.tabFeaturesHint", { count: extensions.length }) },
        { value: "agents" as CustomTab, label: t("custom.tabAgents"), hint: agents },
        { value: "finish" as CustomTab, label: t("custom.tabFinish"), hint: t("custom.tabFinishHint") },
      ],
    });
    if (p.isCancel(tab)) { p.cancel(t("cancelled")); process.exit(0); }

    if (tab === "providers") {
      providerSetup = await setupProviders(env);
      continue;
    }
    if (tab === "appearance") {
      theme = await selectTheme();
      keybindings = await selectKeybindings();
      continue;
    }
    if (tab === "features") {
      extensions = await selectExtensions();
      continue;
    }
    if (tab === "agents") {
      agents = await selectAgents();
      continue;
    }
    if (!providerSetup) {
      p.log.warn(t("custom.needProviders"));
      continue;
    }
    break;
  }

  return {
    ...providerSetup,
    theme,
    keybindings,
    extensions,
    prompts: ["review", "fix", "explain", "commit", "test", "refactor", "optimize", "security", "document", "pr"],
    agents,
    thinking: "medium",
  };
}

function summarizeProviders(setup: ProviderSetupResult | null): string {
  if (!setup) return t("custom.providersUnset");
  if (setup.providerStrategy === "keep") return t("confirm.providerStrategyKeep");
  if (setup.providerStrategy === "add") {
    return setup.providers.length > 0
      ? t("custom.providersAdd", { list: setup.providers.map(p => p.name).join(", ") })
      : t("confirm.providerStrategyAdd");
  }
  if (setup.providers.length === 0) return t("confirm.providerStrategyReplace");
  return t("custom.providersReplace", { list: setup.providers.map(p => p.name).join(", ") });
}
