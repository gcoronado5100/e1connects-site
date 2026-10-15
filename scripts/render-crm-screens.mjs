// Renders the CRM screens that the site shows as pictures into static markup and scoped CSS.
//
// The screens come from the CRM's design canvas, copied in .claude/crm-screens/. Each one is a
// .dc.html file whose holes, loops and imports are filled in by the canvas runtime; this script
// does the same in Node, so the site can show the real screens without that runtime. Nothing in
// a screen is redrawn: the only edits are the swaps to invented data in SAMPLE_DATA_SWAPS and the
// structural ones in neutralizeSemantics(), which change no pixel. Which part of a screen a page
// shows (its crop) is chosen where the picture is used, through CrmShot.
//
// Usage: node scripts/render-crm-screens.mjs
// Output: src/components/crm-shots/screens.generated.ts and screens.generated.css

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCREENS_DIR = path.join(ROOT, ".claude/crm-screens");
const OUT_DIR = path.join(ROOT, "src/components/crm-shots");

/**
 * Public pictures show invented data only: never Every1Drives (the company that develops the CRM,
 * which the canvas uses as its sample organization), its domains or the city the screens place it in
 * (.claude/crm-screens/README.md). writeShots() refuses a picture where one survives.
 */
const SAMPLE_DATA_SWAPS = [
  [/Every1Drives/g, "Dealership"],
  [/>E1</g, ">D<"],
  [/every1drives\.store/g, "dealership.example.com"],
  [/e1d\.ca\/apply/g, "example.com/apply"],
  [/Halifax Sales/g, "Sales Line"],
  [/118 Harbour Rd, Halifax, NS, B3H 2K4/g, "118 Harbour Rd, Springfield, NS, X0X 0X0"],
  [/\bevery1drives\b/g, "dealership"],
  [/America\/Halifax/g, "America/Toronto"],
  [/Halifax showroom/g, "Main showroom"],
  [/2150 Robie St/g, "100 Main St"],
  [/B3K 4M3/g, "X0X 0X0"],
  [/Halifax, NS/g, "Springfield, NS"],
  [/\bHalifax\b/g, "Springfield"],
  // Real Halifax-area addresses become documentation addresses (RFC 5737).
  [/24\.114\.\d+\.(\d+)/g, "192.0.2.$1"],
];

/** What must never reach a picture once the swaps have run. */
const REAL_DATA = /Every1Drives|every1drives|e1d\.ca|Halifax|24\.114\./;

/**
 * The screens the site shows. `extract` names the element to keep ("main") or null for the whole
 * screen; `card` keeps only the screen's smallest `.card` holding that text, and `dialog` its
 * smallest dialog holding that text, laid out at `width` (the width it has in the screen);
 * otherwise `width` is the width the screen is laid out at, in its own pixels. Every shot has its
 * own `scope`, the class its stylesheet is confined to.
 */
const SHOTS = [
  { id: "contactRecord", screen: "Contact-Detail-Activity", scope: "crm-contact", extract: "main", width: 1184 },
  { id: "mobileChat", screen: "Mobile-Contact-Chat", scope: "crm-mobile", extract: null, width: 390 },
  { id: "contactActivity", screen: "Contact-Detail-Activity", scope: "crm-activity", extract: null, width: 1440 },
  { id: "chloeChat", screen: "State-Chat-Chloe-Active", scope: "crm-chloe", extract: null, width: 1440 },
  { id: "mobileInbox", screen: "Mobile-Inbox", scope: "crm-mobile-inbox", extract: null, width: 390 },
  { id: "inbox", screen: "Inbox-Needs-Agent", scope: "crm-inbox", extract: null, width: 1440 },
  { id: "softphone", screen: "Softphone-States", scope: "crm-softphone", extract: null, width: 1440 },
  { id: "pipeline", screen: "Pipeline-Board", scope: "crm-pipeline", extract: null, width: 1440 },
  { id: "activityLog", screen: "Reports-Activity-Log", scope: "crm-activity-log", extract: null, width: 1440 },
  { id: "taskDrawer", screen: "Task-Drawer", scope: "crm-task", extract: null, width: 976 },
  { id: "emailComposer", screen: "Email-Composer", scope: "crm-compose", extract: null, width: 760 },
  { id: "contactEmail", screen: "Contact-Detail-Email", scope: "crm-email", extract: null, width: 1440 },
  { id: "settingsEmail", screen: "Settings-Email", scope: "crm-settings-email", extract: null, width: 1440 },
  { id: "mobileSettingsEmail", screen: "Mobile-Settings-Email", scope: "crm-settings-email-m", extract: null, width: 390 },
  { id: "organizationsCard", screen: "Settings-Account", scope: "crm-account", card: "Manage your organizations", width: 880 },
  { id: "membersCard", screen: "Settings-Org", scope: "crm-org", card: "members in this organization", width: 428 },
  { id: "sessionsCard", screen: "Mobile-Settings", scope: "crm-sessions", card: "Active sessions", width: 326 },
  { id: "mobileLogin", screen: "Mobile-Login", scope: "crm-login", extract: null, width: 390 },
  { id: "paletteNoResults", screen: "Command-Palette", scope: "crm-palette", dialog: "No results found.", width: 512 },
];

