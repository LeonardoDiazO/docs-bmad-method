// npm run sync: lee la instalación real (BMAD, skills y agentes de Claude, plugins, versión de Claude Code),
// consulta la última versión publicada de BMAD y regenera index.html y README.md.
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, dirname, relative } from 'node:path';
import { homedir } from 'node:os';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { render, md, esc } from './fichero.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cfg = JSON.parse(readFileSync(join(ROOT, 'guide.config.json'), 'utf8'));
const PROJECT = resolve(ROOT, cfg.bmadProject);
const HOME = homedir();
const es = JSON.parse(readFileSync(join(ROOT, 'content/es.json'), 'utf8'));
const read = p => (existsSync(p) ? readFileSync(p, 'utf8') : '');
const sh = (cmd, timeout = 20000) => { try { return execSync(cmd, { encoding: 'utf8', timeout, stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return null; } };
const dirs = p => (existsSync(p) ? readdirSync(p).filter(n => statSync(join(p, n)).isDirectory()) : []);

// ---------- lectores ----------
function csv(text) {
  const rows = []; let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) { if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (ch === '"') q = false; else cell += ch; }
    else if (ch === '"') q = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n') { row.push(cell.replace(/\r$/, '')); rows.push(row); row = []; cell = ''; }
    else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [head, ...rest] = rows;
  return rest.filter(r => r.length > 1).map(r => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ''])));
}

function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const out = {}; const lines = m[1].split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const kv = lines[i].match(/^([a-zA-Z_-]+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2];
    if (/^[>|]-?$/.test(v)) { const buf = []; while (lines[i + 1] && /^\s+/.test(lines[i + 1])) buf.push(lines[++i].trim()); v = buf.join(' '); }
    else if (/^["']/.test(v) && !/["']$/.test(v.trim().slice(1))) { while (lines[i + 1] !== undefined && !/["']\s*$/.test(v)) v += ' ' + lines[++i].trim(); }
    out[kv[1]] = v.replace(/^["']|["']$/g, '').replace(/\\"/g, '"').trim();
  }
  return out;
}

function skillsIn(dir, source) {
  return dirs(dir).map(n => {
    const f = join(dir, n, 'SKILL.md');
    if (!existsSync(f)) return null;
    const fm = frontmatter(read(f));
    return { name: fm.name || n, desc: fm.description || '', source };
  }).filter(Boolean);
}

