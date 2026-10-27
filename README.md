# Guía BMAD + Claude

> Generado por `npm run sync` el 26 de octubre de 2026. **Abre `index.html`** para la versión con buscador. Para cambiar textos edita `content/`, no este archivo.

BMAD instalado: **6.12.4** · publicado: **6.12.4** · Claude Code: **2.1.311** · Módulos: core 6.12.4, tea v1.27.2, bmm 6.12.4, cis v0.3.2

## Cómo se usa BMAD dentro de Claude Code

BMAD es un conjunto de **skills**: instrucciones empaquetadas que Claude carga cuando las invocas. Se instalan por proyecto (`_bmad/` y `.claude/skills/`), así que cada repo tiene su propia versión. Para usar una, escríbela como comando en Claude Code (`/bmad-prd`) o pídela con palabras ("crea el PRD"); Claude la reconoce por su descripción.

> **Si dudas, empieza por `/bmad-help`.** Lee qué documentos existen ya en el proyecto y te dice la siguiente skill. Las fichas de esta guía te dicen también qué viene antes y después de cada una.

## Elige la ruta según el tamaño del trabajo

### Cambio pequeño o bug

1. `/bmad-build` con la descripción, el bug o el enlace a la historia.
2. `/bmad-code-review` si el cambio toca algo delicado.

### Funcionalidad en un proyecto existente

1. `/bmad-project-context` una vez por repo, para que los agentes conozcan sus reglas (bloque en `AGENTS.md`).
2. `/bmad-spec` para convertir tu idea o notas en un `SPEC.md` breve; pídele "divídelo en historias" si es grande.
3. `/bmad-build` por historia.
4. `/bmad-code-review`, y `/bmad-walkthrough` si quieres revisarlo tú paso a paso.

### Producto nuevo

1. Explorar: `/bmad-brainstorming`, `/bmad-forge-idea` o `/bmad-deep-recon` si necesitas investigar.
2. `/bmad-product-brief` y luego `/bmad-prd`.
3. `/bmad-ux` si tiene interfaz, y `/bmad-architecture`.
4. `/bmad-create-epics-and-stories` y `/bmad-sprint-planning`.
5. Por cada historia: `/bmad-build` y después `/bmad-code-review`.
6. Al cerrar la épica: `/bmad-retrospective`.

Si a mitad de sprint cambia algo grande, usa `/bmad-correct-course` antes de seguir construyendo.

## Qué cambió frente a la guía anterior

La versión anterior de esta guía describía seis agentes con un "Orchestrator". En BMAD 6.x eso ya no existe así:

- Las **skills** son la unidad de trabajo; los agentes (Mary, John, Winston, Sally, Amelia, Murat…) son personas que puedes invocar para conversar, pero no hace falta pasar por ellos.
- `bmad-build` reemplaza a `dev-story`, `quick-dev` y `create-story`.
- `bmad-prd`, `bmad-architecture` y `bmad-review` agrupan lo que antes eran varias skills (crear, editar, validar).
- Las skills antiguas siguen instaladas como **reemplazadas**: redirigen a la nueva. En esta guía aparecen con la esquina doblada.

## Mantener la guía al día

Desde esta carpeta, ejecuta `npm run sync`. Lee lo que tienes instalado (BMAD, skills, agentes, plugins, versión de Claude Code), consulta la última versión publicada de BMAD y regenera esta página y el `README.md`. Si la guía tiene más de 7 días, la barra superior te lo recuerda.

Para actualizar BMAD en un proyecto: `npx bmad-method@latest install --directory <ruta> --action quick-update --yes`. Conserva tu configuración y tus personalizaciones. El cajón **Instalaciones** lista todos tus proyectos con BMAD y su versión.


## Método BMAD