/**
 * Reads a canvas screen and splits it into its stylesheet, template and logic script,
 * after applying the swaps to invented data.
 *
 * @author Gabriel Coronado
 * @since main
 * @param {string} name Screen file name without `.dc.html`.
 * @returns {{css: string, template: string, script: string}}
 */
function loadScreen(name) {
  let source = fs.readFileSync(path.join(SCREENS_DIR, `${name}.dc.html`), "utf8");
  for (const [pattern, replacement] of SAMPLE_DATA_SWAPS) source = source.replace(pattern, replacement);
  const css = (source.match(/<helmet>[\s\S]*?<style>([\s\S]*?)<\/style>/) || [])[1] || "";
  const template = source.split("</helmet>")[1].split("</x-dc>")[0];
  const script = (source.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/) || [])[1]
    || "class Component extends DCLogic { renderVals() { return {}; } }";
  return { css, template, script };
}

/**
 * Runs a screen's `renderVals()` in an empty VM context and returns the values its template reads.
 *
 * @author Gabriel Coronado
 * @since main
 * @param {string} script The screen's `class Component extends DCLogic` source.
 * @param {object} props Props passed by the importing screen.
 * @returns {object}
 */
function runRenderVals(script, props) {
  const context = vm.createContext({ __props: props });
  const code = `class DCLogic { constructor(p) { this.props = p || {}; this.state = {}; } setState() {} forceUpdate() {} }\n${script}\n;new Component(__props).renderVals();`;
  return vm.runInContext(code, context, { timeout: 1000 });
}

/**
 * Escapes text for HTML content and attribute values.
 *
 * @author Gabriel Coronado
 * @since main
 * @param {unknown} value
 * @returns {string}
 */
function escapeHtml(value) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/**
 * Resolves a `{{ path }}` expression (a dotted lookup or a literal) against the scope chain.
 *
 * @author Gabriel Coronado
 * @since main
 * @param {string} expression
 * @param {object[]} scopes Innermost scope last.
 * @returns {unknown}
 */
function lookupPath(expression, scopes) {
  const trimmed = expression.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  if (/^'.*'$|^".*"$/.test(trimmed)) return trimmed.slice(1, -1);
  const [head, ...rest] = trimmed.split(".");
  for (let i = scopes.length - 1; i >= 0; i--) {
    if (scopes[i] && Object.prototype.hasOwnProperty.call(scopes[i], head)) {
      let value = scopes[i][head];
      for (const key of rest) value = value == null ? undefined : value[key];
      return value;
    }
  }
  return undefined;
}

/**
 * Replaces every `{{ hole }}` in a run of template text with its escaped value.
 *
 * @author Gabriel Coronado
 * @since main
 * @param {string} text
 * @param {object[]} scopes
 * @returns {string}
 */
function interpolate(text, scopes) {
  return text.replace(/\{\{([^}]+)\}\}/g, (_, expression) => escapeHtml(lookupPath(expression, scopes)));
}

/**
 * Reads an attribute of a control tag: a whole-value hole gives the raw value, a mixed one a string.
 *
 * @author Gabriel Coronado
 * @since main
 * @param {string | undefined} raw
 * @param {object[]} scopes
 * @returns {unknown}
 */
function attributeValue(raw, scopes) {
  if (raw == null) return undefined;
  const whole = raw.match(/^\{\{([^}]+)\}\}$/);
  if (whole) return lookupPath(whole[1], scopes);
  return raw.includes("{{") ? raw.replace(/\{\{([^}]+)\}\}/g, (_, expression) => String(lookupPath(expression, scopes) ?? "")) : raw;
}