const isDeprecated = s => /^deprecated\b/i.test(s.desc);
const forwardOf = s => (s.desc.match(/forwards to `?(bmad-[a-z0-9-]+)/i) || s.desc.match(/`(bmad-[a-z0-9-]+)` is now/i) || [])[1];
const short = (s, n = 210) => (s = s.replace(/\s+[—–]\s+/g, ': '), s.length > n ? s.slice(0, n).replace(/\s+\S*$/, '') + '…' : s);

// ---------- datos ----------
const manifest = read(join(PROJECT, '_bmad/_config/manifest.yaml'));
const installed = (manifest.match(/installation:\s*\n\s*version:\s*(\S+)/) || [])[1] || '¿?';
const modules = [...manifest.matchAll(/- name:\s*(\S+)\s*\n\s*version:\s*(\S+)/g)].map(m => ({ name: m[1], version: m[2] }));
const latest = sh('npm view bmad-method version', 30000);
const claudeVersion = (sh('claude --version') || '').split(' ')[0] || null;
const uv = (sh('uv --version') || '').split(' ')[1] || null;

const projectSkills = skillsIn(join(PROJECT, '.claude/skills'), 'proyecto');
const bySkill = Object.fromEntries(projectSkills.map(s => [s.name, s]));
const help = csv(read(join(PROJECT, '_bmad/_config/bmad-help.csv'))).filter(r => r.skill && r.skill !== '_meta');
const agents = csv(read(join(PROJECT, '_bmad/_config/agent-manifest.csv')));

const NOW = new Date();
const ver = v => (v || '').replace(/^v/, '').split('.').map(Number);
const older = (a, b) => { const x = ver(a), y = ver(b); for (let i = 0; i < 3; i++) { if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) < (y[i] || 0); } return false; };

// ---------- fichas BMAD ----------
const PHASES = {
  plan: 'Planificar', '2-planning': 'Planificar', ship: 'Construir y entregar', anytime: 'En cualquier momento',
  '0-learning': 'Aprender', '3-solutioning': 'Preparar pruebas', '4-implementation': 'Durante la implementación',
};
const MOD = { 'BMad Method': 'Método', Core: 'Núcleo', 'Creative Intelligence Suite': 'Creatividad', 'Test Architecture Enterprise': 'Pruebas' };
const idOf = skill => 'ficha-' + skill;
const seen = new Set();
const linkTo = (skill, dir) => {
  const base = skill.split(':')[0];
  return { id: idOf(base), label: base, dir };
};

function helpCard(r) {
  const s = bySkill[r.skill];
  const t = es[r.skill] || {};
  const id = seen.has(r.skill) ? idOf(r.skill) + '-' + r['menu-code'].toLowerCase() : idOf(r.skill);
  seen.add(r.skill);
  const links = [];
  if (r['preceded-by']) r['preceded-by'].split('|').forEach(p => links.push(linkTo(p, 'prev')));
  if (r['followed-by']) r['followed-by'].split('|').forEach(p => links.push(linkTo(p, 'next')));
  const action = r.action ? ` ${r.action}` : '';
  return {
    id, call: r['menu-code'], sub: `${MOD[r.module] || r.module}${r.required === 'true' ? ' · requerida' : ''}`,
    title: t.title || r['display-name'], desc: t.desc || short(s?.desc || r.description || ''),
    cmd: `/${r.skill}${action}`, state: s ? (isDeprecated(s) ? 'deprecated' : 'ok') : 'missing',
    forward: s && forwardOf(s),
    meta: [['salida', r.outputs.replace(/\|/g, ', ')], ['skill', r.skill]],
    links, search: `${r.skill} ${r['display-name']} ${s?.desc || ''}`,
  };
}

const groupBy = (rows, key) => rows.reduce((m, r) => ((m[key(r)] ||= []).push(r), m), {});
const method = help.filter(r => r.module === 'BMad Method' || r.module === 'Core');
const methodGroups = groupBy(method, r => PHASES[r.phase] || r.phase);
const order = ['Planificar', 'Construir y entregar', 'En cualquier momento'];
const tea = help.filter(r => r.module === 'Test Architecture Enterprise');
const cis = help.filter(r => r.module === 'Creative Intelligence Suite');

const inCatalog = new Set(help.map(r => r.skill));
const deprecated = projectSkills.filter(isDeprecated).sort((a, b) => a.name.localeCompare(b.name)).map(s => ({
  id: idOf(s.name), call: s.name.replace(/^bmad-/, ''), sub: 'reemplazada', title: s.name,
  desc: '', state: 'deprecated', forward: forwardOf(s), cmd: forwardOf(s) ? `/${forwardOf(s)}` : null,
  search: s.desc,
}));
const personaCards = agents.filter(a => a.displayName).map(a => {
  const skill = projectSkills.find(s => s.name === a.canonicalId) || projectSkills.find(s => s.name === `bmad-agent-${a.name}`) || projectSkills.find(s => new RegExp(`talk to ${a.displayName}\\b`, 'i').test(s.desc));
  return {
    id: 'agente-' + a.name, call: a.displayName, sub: MOD[{ bmm: 'BMad Method', core: 'Core', cis: 'Creative Intelligence Suite', tea: 'Test Architecture Enterprise' }[a.module]] || a.module,
    title: a.title, desc: short(a.role || a.identity || '', 180), cmd: skill ? `/${skill.name}` : null,
    state: skill ? 'ok' : 'missing', missingNote: 'Sin skill de agente en este proyecto',
    meta: [['estilo', short(a.communicationStyle || '', 120)]], search: `${a.name} ${a.identity} ${a.capabilities}`,
  };
});
const others = projectSkills.filter(s => !isDeprecated(s) && !inCatalog.has(s.name) && !personaCards.some(p => p.cmd === '/' + s.name));
const otherCards = others.map(s => ({ id: idOf(s.name), call: s.name.replace(/^bmad-/, ''), sub: 'fuera del catálogo', title: es[s.name]?.title || s.name, desc: es[s.name]?.desc || short(s.desc), cmd: `/${s.name}`, search: s.desc }));

// ---------- Claude ----------
const userSkills = [...skillsIn(join(HOME, '.claude/skills'), 'usuario')];
const plugins = JSON.parse(read(join(HOME, '.claude/plugins/installed_plugins.json')) || '{"plugins":{}}').plugins;
const pluginSkills = [];
for (const [key, [p]] of Object.entries(plugins)) {
  const name = key.split('@')[0];
  skillsIn(join(p.installPath, 'skills'), `plugin ${name} ${p.version}`).forEach(s => pluginSkills.push({ ...s, name: `${name}:${s.name}`, plugin: name }));
}
const subagents = existsSync(join(HOME, '.claude/agents'))
  ? readdirSync(join(HOME, '.claude/agents')).filter(f => f.endsWith('.md')).map(f => ({ ...frontmatter(read(join(HOME, '.claude/agents', f))), file: f }))
  : [];
const skillCard = s => ({ id: 'claude-' + s.name.replace(/[:]/g, '-'), call: s.name.includes(':') ? s.name.split(':')[1] : s.name, sub: s.source, title: s.name, desc: short(s.desc), cmd: `/${s.name}`, search: s.desc });
const agentCards = subagents.map(a => ({ id: 'subagente-' + a.name, call: a.name, sub: `subagente · ${a.model || 'heredado'}`, title: a.name, desc: short(a.description || '', 220), meta: [['herramientas', a.tools || 'todas']], cmd: `Usa el agente ${a.name} para …`, search: a.description }));

function cliOptions() {
  const out = sh('claude --help');
  if (!out) return [];
  const opts = []; let cur = null;
  for (const line of out.split(/\r?\n/).slice(out.split(/\r?\n/).findIndex(l => /^Options:/.test(l)) + 1)) {
    if (/^\S/.test(line)) break;
    const m = line.match(/^  (-\S.*?)(?:\s{2,}(\S.*))?$/);
    if (m) { cur = { flag: m[1].trim(), desc: m[2] || '' }; opts.push(cur); } else if (cur) cur.desc += ' ' + line.trim();
  }
  return opts.map(o => ({ ...o, desc: o.desc.replace(/\s+/g, ' ').trim() }));
}
const FLAGS_ES = {
  '-c, --continue': 'Continúa la conversación más reciente de este directorio.',
  '-p, --print': 'Modo no interactivo: imprime la respuesta y sale. Útil en scripts.',
  '-r, --resume [value]': 'Retoma una sesión por ID o eligiéndola de una lista.',
  '--model <model>': 'Modelo de la sesión.',
  '--add-dir <directories...>': 'Permite acceso a carpetas adicionales.',
  '--permission-mode <mode>': 'Modo de permisos con el que arranca la sesión.',
};
const flagCards = cliOptions().map(o => ({
  id: 'cli-' + o.flag.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, ''), call: o.flag.split(/[ ,]/)[0], sub: 'claude --help',
  title: o.flag, desc: FLAGS_ES[o.flag] || short(o.desc, 200), cmd: `claude ${o.flag.split(',').pop().trim().split(' ')[0]}`, search: o.desc,
}));
const handwritten = JSON.parse(read(join(ROOT, 'content/claude-comandos.json')));
const cmdGroups = handwritten.grupos.map(g => ({ label: g.label, cards: g.fichas.map(f => ({ id: 'cmd-' + f.call.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || 'x', sub: 'Claude Code', ...f })) }));

// ---------- instalaciones ----------
function findInstalls() {
  const found = [];
  const walk = (dir, depth) => {
    if (existsSync(join(dir, '_bmad/_config/manifest.yaml'))) found.push(dir);
    if (depth <= 0) return;
    for (const n of dirs(dir)) if (!/^(node_modules|\.git|\.claude|\.worktrees|_bmad|target|dist|\.next|venv)$/.test(n)) walk(join(dir, n), depth - 1);
  };
  cfg.scanRoots.forEach(r => walk(resolve(ROOT, r), cfg.scanDepth ?? 3));
  return [...new Set(found)].map(d => {
    const m = read(join(d, '_bmad/_config/manifest.yaml'));
    return { dir: d, version: (m.match(/installation:\s*\n\s*version:\s*(\S+)/) || [])[1], modules: [...m.matchAll(/- name:\s*(\S+)\s*\n\s*version:\s*(\S+)/g)].map(x => `${x[1]} ${x[2]}`).join(', ') };
  }).sort((a, b) => a.dir.localeCompare(b.dir));
}
const installs = findInstalls();
const outdated = installs.filter(i => latest && older(i.version, latest));
const updateCmd = d => `npx bmad-method@latest install --directory "${d}" --action quick-update --yes`;
const label = d => relative(resolve(ROOT, cfg.scanRoots[0]), d).split('\\').join('/') || 'REPOSITORIOS (raíz)';
const installTable = `<div class="tabla"><table><thead><tr><th>Proyecto</th><th>Versión</th><th>Módulos</th></tr></thead><tbody>${installs.map(i =>
  `<tr><td>${esc(label(i.dir))}</td><td${latest && older(i.version, latest) ? ' data-state="warn"' : ''}>${esc(i.version)}</td><td>${esc(i.modules)}</td></tr>`).join('')}</tbody></table></div>`;
const installIntro = md(`${installs.length} proyectos con BMAD bajo \`${cfg.scanRoots.join('`, `')}\` (se omiten los worktrees de agentes). ${latest ? (outdated.length ? `**${outdated.length} por detrás de la ${latest}.**` : `Todos en la última versión publicada, ${latest}.`) : 'Sin conexión: no se pudo consultar la última versión.'}`);
const updateCards = (outdated.length ? outdated : installs.slice(0, 1)).map(i => ({
  id: 'actualizar-' + i.dir.replace(/[^a-z0-9]+/gi, '-').toLowerCase(), call: i.version, sub: outdated.length ? `→ ${latest}` : 'ejemplo', title: label(i.dir), desc: 'Actualiza conservando configuración y personalizaciones.', cmd: updateCmd(i.dir),
}));

// ---------- página ----------
const drawers = [
  { id: 'empezar', label: 'Empezar', color: '#d6b162', type: 'sheet', html: md(read(join(ROOT, 'content/empezar.md'))) },
  { id: 'metodo', label: 'Método BMAD', short: 'Método', color: '#8fb39a', groups: order.filter(k => methodGroups[k]).map(k => ({ label: k, cards: methodGroups[k].map(helpCard) })),
    intro: md('El catálogo que usa `bmad-help`, en el orden en que se recorre. **Requerida** significa que el flujo completo la necesita; flecha izquierda = qué va antes, derecha = qué sigue.') },
  { id: 'pruebas', label: 'Pruebas (TEA)', short: 'Pruebas', color: '#8fa9c4', groups: Object.entries(groupBy(tea, r => PHASES[r.phase] || r.phase)).map(([label, rs]) => ({ label, cards: rs.map(helpCard) })),
    intro: md('Módulo Test Architecture Enterprise de Murat. Úsalo cuando el proyecto necesite una estrategia de pruebas propia, no solo tests sueltos.') },
  { id: 'creatividad', label: 'Creatividad (CIS)', short: 'Creatividad', color: '#e3957a', cards: cis.map(helpCard) },
  { id: 'agentes', label: 'Agentes BMAD', short: 'Agentes', color: '#b9a3c4', cards: personaCards,
    intro: md('Invoca un agente cuando quieras discutir un tema desde un rol concreto (analista, producto, arquitectura, UX, desarrollo, pruebas). Las skills de los otros cajones funcionan sin pasar por ellos.') },
  { id: 'reemplazadas', label: 'Reemplazadas', color: '#b5b0a3', cards: [...deprecated, ...otherCards],
    intro: md('Skills de versiones anteriores que BMAD mantiene instaladas y que redirigen a su reemplazo. Cada ficha indica qué skill usar en su lugar.') },
  { id: 'claude-skills', label: 'Skills de Claude', short: 'Claude: skills', color: '#d6b162',
    groups: [{ label: 'Tuyas (usuario)', cards: userSkills.map(skillCard) }, ...Object.entries(groupBy(pluginSkills, s => s.plugin)).map(([p, ss]) => ({ label: `Plugin ${p}`, cards: ss.map(skillCard) })), { label: 'Subagentes', cards: agentCards }],
    intro: md('Lo que tienes instalado fuera de BMAD, leído de `~/.claude/skills`, `~/.claude/agents` y los plugins. Las skills integradas de Claude Code (artifact-design, dataviz…) no se listan porque no viven en disco.') },
  { id: 'claude-comandos', label: 'Comandos de Claude Code', short: 'Claude: comandos', color: '#8fb39a',
    groups: [...cmdGroups, { label: `Opciones de la línea de comandos${claudeVersion ? ` (v${claudeVersion})` : ''}`, cards: flagCards }],
    intro: md('Los comandos de sesión están escritos a mano (compruébalos con `/help`); las opciones de línea de comandos se leen de `claude --help` en cada sincronización.') },
  { id: 'instalaciones', label: 'Instalaciones', color: '#e3957a', intro: installIntro + installTable, groups: [{ label: outdated.length ? 'Actualizar' : 'Comando de actualización', cards: updateCards }] },
];
drawers.forEach(d => { d.count = d.id === 'instalaciones' ? installs.length : d.type === 'sheet' ? '' : (d.groups || [{ cards: d.cards }]).reduce((n, g) => n + g.cards.length, 0); });

const human = NOW.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
const html = render({
  edition: 'bmad', title: 'Guía BMAD + Claude', storeKey: 'guia-bmad', fontsDir: join(ROOT, 'assets/fonts'),
  generatedAt: NOW.toISOString(), generatedHuman: human, syncCmd: 'npm run sync', searchHintShort: 'Buscar skill o comando', searchHint: 'Buscar skill, código o comando (PRD, build, revisión…)', searchExample: 'PRD',
  status: [
    { label: 'Sincronizada', value: human, state: 'ok' },
    { label: 'BMAD', value: installed, state: latest && older(installed, latest) ? 'warn' : 'ok', hint: latest && older(installed, latest) ? `publicada ${latest}` : (latest ? 'al día' : 'sin conexión') },
    { label: 'Claude Code', value: claudeVersion || 'no encontrado', state: claudeVersion ? 'ok' : 'warn' },
    { label: 'uv', value: uv || 'falta', state: uv ? 'ok' : 'warn', hint: uv ? '' : 'bmad-build lo necesita' },
    { label: 'Proyectos', value: `${installs.length}`, state: outdated.length ? 'warn' : 'ok', hint: outdated.length ? `${outdated.length} desactualizados` : '' },
  ],
  drawers,
});
writeFileSync(join(ROOT, 'index.html'), html);

// README de respaldo (se lee en VS Code o GitHub)
const row = c => `| \`${c.call}\` | ${c.title}${c.state === 'deprecated' ? ` (reemplazada${c.forward ? ` por \`${c.forward}\`` : ''})` : c.state === 'missing' ? ' (no instalada)' : ''} | ${c.cmd ? `\`${c.cmd}\`` : ''} |`;
const readme = [
  '# Guía BMAD + Claude', '',
  `> Generado por \`npm run sync\` el ${human}. **Abre \`index.html\`** para la versión con buscador. Para cambiar textos edita \`content/\`, no este archivo.`, '',
  `BMAD instalado: **${installed}**${latest ? ` · publicado: **${latest}**` : ''} · Claude Code: **${claudeVersion || '¿?'}** · Módulos: ${modules.map(m => `${m.name} ${m.version}`).join(', ')}`, '',
  read(join(ROOT, 'content/empezar.md')).trim(), '',
  ...drawers.filter(d => d.type !== 'sheet').flatMap(d => ['', `## ${d.label}`, '', '| Código | Nombre | Comando |', '|---|---|---|', ...(d.groups || [{ cards: d.cards }]).flatMap(g => g.cards.map(row))]),
  '',
].join('\n');
writeFileSync(join(ROOT, 'README.md'), readme);

console.log(`Guía BMAD regenerada: ${drawers.reduce((n, d) => n + (+d.count || 0), 0)} fichas · BMAD ${installed}${latest ? ` (publicada ${latest})` : ''} · ${installs.length} instalaciones${outdated.length ? `, ${outdated.length} desactualizadas` : ''}`);
if (latest && older(installed, latest)) console.log(`Hay versión nueva de BMAD: ${installed} → ${latest}. Revisa el cajón Instalaciones.`);