| Código | Nombre | Comando |
|---|---|---|
| `PRD` | PRD | `/bmad-prd` |
| `CU` | Diseño UX | `/bmad-ux` |
| `BP` | Lluvia de ideas | `/bmad-brainstorming` |
| `CB` | Product brief | `/bmad-product-brief` |
| `WB` | PRFAQ (Working Backwards) | `/bmad-prfaq` |
| `CA` | Arquitectura | `/bmad-architecture` |
| `CE` | Épicas e historias | `/bmad-create-epics-and-stories` |
| `SP` | Plan de sprint | `/bmad-sprint-planning` |
| `BD` | Construir | `/bmad-build` |
| `CR` | Revisión de código | `/bmad-code-review` |
| `WT` | Recorrido del cambio | `/bmad-walkthrough` |
| `QA` | Tests E2E | `/bmad-qa-generate-e2e-tests` |
| `ER` | Retrospectiva | `/bmad-retrospective` |
| `PC` | Contexto del proyecto | `/bmad-project-context` |
| `SPC` | Spec | `/bmad-spec` |
| `CC` | Corregir el rumbo | `/bmad-correct-course` |
| `SS` | Plan de sprint | `/bmad-sprint-planning status` |
| `BSP` | Lluvia de ideas | `/bmad-brainstorming` |
| `PM` | Party mode | `/bmad-party-mode` |
| `BH` | Qué hago ahora | `/bmad-help` |
| `BC` | Personalizar BMAD | `/bmad-customize` |
| `AE` | Elicitación avanzada | `/bmad-advanced-elicitation` |
| `RV` | Revisión con lentes | `/bmad-review` |
| `FI` | Forjar una idea | `/bmad-forge-idea` |
| `RS` | Investigación | `/bmad-deep-recon` |

## Pruebas (TEA)

| Código | Nombre | Comando |
|---|---|---|
| `TMT` | Aprender testing | `/bmad-teach-me-testing` |
| `TD` | Diseño de pruebas | `/bmad-testarch-test-design` |
| `TF` | Framework de pruebas | `/bmad-testarch-framework` |
| `CI` | Pipeline de calidad | `/bmad-testarch-ci` |
| `AT` | ATDD | `/bmad-testarch-atdd` |
| `TA` | Automatizar pruebas | `/bmad-testarch-automate` |
| `RV` | Revisar pruebas | `/bmad-testarch-test-review` |
| `NR` | Auditoría NFR | `/bmad-testarch-nfr` |
| `TR` | Trazabilidad | `/bmad-testarch-trace` |

## Creatividad (CIS)

| Código | Nombre | Comando |
|---|---|---|
| `IS` | Estrategia de innovación | `/bmad-cis-innovation-strategy` |
| `PS` | Resolución de problemas | `/bmad-cis-problem-solving` |
| `DT` | Design thinking | `/bmad-cis-design-thinking` |
| `BS` | Lluvia de ideas | `/bmad-brainstorming` |
| `ST` | Storytelling | `/bmad-cis-storytelling` |

## Agentes BMAD

| Código | Nombre | Comando |
|---|---|---|
| `BMad Master` | BMad Master Executor, Knowledge Custodian, and Workflow Orchestrator | `/bmad-master` |
| `Murat` | Master Test Architect and Quality Advisor | `/bmad-tea` |
| `Mary` | Business Analyst | `/bmad-analyst` |
| `Winston` | Architect | `/bmad-architect` |
| `Amelia` | Developer Agent | `/bmad-dev` |
| `John` | Product Manager | `/bmad-pm` |
| `Quinn` | QA Engineer | `/bmad-qa` |
| `Barry` | Quick Flow Solo Dev | `/bmad-quick-flow-solo-dev` |
| `Bob` | Scrum Master | `/bmad-sm` |
| `Paige` | Technical Writer | `/bmad-tech-writer` |
| `Sally` | UX Designer | `/bmad-ux-designer` |
| `Carson` | Elite Brainstorming Specialist | `/bmad-cis-agent-brainstorming-coach` |
| `Dr. Quinn` | Master Problem Solver | `/bmad-cis-agent-creative-problem-solver` |
| `Maya` | Design Thinking Maestro | `/bmad-cis-agent-design-thinking-coach` |
| `Victor` | Disruptive Innovation Oracle | `/bmad-cis-agent-innovation-strategist` |
| `Caravaggio` | Visual Communication + Presentation Expert | `/bmad-cis-agent-presentation-master` |
| `Sophia` | Master Storyteller | `/bmad-cis-agent-storyteller` |

