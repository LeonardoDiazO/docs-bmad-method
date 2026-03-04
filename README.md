# 🧠 BMAD METHOD
### Breakthrough Method of Agile AI-driven Development

> Un framework de agentes de IA para desarrollar software de forma estructurada, trazable y reproducible — desde la idea hasta producción.

[![BMAD Version](https://img.shields.io/badge/BMAD-v1.0-6366f1?style=flat-square)](.)
[![Method](https://img.shields.io/badge/Method-Agile%20AI--driven-8b5cf6?style=flat-square)](.)
[![Status](https://img.shields.io/badge/Status-Active-22c55e?style=flat-square)](.)

---

## 📑 Tabla de Contenidos

1. [¿Qué es BMAD?](#-qué-es-bmad)
2. [Los 6 Agentes](#-los-6-agentes)
3. [Flujo Completo](#-flujo-completo)
4. [Fase 1 — Antes de Desarrollar](#-fase-1--antes-de-desarrollar)
5. [Fase 2 — Durante el Desarrollo](#-fase-2--durante-el-desarrollo)
6. [Fase 3 — Validación y Cierre](#-fase-3--validación-y-cierre)
7. [Resolución de Errores en Producción](#-resolución-de-errores-en-producción)
8. [Gestión de Sesiones y Contexto](#-gestión-de-sesiones-y-contexto)
9. [Integración con Herramientas](#-integración-con-herramientas)
10. [Ejemplos Reales](#-ejemplos-reales)
11. [Checklists Go / No-Go](#-checklists-go--no-go)
12. [Errores Comunes](#-errores-comunes)
13. [Plantillas](#-plantillas)

---

## 📌 ¿Qué es BMAD?

BMAD es un método de trabajo con IA que simula un **equipo de desarrollo completo** mediante roles especializados llamados agentes. Cada agente tiene una responsabilidad única, entregables definidos y criterios claros para pasar al siguiente.

### Principios Fundamentales

| # | Principio | Descripción |
|---|-----------|-------------|
| 1 | **Análisis antes que código** | Nunca escribir código sin haber analizado, planificado y arquitectado |
| 2 | **Entregables por agente** | Cada agente produce un output documentado antes de ceder el paso |
| 3 | **Contexto persistente** | Todo output se guarda — ninguna sesión empieza desde cero |
| 4 | **Separación de roles** | Un agente no invade el rol de otro |
| 5 | **Orquestación continua** | El Orchestrator supervisa alineación en todo momento |

---

## 👥 Los 6 Agentes

| # | Agente | Alias | Responsabilidad Core | Entregable |
|---|--------|-------|----------------------|------------|
| 1 | 🔍 **Analyst** | BA | Entiende el problema real, restricciones y riesgos | Documento de Análisis |
| 2 | 📋 **PM** | PM | Convierte el análisis en plan de producto priorizado | PRD |
| 3 | 🏗️ **Architect** | ARCH | Diseña la solución técnica y el stack | Documento de Arquitectura |
| 4 | 💻 **Developer** | DEV | Implementa código basado en la arquitectura | Código + Documentación |
| 5 | 🧪 **QA** | QA | Valida calidad, seguridad y criterios de aceptación | Reporte de QA |
| 6 | 🎯 **Orchestrator** | ORCH | Coordina, desbloquea y mantiene alineamiento | Decisiones documentadas |

---

## 🗺️ Flujo Completo

```
╔══════════════════════════════════════════════════════════════════╗
║                    🎯 ORCHESTRATOR (Transversal)                 ║
║              Supervisa alineamiento en todo momento              ║
╚══════════════════════════════════════════════════════════════════╝
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────────┐
│  FASE 1 — ANTES DE DESARROLLAR                                  │
│                                                                 │
│  🔍 Analyst ──▶ ✅ Go/No-Go ──▶ 📋 PM ──▶ ✅ Go/No-Go ──▶ 🏗️ Arch │
│                                                                 │
│  Output: Análisis        Output: PRD         Output: Arquitectura│
└─────────────────────────────┬───────────────────────────────────┘
                              │ ✅ Go/No-Go Fase 2
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  FASE 2 — DURANTE EL DESARROLLO                                 │
│                                                                 │
│  💻 Developer ──▶ [Feature] ──▶ 🧪 QA ──▶ ✅ Aprobado ──▶ Merge │
│       ↑                              │                          │
│       └──────── ❌ Issues ───────────┘                          │
└─────────────────────────────┬───────────────────────────────────┘
                              │ ✅ Go/No-Go Producción
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  FASE 3 — VALIDACIÓN Y CIERRE                                   │
│                                                                 │
│  🧪 QA Final ──▶ ✅ Certificación ──▶ 🚀 Deploy ──▶ Monitoreo  │
└─────────────────────────────────────────────────────────────────┘
```

---

# 📘 FASE 1 — Antes de Desarrollar

---

## Agente 1: 🔍 Analyst

**Cuándo activarlo:** Al inicio de cualquier proyecto o feature. Antes de cualquier línea de código.  
**Cuándo NO usarlo:** Para tareas menores de mantenimiento ya analizadas.

### Prompt Base

```
Actúa como el Agente Analyst del método BMAD.

Tu único objetivo es entender el problema real antes de proponer soluciones.
Haz todas las preguntas necesarias y documenta las respuestas.

Analiza y responde:
1. ¿Cuál es el problema real? (no el síntoma)
2. ¿Quiénes son los usuarios y qué necesitan?
3. ¿Qué restricciones existen? (presupuesto, tiempo, tecnología, equipo)
4. ¿Qué ya se intentó y por qué falló?
5. ¿Qué riesgos existen si no se resuelve?
6. ¿Qué métricas confirmarán que el problema está resuelto?

Contexto del proyecto:
[DESCRIBE TU PROYECTO O PROBLEMA AQUÍ]

Al finalizar, estructura tu output en el formato:
- Problema real identificado:
- Restricciones:
- Riesgos:
- Lo que ya se intentó:
- Métricas de éxito:
- Preguntas pendientes:
```

### Checklist de Entregable

```
[ ] Problema real documentado (no síntoma)
[ ] Restricciones listadas con impacto
[ ] Riesgos clasificados por probabilidad e impacto
[ ] Usuarios identificados con sus necesidades
[ ] Métricas de éxito definidas
[ ] Preguntas abiertas resueltas o escaladas al PM
```

---

## Agente 2: 📋 PM (Product Manager)

**Cuándo activarlo:** Con el output del Analyst aprobado.

### Prompt Base

```
Actúa como el Agente PM del método BMAD.

Basándote en el siguiente análisis del Analyst:
[PEGA EL OUTPUT COMPLETO DEL ANALYST]

Crea el PRD (Product Requirements Document) con:

1. OBJETIVO: Una línea que describe qué resuelve y para quién
2. USUARIOS: Perfil del usuario principal
3. FEATURES:
   - Must Have (sin esto no hay producto)
   - Should Have (importante pero no bloqueante)
   - Nice to Have (futuras versiones)
4. CRITERIOS DE ACEPTACIÓN: Por cada Must Have, qué debe hacer exactamente
5. OUT OF SCOPE: Lo que explícitamente NO se construirá
6. DEFINITION OF DONE: Qué significa que el proyecto está terminado
7. RIESGOS Y DEPENDENCIAS

Sé específico. Evita ambigüedades. Si algo no está claro, señálalo.
```

### Checklist de Entregable

```
[ ] Objetivo en una sola línea claro y medible
[ ] Features priorizadas con Must/Should/Nice
[ ] Criterio de aceptación por cada Must Have
[ ] Out of scope documentado explícitamente
[ ] Definition of Done acordado
[ ] Dependencias externas identificadas
```

---

## Agente 3: 🏗️ Architect

**Cuándo activarlo:** Con el PRD aprobado por el equipo.

### Prompt Base

```
Actúa como el Agente Architect del método BMAD.

Basándote en este PRD:
[PEGA EL PRD COMPLETO]

Define la arquitectura técnica incluyendo:

1. STACK TECNOLÓGICO: Cada tecnología con su justificación
2. LO QUE NO USAREMOS: Tecnologías descartadas y por qué
3. ESTRUCTURA DE CARPETAS: Árbol del proyecto
4. FLUJO DE DATOS: Cómo viaja la información de A a Z
5. SERVICIOS EXTERNOS: APIs, límites, costos, alternativas si fallan
6. DECISIONES TÉCNICAS CLAVE: Con trade-offs documentados
7. RIESGOS TÉCNICOS: Lo que podría fallar y el plan de contingencia
8. GUÍA PARA EL DEVELOPER: Qué puede y qué no puede cambiar sin consultar

Documenta CADA decisión con su razonamiento. El Developer no debe adivinar.
```

### Checklist de Entregable

```
[ ] Stack con justificación por tecnología
[ ] Tecnologías descartadas documentadas con razón
[ ] Estructura de carpetas definida
[ ] Flujo de datos documentado
[ ] Límites de servicios externos identificados
[ ] Plan de contingencia para servicios críticos
[ ] Reglas claras para el Developer
```

---

# 🔨 FASE 2 — Durante el Desarrollo

---

## Agente 4: 💻 Developer

**Cuándo activarlo:** Con arquitectura aprobada.  
**Regla de oro:** Solo implementa lo que el Architect diseñó y el PM aprobó.

### Prompt Base por Feature

```
Actúa como el Agente Developer del método BMAD.

ARQUITECTURA DE REFERENCIA:
[PEGA EL DOCUMENTO DE ARQUITECTURA]

TAREA ACTUAL:
Feature: [NOMBRE DE LA FEATURE]
Criterio de aceptación: [DEL PRD]
Restricciones: [DEL ANALYST]

Implementa esta feature siguiendo:
- Stack exacto definido por el Architect
- Código limpio, comentado en puntos clave
- Manejo de errores completo
- Sin agregar dependencias no aprobadas

Al finalizar, documenta:
- Qué implementaste
- Decisiones de implementación tomadas
- Qué queda pendiente
- Algo que el QA deba revisar con especial atención
```

### Reglas del Developer

```
✅ PUEDE hacer:
   - Implementar features del PRD
   - Pedir clarificación al Architect antes de asumir
   - Documentar decisiones de implementación
   - Señalar deuda técnica sin crearla

❌ NO PUEDE hacer:
   - Cambiar el stack sin aprobación del Architect
   - Agregar features no aprobadas por el PM
   - Hacer suposiciones arquitectónicas silenciosas
   - Saltarse el QA porque "funciona en local"
```

### Prompt para Gestión de Contexto entre Sesiones

```
Actúa como el Agente Developer del método BMAD.

RESUMEN DEL PROYECTO (contexto acumulado):
[PEGA EL ESTADO ACTUAL DEL BMAD SESSION DOC]

Última sesión terminamos en:
[QUÉ SE HIZO LAST SESSION]

Continuamos con:
[PRÓXIMA TAREA]
```

---

## Agente 6: 🎯 Orchestrator (Transversal)

**Cuándo activarlo:** Ante cualquier bloqueo, conflicto entre agentes o desviación del objetivo.

### Prompt de Desbloqueo

```
Actúa como el Orchestrator del método BMAD.

OBJETIVO ORIGINAL DEL PROYECTO:
[OBJETIVO DEL PRD]

ESTADO ACTUAL:
- Analyst definió: [resumen en 2 líneas]
- PM planificó: [resumen en 2 líneas]
- Architect diseñó: [resumen en 2 líneas]
- Developer reporta: [resumen en 2 líneas]

BLOQUEO ACTUAL:
[DESCRIBE EL PROBLEMA ESPECÍFICO]

Determina:
1. ¿Qué agente debe intervenir?
2. ¿Qué debe hacer exactamente?
3. ¿Esta situación requiere revisitar una fase anterior?
4. ¿El objetivo original sigue siendo válido o debe ajustarse?
```

### Prompt de Alineamiento Semanal

```
Actúa como Orchestrator BMAD en revisión de alineamiento.

Revisa si el proyecto sigue alineado:

Objetivo original: [OBJETIVO]
Lo que se está construyendo hoy: [DESCRIPCIÓN ACTUAL]

¿Hay desviación? ¿Qué decisiones se tomaron que no estaban en el plan?
¿Qué agente debe ser convocado para corregir el rumbo?
```

---

# ✅ FASE 3 — Validación y Cierre

---

## Agente 5: 🧪 QA

**Cuándo activarlo:** Al completar cada feature y antes de cualquier deploy a producción.

### Prompt de Revisión de Feature

```
Actúa como el Agente QA del método BMAD.

CÓDIGO / FEATURE A REVISAR:
[PEGA EL CÓDIGO O DESCRIBE LA FEATURE]

CRITERIOS DE ACEPTACIÓN (del PRD):
[PEGA LOS CRITERIOS]

ARQUITECTURA DE REFERENCIA:
[PEGA PUNTOS CLAVE DE ARQUITECTURA]

Busca y reporta con severidad (Critical / High / Medium / Low):
1. Bugs o errores lógicos
2. Edge cases no manejados
3. Problemas de performance
4. Vulnerabilidades de seguridad
5. Código fuera de la arquitectura definida
6. Falta de manejo de errores
7. Criterios de aceptación no cumplidos

Formato de reporte:
- [SEVERIDAD] Descripción del issue
- Ubicación: archivo/función
- Impacto: qué puede fallar
- Sugerencia de fix
```

### Prompt de Certificación Final (Pre-Deploy)

```
Actúa como QA BMAD en revisión final pre-producción.

Certifica que:
[ ] Todos los Must Have del PRD están implementados
[ ] No hay issues Critical o High sin resolver
[ ] El flujo completo fue probado end-to-end
[ ] Los servicios externos fueron probados con sus límites reales
[ ] El manejo de errores cubre los casos documentados por el Analyst
[ ] La arquitectura del Architect fue respetada

Estado: APROBADO / RECHAZADO
Motivo: [si es rechazado]
```

---

# 🚨 Resolución de Errores en Producción

```
ERROR DETECTADO EN PRODUCCIÓN
           │
           ▼
┌──────────────────────┐
│   🔍 Analyst         │
│   Modo: Debug        │──▶ ¿Cuál es el error real?
│                      │──▶ ¿Cuándo ocurre exactamente?
│                      │──▶ ¿Cuántos usuarios afecta?
└──────────┬───────────┘
           │
           ▼  ¿Es un problema de arquitectura?
┌──────────────────────┐
│   🏗️ Architect       │──▶ ¿Qué decisión técnica lo causó?
│   Modo: Root Cause   │──▶ ¿La fix rompe algo más?
│                      │──▶ ¿Requiere cambio de arquitectura?
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   💻 Developer       │──▶ Implementa el fix
│   Modo: Hotfix       │──▶ Sin introducir deuda técnica nueva
│                      │──▶ Documenta el cambio en el BMAD Session Doc
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   🧪 QA              │──▶ Verifica que el fix resuelve el error
│   Modo: Regresión    │──▶ Verifica que nada más se rompió
│                      │──▶ Aprueba para producción
└──────────────────────┘
```

### Prompt de Debug

```
Actúa como el Agente Analyst BMAD en modo Debug.

ERROR EN PRODUCCIÓN:
Mensaje: [ERROR COMPLETO CON STACK TRACE]
Cuándo ocurre: [PASOS PARA REPRODUCIR]
Frecuencia: [SIEMPRE / A VECES / BAJO CIERTAS CONDICIONES]
Impacto: [USUARIOS AFECTADOS / FUNCIONES BLOQUEADAS]
Stack tecnológico: [TU STACK]
Lo que ya intentamos: [INTENTOS PREVIOS]

Entrega:
1. Causa raíz probable (no el síntoma)
2. Severidad: Critical / High / Medium / Low
3. Agente que debe resolver y con qué prompt
4. ¿Requiere revisión del Architect antes del fix?
```

---

# 💾 Gestión de Sesiones y Contexto

Una de las limitaciones de trabajar con IA es que **cada conversación empieza desde cero**. BMAD resuelve esto con el **BMAD Session Document**.

## El BMAD Session Document

Crea un archivo `BMAD-SESSION.md` en la raíz de tu repositorio y actualízalo al final de cada sesión.

### Estructura del BMAD Session Document

```markdown
# BMAD SESSION — [NOMBRE DEL PROYECTO]
Última actualización: [FECHA Y HORA]

## 🎯 Objetivo del Proyecto
[Una línea del PRD]

## 📊 Estado Actual
- Fase: [FASE 1 / FASE 2 / FASE 3 / PRODUCCIÓN]
- Agente activo: [AGENTE ACTUAL]
- Progreso: [X% completado]

## ✅ Output del Analyst
[PEGA EL OUTPUT COMPLETO]

## ✅ Output del PM (PRD)
[PEGA EL PRD COMPLETO]

## ✅ Output del Architect
[PEGA LA ARQUITECTURA COMPLETA]

## 🔄 Log del Developer
### Sesión [FECHA]
- Feature trabajada: 
- Completado:
- Pendiente:
- Decisiones tomadas:
- Notas para QA:

## 🧪 Reportes QA
### Reporte [FECHA]
- Feature revisada:
- Issues encontrados:
- Estado: APROBADO / RECHAZADO

## 🚨 Bugs en Producción
### Bug [FECHA]
- Error:
- Causa raíz:
- Fix aplicado:
- QA aprobó:

## 📌 Decisiones del Orchestrator
[LISTA DE DECISIONES CON FECHA Y RAZÓN]
```

### Cómo cargar contexto al inicio de cada sesión

```
Actúa como el Agente [AGENTE QUE NECESITAS] del método BMAD.

Lee el siguiente BMAD Session Document y continúa desde donde nos quedamos:

[PEGA EL CONTENIDO DE BMAD-SESSION.md]

Continuamos con: [TAREA ESPECÍFICA]
```

---

# 🛠️ Integración con Herramientas

## Cursor (Recomendado)

Crea el archivo `.cursor/rules/bmad.mdc` en tu proyecto:

```markdown
---
description: Reglas BMAD para este proyecto
globs: **/*
---

# BMAD Rules

Siempre actúa respetando el método BMAD.
Antes de escribir código, verifica que existe un documento de arquitectura.
No agregues dependencias no listadas en la arquitectura.
Ante cualquier duda, actúa como Orchestrator y señala qué agente debe intervenir.

Stack aprobado para este proyecto: [TU STACK]
Arquitectura en: BMAD-SESSION.md
```

## VS Code

Instala la extensión **Continue** y configura el contexto:

```json
// .continue/config.json
{
  "systemMessage": "Actúa bajo el método BMAD. El contexto del proyecto está en BMAD-SESSION.md. Nunca sugieras tecnologías fuera del stack aprobado por el Architect.",
  "contextProviders": [
    { "name": "file", "params": { "nFiles": 1 } }
  ]
}
```

## GitHub — PR Template

Crea `.github/pull_request_template.md`:

```markdown
## BMAD Checklist — Pull Request

### Developer
- [ ] Feature implementada según arquitectura del Architect
- [ ] Sin dependencias no aprobadas
- [ ] Manejo de errores completo
- [ ] BMAD-SESSION.md actualizado

### QA
- [ ] Criterios de aceptación cumplidos
- [ ] Edge cases probados
- [ ] No hay issues Critical o High abiertos

### Referencia
- Feature del PRD: [NOMBRE]
- Architect aprobó cambios: [ ] Sí / [ ] No aplica
- Issues del QA resueltos: [LISTA]
```

---

# 📖 Ejemplos Reales

## Ejemplo: StudyAI — Error 429 de Gemini

Este caso real muestra cómo BMAD hubiera evitado el problema desde el inicio.

---

### 🔍 Analyst — Output Real

```
Problema real: El generador de módulos falla en producción por límites 
               de rate del free tier de Gemini (429 errors).

Restricciones identificadas:
- Presupuesto: $0/mes (no negociable)
- Frontend only: sin backend disponible
- Usuarios simultáneos: 1-10
- PDFs hasta 25MB como input

Riesgos:
- [CRITICAL] API key expuesta en código frontend → robo de clave
- [HIGH] Rate limit de Gemini free: 15 RPM — se satura con 2 usuarios
- [MEDIUM] PDFs escaneados no tienen texto extraíble

Lo que ya se intentó:
- Gemini 2.0 Flash con API key en frontend → 429 errors

Métricas de éxito:
- 0 errores 429 en producción con 10 usuarios simultáneos
- Costo mensual: $0
```

---

### 📋 PM — Output Real

```
Objetivo: Generar módulos de estudio desde PDFs, gratis, sin errores de rate limit.

Must Have:
- [ ] Subir PDF y obtener módulos de estudio
- [ ] 0 errores por rate limit con 10 usuarios
- [ ] Costo $0/mes

Out of Scope:
- Backend propio
- Autenticación de usuarios
- Almacenamiento de PDFs

Definition of Done:
- 10 usuarios simultáneos generan módulos sin un solo 429
- Costo en producción = $0
```

---

### 🏗️ Architect — Output Real

```
Stack elegido:
- pdf.js → extrae texto del PDF en el browser (gratis, sin servidor)
- Groq API (Llama 3.3 70B) → análisis de texto (gratis: 30RPM / 500K tokens/día)

Descartado:
- Gemini: free tier 15 RPM insuficiente para producción
- OpenAI: requiere pago
- Claude API directa: no gratuita para producción

Decisión clave:
- Extraer texto con pdf.js antes de enviar a la IA
  → Reduce payload de MB a KB
  → Elimina necesidad de soporte nativo de PDF en la API

Plan de contingencia:
- Si Groq cae → mostrar mensaje amigable + reintentar en 30 segundos
- Si PDF no tiene texto → detectar y alertar al usuario
```

---

# ✅ Checklists Go / No-Go

### Go/No-Go: Fase 1 → Fase 2

```
Antes de que el Developer escriba una línea de código:

ANALYST
[ ] Problema real documentado (no síntoma)
[ ] Restricciones técnicas y de negocio identificadas
[ ] Riesgos clasificados

PM
[ ] PRD completo con Must Have y criterios de aceptación
[ ] Out of scope explícito
[ ] Definition of Done acordado por el equipo

ARCHITECT
[ ] Stack definido con justificación
[ ] Tecnologías descartadas documentadas
[ ] Servicios externos con sus límites reales probados
[ ] Reglas para el Developer documentadas

RESULTADO: [ ] GO  [ ] NO-GO
Motivo si NO-GO: _______________
```

### Go/No-Go: Fase 2 → Producción

```
Antes de cualquier deploy:

DEVELOPER
[ ] Todos los Must Have implementados
[ ] BMAD-SESSION.md actualizado con decisiones

QA
[ ] Sin issues Critical o High abiertos
[ ] Flujo end-to-end probado
[ ] Servicios externos probados con sus límites reales
[ ] Manejo de errores cubre los casos del Analyst

RESULTADO: [ ] GO  [ ] NO-GO
Motivo si NO-GO: _______________
```

---

# ⚠️ Errores Comunes

| Error | Consecuencia Real | Solución BMAD |
|-------|------------------|---------------|
| Saltar al Developer sin Architect | Código que no escala, decisiones mal tomadas (ej: Gemini 429) | Checklist Go/No-Go obligatorio |
| No documentar outputs | Perder contexto entre sesiones, repetir trabajo | Actualizar BMAD-SESSION.md al final de cada sesión |
| Usar Developer para analizar | Soluciones sesgadas hacia lo técnico, ignoran restricciones de negocio | Separar roles estrictamente |
| Ignorar QA porque "funciona en local" | Bugs en producción, regresiones | QA obligatorio antes de cada merge |
| No invocar Orchestrator ante bloqueos | Ciclos interminables, decisiones sin documentar | Invocar Orchestrator ante cualquier bloqueo >30 min |
| API key en frontend sin analizar | Robo de credenciales, costos inesperados | Analyst debe revisar seguridad en Fase 1 |

---

# 📋 Plantillas

## Plantilla: Inicio de Proyecto

```markdown
## BMAD SESSION — [NOMBRE DEL PROYECTO]
Fecha inicio: [FECHA]
Objetivo: [UNA LÍNEA]

### ✅ Analyst — [FECHA]
- Problema real:
- Restricciones:
- Riesgos:
- Métricas de éxito:

### ⬜ PM
### ⬜ Architect
### ⬜ Developer
### ⬜ QA
### ⬜ Deploy
```

## Plantilla: Reporte de Bug

```markdown
## 🚨 Bug Report — [FECHA]
Reportado por: [AGENTE / USUARIO]
Severidad: [ ] Critical  [ ] High  [ ] Medium  [ ] Low

Error: 
Pasos para reproducir:
Impacto:

### Analyst — Diagnóstico
Causa raíz:

### Architect — Revisión
¿Requiere cambio de arquitectura?:

### Developer — Fix
Fix implementado:

### QA — Verificación
Estado: [ ] Aprobado  [ ] Rechazado
```

---

# 🔁 Regla de Oro

> **Ningún agente avanza sin completar su entregable y pasar el Go/No-Go.**  
> **El Orchestrator es el guardián de esta regla.**  
> **El BMAD Session Document es la memoria del proyecto.**

---

## 📁 Estructura de Archivos Recomendada

```
proyecto/
├── BMAD-SESSION.md          ← Documento vivo del proyecto
├── README.md                ← Documentación pública
├── .cursor/
│   └── rules/
│       └── bmad.mdc         ← Reglas para Cursor
├── .github/
│   └── pull_request_template.md  ← Checklist en cada PR
└── docs/
    ├── analyst-output.md    ← Output del Analyst
    ├── prd.md               ← PRD del PM
    ├── architecture.md      ← Arquitectura del Architect
    └── qa-reports/          ← Reportes de QA por fecha
```

---

*Documento mantenido bajo el método BMAD — Versión 1.0*  
*Actualizar con cada decisión relevante del proyecto.*
