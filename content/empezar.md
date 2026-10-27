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