## Reemplazadas

| Código | Nombre | Comando |
|---|---|---|
| `checkpoint-preview` | bmad-checkpoint-preview (reemplazada por `bmad-walkthrough`) | `/bmad-walkthrough` |
| `create-architecture` | bmad-create-architecture (reemplazada por `bmad-architecture`) | `/bmad-architecture` |
| `create-prd` | bmad-create-prd (reemplazada por `bmad-prd`) | `/bmad-prd` |
| `create-story` | bmad-create-story (reemplazada por `bmad-build`) | `/bmad-build` |
| `dev-auto` | bmad-dev-auto (reemplazada por `bmad-build-auto`) | `/bmad-build-auto` |
| `dev-story` | bmad-dev-story (reemplazada por `bmad-build`) | `/bmad-build` |
| `document-project` | bmad-document-project (reemplazada por `bmad-project-context`) | `/bmad-project-context` |
| `domain-research` | bmad-domain-research (reemplazada por `bmad-deep-recon`) | `/bmad-deep-recon` |
| `edit-prd` | bmad-edit-prd (reemplazada por `bmad-prd`) | `/bmad-prd` |
| `editorial-review` | bmad-editorial-review (reemplazada por `bmad-review`) | `/bmad-review` |
| `editorial-review-prose` | bmad-editorial-review-prose (reemplazada por `bmad-review`) | `/bmad-review` |
| `editorial-review-structure` | bmad-editorial-review-structure (reemplazada por `bmad-review`) | `/bmad-review` |
| `generate-project-context` | bmad-generate-project-context (reemplazada por `bmad-project-context`) | `/bmad-project-context` |
| `market-research` | bmad-market-research (reemplazada por `bmad-deep-recon`) | `/bmad-deep-recon` |
| `quick-dev` | bmad-quick-dev (reemplazada por `bmad-build`) | `/bmad-build` |
| `review-adversarial-general` | bmad-review-adversarial-general (reemplazada por `bmad-review`) | `/bmad-review` |
| `review-edge-case-hunter` | bmad-review-edge-case-hunter (reemplazada por `bmad-review`) | `/bmad-review` |
| `review-verification-gap` | bmad-review-verification-gap (reemplazada por `bmad-review`) | `/bmad-review` |
| `sprint-status` | bmad-sprint-status (reemplazada por `bmad-sprint-planning`) | `/bmad-sprint-planning` |
| `technical-research` | bmad-technical-research (reemplazada por `bmad-deep-recon`) | `/bmad-deep-recon` |
| `validate-prd` | bmad-validate-prd (reemplazada por `bmad-prd`) | `/bmad-prd` |
| `agent-analyst` | bmad-agent-analyst | `/bmad-agent-analyst` |
| `agent-architect` | bmad-agent-architect | `/bmad-agent-architect` |
| `agent-cis-brainstorming-coach` | bmad-agent-cis-brainstorming-coach | `/bmad-agent-cis-brainstorming-coach` |
| `agent-cis-creative-problem-solver` | bmad-agent-cis-creative-problem-solver | `/bmad-agent-cis-creative-problem-solver` |
| `agent-cis-design-thinking-coach` | bmad-agent-cis-design-thinking-coach | `/bmad-agent-cis-design-thinking-coach` |
| `agent-cis-innovation-strategist` | bmad-agent-cis-innovation-strategist | `/bmad-agent-cis-innovation-strategist` |
| `agent-cis-presentation-master` | bmad-agent-cis-presentation-master | `/bmad-agent-cis-presentation-master` |
| `agent-cis-storyteller` | bmad-agent-cis-storyteller | `/bmad-agent-cis-storyteller` |
| `agent-dev` | bmad-agent-dev | `/bmad-agent-dev` |
| `agent-pm` | bmad-agent-pm | `/bmad-agent-pm` |
| `agent-tea-tea` | bmad-agent-tea-tea | `/bmad-agent-tea-tea` |
| `agent-ux-designer` | bmad-agent-ux-designer | `/bmad-agent-ux-designer` |
| `build-auto` | Construir (desatendido) | `/bmad-build-auto` |

## Skills de Claude

