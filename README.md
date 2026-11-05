# Lista de Tareas — Pipeline CI/CD con GitHub Actions

[![CI/CD](https://github.com/Geisi-Montero/app-tareas-cicd/actions/workflows/ci.yml/badge.svg)](https://github.com/Geisi-Montero/app-tareas-cicd/actions/workflows/ci.yml)

> Electiva 1: Introducción a DevOps (ITLA 2026-C-3)
> **Autor(es):** Geisi Lisbeth Familia Montero · **Matrícula:** 2025-1977
> **Repositorio:** https://github.com/Geisi-Montero/app-tareas-cicd
> **Página publicada:** https://Geisi-Montero.github.io/app-tareas-cicd/

Aplicación web de lista de tareas (Node.js + Express) con un pipeline **CI/CD** completo: análisis estático, pruebas unitarias y de integración con cobertura, construcción de imagen Docker y despliegue automático a GitHub Pages.

## Contenido
- [Estructura del proyecto](#estructura-del-proyecto)
- [Ejecutar localmente](#ejecutar-localmente)
- [API](#api)
- [Pruebas y cobertura](#pruebas-y-cobertura)
- [Pipeline CI/CD](#pipeline-cicd)
- [Documentación adicional](#documentación-adicional)

## Estructura del proyecto
```
├── .github/workflows/ci.yml   # Pipeline de GitHub Actions
├── src/
│   ├── app.js                 # Rutas Express (createApp)
│   ├── validacion.js          # Lógica pura de validación
│   └── server.js              # Arranque del servidor
├── public/index.html          # Frontend estático (se publica en Pages)
├── tests/
│   ├── unit/                  # Pruebas unitarias
│   └── integration/           # Pruebas de integración (HTTP con Supertest)
├── docs/                      # Pipeline, despliegue, informe y guion del video
├── Dockerfile
├── eslint.config.js
└── package.json               # Scripts y umbral de cobertura (Jest)
```

## Ejecutar localmente
Requisitos: **Node.js 20+** y Git.
```bash
npm install
npm run lint     # análisis estático
npm test         # pruebas + cobertura
npm start        # http://localhost:3000
```
Con Docker (opcional):
```bash
docker build -t tareas-devops .
docker run -p 3000:3000 tareas-devops
```

## API
| Método | Ruta | Descripción | Códigos |
|---|---|---|---|
| GET | `/health` | Estado del servicio | 200 |
| GET | `/metrics` | Solicitudes, errores, tareas, tiempo activo | 200 |
| GET | `/api/tareas` | Lista las tareas | 200 |
| POST | `/api/tareas` | Crea una tarea (`{"titulo": "..."}`, máx. 100 caracteres) | 201, 400 |
| PATCH | `/api/tareas/:id` | Alterna completada/pendiente | 200, 404 |
| DELETE | `/api/tareas/:id` | **(nuevo)** Elimina una tarea | 204, 404 |

## Pruebas y cobertura
| Tipo | Ubicación | Qué valida |
|---|---|---|
| Unitarias | `tests/unit/` | `validarTitulo` de forma aislada (vacío, tipos inválidos, límite de 100) |
| Integración | `tests/integration/` | Endpoints reales vía HTTP: CRUD, 400/404, métricas, flujo completo |

`npm test` genera el reporte de cobertura (`coverage/`) y **falla** si baja de: 90 % sentencias, 80 % ramas, 90 % funciones, 90 % líneas. Configurado en `package.json` → `jest.coverageThreshold`.

## Pipeline CI/CD
Se ejecuta en cada *push* y *pull request* a `main` (y manualmente con *Run workflow*).

```
 push/PR ──► [Job 1: Build y pruebas] ──► [Job 2: Deploy a GitHub Pages]
              checkout → Node 20           solo en push a main
              npm install                  configure-pages
              ESLint                       upload-pages-artifact (public/)
              Jest + cobertura             deploy-pages
              guardar cobertura
              docker build
```
Explicación detallada de cada etapa en [`docs/PIPELINE.md`](docs/PIPELINE.md).

## Documentación adicional
- [Pipeline: etapas y decisiones](docs/PIPELINE.md)
- [Guía de contribución](CONTRIBUTING.md)
- [Instrucciones de despliegue](docs/DESPLIEGUE.md)
- [Informe de implementación](docs/INFORME.md)
- [Guion para el video / presentación](docs/GUION-VIDEO.md)

## Limitación conocida
GitHub Pages solo sirve archivos estáticos: la página publicada muestra el frontend en «modo estático» y **no** tiene la API. Para usar la API completa, ejecuta la app localmente o con Docker.

## Licencia
MIT
