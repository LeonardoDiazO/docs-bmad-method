## Cómo se usa BMAD dentro de Claude Code

BMAD es un conjunto de **skills**: instrucciones empaquetadas que Claude carga cuando las invocas. Se instalan por proyecto (`_bmad/` y `.claude/skills/`), así que cada repo tiene su propia versión. Para usar una, escríbela como comando en Claude Code (`/bmad-prd`) o pídela con palabras ("crea el PRD"); Claude la reconoce por su descripción.

> **Si dudas, empieza por `/bmad-help`.** Lee qué documentos existen ya en el proyecto y te dice la siguiente skill. Las fichas de esta guía te dicen también qué viene antes y después de cada una.

## Elige la ruta según el tamaño del trabajo

```ruta Cambio pequeño o bug
/bmad-build | Pega la descripción, el bug o el enlace a la historia.
/bmad-code-review | Si el cambio toca algo delicado.
```

```ruta Funcionalidad en un proyecto existente
/bmad-project-context | Una vez por repo, para que los agentes conozcan sus reglas (bloque en `AGENTS.md`).
/bmad-spec | Convierte tu idea o notas en un `SPEC.md` breve. Si es grande, pídele "divídelo en historias".
/bmad-build | Una vez por historia.
/bmad-code-review | Revisión con varios revisores en paralelo.
/bmad-walkthrough | Si quieres revisar el cambio tú mismo, paso a paso.
```

```ruta Producto nuevo
/bmad-brainstorming | Explorar la idea. Alternativas: `/bmad-forge-idea` para ponerla a prueba, `/bmad-deep-recon` para investigar.
/bmad-product-brief | Problema, usuarios, propuesta y alcance.
/bmad-prd | Requisitos del producto.
/bmad-ux | Si tiene interfaz.
/bmad-architecture | Decisiones técnicas.
/bmad-create-epics-and-stories | Divide el trabajo en épicas e historias.
/bmad-sprint-planning | Genera el estado del sprint.
/bmad-build | Por cada historia, seguido de `/bmad-code-review`.
/bmad-retrospective | Al cerrar cada épica.
```

Si a mitad de sprint cambia algo grande, usa `/bmad-correct-course` antes de seguir construyendo.

## Qué cambió frente a la guía anterior

La versión anterior de esta guía describía seis agentes con un "Orchestrator". En BMAD 6.x eso ya no existe así:

- Las **skills** son la unidad de trabajo; los agentes (Mary, John, Winston, Sally, Amelia, Murat…) son personas que puedes invocar para conversar, pero no hace falta pasar por ellos.
- `bmad-build` reemplaza a `dev-story`, `quick-dev` y `create-story`.
- `bmad-prd`, `bmad-architecture` y `bmad-review` agrupan lo que antes eran varias skills (crear, editar, validar).
- Las skills antiguas siguen instaladas como **reemplazadas**: redirigen a la nueva. En esta guía aparecen con la esquina doblada.

## Mantener la guía al día

Desde esta carpeta, ejecuta `npm run sync`. Lee lo que tienes instalado (BMAD, skills, agentes, plugins, versión de Claude Code), consulta la última versión publicada de BMAD y regenera esta página y el `README.md`. Si la guía tiene más de 7 días, la barra superior te lo recuerda.

Para actualizar BMAD en un proyecto, ejecuta desde su carpeta `npx bmad-method@latest install --directory . --action quick-update --yes` (en el cajón **Instalaciones** cada proyecto trae el comando ya escrito con su ruta). Conserva tu configuración y tus personalizaciones. El cajón **Instalaciones** lista todos tus proyectos con BMAD y su versión.