| Código | Nombre | Comando |
|---|---|---|
| `find-skills` | find-skills | `/find-skills` |
| `impeccable` | impeccable | `/impeccable` |
| `ai-readiness` | postman:ai-readiness | `/postman:ai-readiness` |
| `api-discovery` | postman:api-discovery | `/postman:api-discovery` |
| `api-documentation` | postman:api-documentation | `/postman:api-documentation` |
| `api-engineer` | postman:api-engineer | `/postman:api-engineer` |
| `api-mocking` | postman:api-mocking | `/postman:api-mocking` |
| `api-monitoring` | postman:api-monitoring | `/postman:api-monitoring` |
| `api-simulation` | postman:api-simulation | `/postman:api-simulation` |
| `api-testing` | postman:api-testing | `/postman:api-testing` |
| `bootstrap` | postman:bootstrap | `/postman:bootstrap` |
| `ci-integration` | postman:ci-integration | `/postman:ci-integration` |
| `collection-schema-v3` | postman:collection-schema-v3 | `/postman:collection-schema-v3` |
| `datasets` | postman:datasets | `/postman:datasets` |
| `flows` | postman:flows | `/postman:flows` |
| `performance-testing` | postman:performance-testing | `/postman:performance-testing` |
| `postman-mcp-server` | postman:postman-mcp-server | `/postman:postman-mcp-server` |
| `variables` | postman:variables | `/postman:variables` |
| `webhook-testing` | postman:webhook-testing | `/postman:webhook-testing` |
| `problem-analyst` | problem-analyst | `Usa el agente problem-analyst para …` |

## Comandos de Claude Code