/**
 * Parses the `name="value"` attributes of a tag.
 *
 * @author Gabriel Coronado
 * @since main
 * @param {string} source The text between the tag name and `>`.
 * @returns {Record<string, string>}
 */
function parseAttributes(source) {
  const attributes = {};
  for (const match of source.matchAll(/([\w:-]+)="([^"]*)"/g)) attributes[match[1]] = match[2];
  return attributes;
}

/**
 * Finds the closing tag that matches an opening tag, counting nested tags of the same name.
 *
 * @author Gabriel Coronado
 * @since main
 * @param {string} source
 * @param {string} tag
 * @param {number} from Index just after the opening tag.
 * @returns {number} Index of the matching `</tag>`.
 */
function findClosingTag(source, tag, from) {
  const pattern = new RegExp(`<${tag}\\b|</${tag}>`, "g");
  pattern.lastIndex = from;
  let depth = 1;
  let match;
  while ((match = pattern.exec(source))) {
    depth += match[0].startsWith("</") ? -1 : 1;
    if (depth === 0) return match.index;
  }
  throw new Error(`unclosed <${tag}>`);
}

/**
 * Expands a template: fills holes, repeats `<sc-for>`, keeps or drops `<sc-if>`, and inlines
 * `<dc-import>` children.
 *
 * @author Gabriel Coronado
 * @since main
 * @param {string} template
 * @param {object[]} scopes
 * @param {Map<string, string>} styles Collects each rendered screen's stylesheet.
 * @returns {string}
 */