| Código | Nombre | Comando |
|---|---|---|
| `/help` | Ayuda y lista de comandos | `/help` |
| `/init` | Crear CLAUDE.md | `/init` |
| `/clear` | Empezar de cero | `/clear` |
| `/compact` | Compactar contexto | `/compact conserva las decisiones de arquitectura` |
| `/memory` | Editar memoria | `/memory` |
| `/model` | Cambiar modelo | `/model` |
| `/config` | Configuración | `/config` |
| `/permissions` | Permisos | `/permissions` |
| `/agents` | Subagentes | `/agents` |
| `/mcp` | Servidores MCP | `/mcp` |
| `/hooks` | Hooks | `/hooks` |
| `/resume` | Retomar sesión | `/resume` |
| `Shift+Tab` | Cambiar de modo |  |
| `Esc` | Interrumpir |  |
| `Esc Esc` | Volver atrás |  |
| `!` | Ejecutar en la terminal | `! git status` |
| `@` | Mencionar un archivo | `@src/app/page.tsx` |
| `/` | Invocar una skill | `/impeccable critique src/app` |
| `/code-review` | Buscar bugs en el diff | `/code-review high --fix` |
| `/simplify` | Simplificar el código cambiado | `/simplify` |
| `/security-review` | Revisión de seguridad | `/security-review` |
| `--add-dir` | --add-dir <directories...> | `claude --add-dir` |
| `--agent` | --agent <agent> | `claude --agent` |
| `--agents` | --agents <json-or-file> | `claude --agents` |
| `--allow-dangerously-skip-permissions` | --allow-dangerously-skip-permissions | `claude --allow-dangerously-skip-permissions` |
| `--allowedTools` | --allowedTools, --allowed-tools <tools...> | `claude --allowed-tools` |
| `--append-system-prompt` | --append-system-prompt <prompt> | `claude --append-system-prompt` |
| `--autocompact` | --autocompact <auto|tokens> | `claude --autocompact` |
| `--ax-screen-reader` | --ax-screen-reader | `claude --ax-screen-reader` |
| `--bg` | --bg, --background | `claude --background` |
| `--bare` | --bare | `claude --bare` |
| `--betas` | --betas <betas...> | `claude --betas` |
| `--brief` | --brief | `claude --brief` |
| `--chrome` | --chrome | `claude --chrome` |
| `--cloud` | --cloud [description|session_id|url] | `claude --cloud` |
| `-c` | -c, --continue | `claude --continue` |
| `--dangerously-skip-permissions` | --dangerously-skip-permissions | `claude --dangerously-skip-permissions` |
| `-d` | -d, --debug [filter] | `claude --debug` |
| `--debug-file` | --debug-file <path> | `claude --debug-file` |
| `--desktop` | --desktop | `claude --desktop` |
| `--disable-slash-commands` | --disable-slash-commands | `claude --disable-slash-commands` |
| `--disallowedTools` | --disallowedTools, --disallowed-tools <tools...> | `claude --disallowed-tools` |
| `--effort` | --effort <level> | `claude --effort` |
| `--environment` | --environment <environment_id> | `claude --environment` |
| `--exclude-dynamic-system-prompt-sections` | --exclude-dynamic-system-prompt-sections | `claude --exclude-dynamic-system-prompt-sections` |
| `--fallback-model` | --fallback-model <model> | `claude --fallback-model` |
| `--file` | --file <specs...> | `claude --file` |
| `--fork-session` | --fork-session | `claude --fork-session` |
| `--forward-subagent-text` | --forward-subagent-text | `claude --forward-subagent-text` |
| `--from-pr` | --from-pr [value] | `claude --from-pr` |
| `-h` | -h, --help | `claude --help` |
| `--ide` | --ide | `claude --ide` |
| `--include-hook-events` | --include-hook-events | `claude --include-hook-events` |
| `--include-partial-messages` | --include-partial-messages | `claude --include-partial-messages` |
| `--input-format` | --input-format <format> | `claude --input-format` |
| `--json-schema` | --json-schema <schema> | `claude --json-schema` |
| `--max-budget-usd` | --max-budget-usd <amount> | `claude --max-budget-usd` |
| `--mcp-config` | --mcp-config <configs...> | `claude --mcp-config` |
| `--model` | --model <model> | `claude --model` |
| `-n` | -n, --name <name> | `claude --name` |
| `--no-chrome` | --no-chrome | `claude --no-chrome` |
| `--no-session-persistence` | --no-session-persistence | `claude --no-session-persistence` |
| `--output-format` | --output-format <format> | `claude --output-format` |
| `--permission-mode` | --permission-mode <mode> | `claude --permission-mode` |
| `--permission-prompts` | --permission-prompts <target> | `claude --permission-prompts` |
| `--plugin-dir` | --plugin-dir <path> | `claude --plugin-dir` |
| `--plugin-url` | --plugin-url <url> | `claude --plugin-url` |
| `-p` | -p, --print | `claude --print` |
| `--prompt-suggestions` | --prompt-suggestions [value] | `claude --prompt-suggestions` |
| `--remote-control` | --remote-control [name] | `claude --remote-control` |
| `--remote-control-session-name-prefix` | --remote-control-session-name-prefix <prefix> | `claude --remote-control-session-name-prefix` |
| `--replay-user-messages` | --replay-user-messages | `claude --replay-user-messages` |
| `--restricted` | --restricted | `claude --restricted` |
| `-r` | -r, --resume [value] | `claude --resume` |
| `--safe-mode` | --safe-mode | `claude --safe-mode` |
| `--session-id` | --session-id <uuid> | `claude --session-id` |
| `--setting-sources` | --setting-sources <sources> | `claude --setting-sources` |
| `--settings` | --settings <file-or-json> | `claude --settings` |
| `--strict-mcp-config` | --strict-mcp-config | `claude --strict-mcp-config` |
| `--system-prompt` | --system-prompt <prompt> | `claude --system-prompt` |
| `--system-prompt-snapshot` | --system-prompt-snapshot <on|off> | `claude --system-prompt-snapshot` |
| `--teleport` | --teleport [session] | `claude --teleport` |
| `--tmux` | --tmux | `claude --tmux` |
| `--tools` | --tools <tools...> | `claude --tools` |
| `--verbose` | --verbose | `claude --verbose` |
| `-v` | -v, --version | `claude --version` |
| `-w` | -w, --worktree [name] | `claude --worktree` |

## Instalaciones

| Código | Nombre | Comando |
|---|---|---|
| `6.12.4` | REPOSITORIOS (raíz) | `npx bmad-method@latest install --directory "D:\REPOSITORIOS" --action quick-update --yes` |