function renderTemplate(template, scopes, styles) {
  const control = /<(sc-for|sc-if|dc-import)\b([^>]*)>/g;
  let output = "";
  let index = 0;
  let match;
  while (true) {
    control.lastIndex = index;
    if (!(match = control.exec(template))) return output + interpolate(template.slice(index), scopes);
    output += interpolate(template.slice(index, match.index), scopes);
    const [, tag, rawAttributes] = match;
    const attributes = parseAttributes(rawAttributes);
    const close = findClosingTag(template, tag, control.lastIndex);
    const inner = template.slice(control.lastIndex, close);
    index = close + tag.length + 3;
    if (tag === "sc-for") {
      const list = attributeValue(attributes.list, scopes) || [];
      list.forEach((item, position) => {
        output += renderTemplate(inner, [...scopes, { [attributes.as || "item"]: item, $index: position }], styles);
      });
    } else if (tag === "sc-if") {
      if (attributeValue(attributes.value, scopes)) output += renderTemplate(inner, scopes, styles);
    } else {
      const props = {};
      for (const [key, value] of Object.entries(attributes)) {
        if (key !== "name" && !key.startsWith("hint-")) props[key.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = attributeValue(value, scopes);
      }
      output += renderComponent(attributes.name, props, styles);
    }
  }
}

/**
 * Renders one screen, and every screen it imports, to static markup.
 *
 * @author Gabriel Coronado
 * @since main
 * @param {string} name
 * @param {object} props
 * @param {Map<string, string>} styles
 * @returns {string}
 */
function renderComponent(name, props, styles) {
  const screen = loadScreen(name);
  if (!styles.has(name)) styles.set(name, screen.css);
  return renderTemplate(screen.template, [runRenderVals(screen.script, props)], styles);
}

/**
 * Prefixes every selector of a stylesheet with a scope class so it cannot reach the host page.
 *
 * @author Gabriel Coronado
 * @since main
 * @param {string} css
 * @param {string} scope Class name without the dot.
 * @returns {string}
 */
function scopeCss(css, scope) {
  return css
    .replace(/body\{margin:0\}/g, "")
    .replace(/([^{}]+)\{/g, (_, selectors) => selectors.split(",").map((selector) => `.${scope} ${selector.trim()}`).join(",") + "{");
}

/**
 * Cuts the first element with the given tag name, and its children, out of rendered markup.
 *
 * @author Gabriel Coronado
 * @since main
 * @param {string} markup
 * @param {string} tag
 * @returns {string}
 */
function extractElement(markup, tag) {
  const start = markup.indexOf(`<${tag}`);
  if (start === -1) throw new Error(`no <${tag}> in the rendered screen`);
  const end = findClosingTag(markup, tag, markup.indexOf(">", start) + 1);
  return markup.slice(start, end + tag.length + 3);
}

/**
 * Finds the smallest `div` of rendered markup that opens like `opener` and holds the given text,
 * so a picture can carry one card or one dialog of a screen instead of the whole screen.
 *
 * @author Gabriel Coronado
 * @since main
 * @param {string} markup
 * @param {RegExp} opener the opening tag to look for, with the `g` flag
 * @param {string} text
 * @returns {string}
 */
function extractSmallest(markup, opener, text) {
  let best = null;
  for (const match of markup.matchAll(opener)) {
    const end = findClosingTag(markup, "div", match.index + match[0].length);
    const element = markup.slice(match.index, end + "</div>".length);
    if (element.includes(text) && (!best || element.length < best.length)) best = element;
  }
  if (!best) throw new Error(`no ${opener.source} holding "${text}" in the rendered screen`);
  return best;
}

/** Tags that would add landmarks or headings to the host page; in a picture they become divs. */
const SEMANTIC_TAGS = ["main", "header", "footer", "nav", "section", "article", "aside", "form", "h1", "h2", "h3", "h4", "h5", "h6"];

/**
 * Turns a rendered screen into a picture as far as the host page's structure is concerned:
 * landmark and heading tags become divs, links become spans without their href, and ids and the
 * attributes that point at ids are dropped, so the same picture can appear twice on a page, and so
 * are inline event handlers, which a picture never runs. No
 * screen's stylesheet selects by id, and under the site's Tailwind preflight these elements
 * already render like divs, so no pixel changes.
 *
 * @author Gabriel Coronado
 * @since main
 * @param {string} markup
 * @returns {string}
 */
function neutralizeSemantics(markup) {
  return markup
    .replace(new RegExp(`<(/?)(?:${SEMANTIC_TAGS.join("|")})\\b`, "g"), "<$1div")
    .replace(/<a\b([^>]*?)\s+href="[^"]*"/g, "<a$1")
    .replace(/<(\/?)a\b/g, "<$1span")
    .replace(/\s(?:id|for|aria-controls|aria-labelledby|aria-describedby)="[^"]*"/g, "")
    .replace(/\son[a-z]+="[^"]*"/g, "");
}

/**
 * Renders every picture in SHOTS and writes the generated module and stylesheet.
 *
 * @author Gabriel Coronado
 * @since main
 */
function writeShots() {
  const modules = [];
  const sheets = [];
  for (const shot of SHOTS) {
    const styles = new Map();
    const markup = renderComponent(shot.screen, {}, styles);
    const part = shot.card
      ? extractSmallest(markup, /<div class="card"[^>]*>/g, shot.card)
      : shot.dialog
        ? extractSmallest(markup, /<div role="dialog"[^>]*>/g, shot.dialog)
        : null;
    const cropped = part
      ? `<div class="app" style="width:${shot.width}px">${part}</div>`
      : shot.extract
        ? `<div class="app" style="width:${shot.width}px">${extractElement(markup, shot.extract)}</div>`
        : markup;
    const html = neutralizeSemantics(cropped);
    if (/\{\{/.test(html)) throw new Error(`${shot.screen}: unfilled hole left in the markup`);
    const leak = html.match(REAL_DATA);
    if (leak) throw new Error(`${shot.screen}: "${leak[0]}" survived the swaps; add one to SAMPLE_DATA_SWAPS`);
    modules.push(`/** ${shot.screen}, rendered from .claude/crm-screens. */\nexport const ${shot.id}: CrmScreen = ${JSON.stringify({ scope: shot.scope, width: shot.width, html })};`);
    sheets.push(`/* ${shot.screen} */\n${[...styles.values()].map((css) => scopeCss(css, shot.scope)).join("\n")}`);
  }
  const header = "// Generated by scripts/render-crm-screens.mjs from .claude/crm-screens. Do not edit by hand.\n";
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(OUT_DIR, "screens.generated.ts"),
    `${header}\n/** A CRM screen rendered to static markup, laid out at \`width\` pixels. */\nexport interface CrmScreen {\n  scope: string;\n  width: number;\n  html: string;\n}\n\n${modules.join("\n\n")}\n`,
  );
  fs.writeFileSync(path.join(OUT_DIR, "screens.generated.css"), `/* Generated by scripts/render-crm-screens.mjs from .claude/crm-screens. Do not edit by hand. */\n${sheets.join("\n")}\n`);
  console.log(`Wrote ${SHOTS.length} screens to ${path.relative(ROOT, OUT_DIR)}`);
}

writeShots();
