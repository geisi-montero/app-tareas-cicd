# Documentación del pipeline

Archivo: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)

## Disparadores
| Evento | Efecto |
|---|---|
| `push` a `main` | Ejecuta **build/pruebas** y luego **despliegue** |
| `pull_request` a `main` | Ejecuta solo **build/pruebas** (no despliega) |
| `workflow_dispatch` | Ejecución manual desde la pestaña *Actions* |

## Permisos
`contents: read` (leer el código), `pages: write` e `id-token: write` (requeridos por `deploy-pages` para publicar en Pages). Principio de mínimo privilegio.

## Job 1 — Build y pruebas (`build-test`)
| # | Etapa | Qué hace | Si falla |
|---|---|---|---|
| 1 | `actions/checkout@v4` | Descarga el código del repositorio | — |
| 2 | `actions/setup-node@v4` | Instala Node.js 20 | — |
| 3 | Instalar dependencias | `npm install` | Dependencias inaccesibles → rojo |
| 4 | Análisis estático | `npm run lint` (ESLint: variables sin usar, `===`, etc.) | Error de estilo/código → rojo |
| 5 | Pruebas + cobertura | `npm test` (Jest): unitarias + integración; valida umbrales | Prueba fallida **o** cobertura baja → rojo |
| 6 | Guardar cobertura | Sube `coverage/` como artefacto (`if: always()`) | — |
| 7 | Construir imagen Docker | `docker build` con el SHA del commit como etiqueta | Dockerfile roto → rojo |

## Job 2 — Despliegue a GitHub Pages (`deploy-pages`)
- `needs: build-test`: **solo corre si el Job 1 terminó en verde**. Es la «puerta de calidad».
- `if: github.ref == 'refs/heads/main' && github.event_name == 'push'`: los PR nunca despliegan.
- Pasos: `configure-pages` → `upload-pages-artifact` (carpeta `public/`) → `deploy-pages`.
- La URL final aparece en el entorno `github-pages` del run.

## Decisiones de diseño
- **Lint antes de pruebas:** falla rápido y barato.
- **Umbral de cobertura:** evita que el código nuevo se agregue sin pruebas.
- **Docker build en CI:** detecta un Dockerfile roto antes de que llegue a producción.
- **No se usa `package-lock.json`** (la plantilla lo ignora): por eso se usa `npm install` y no `npm ci`.

## Cómo leer un run
Pestaña **Actions** → clic en el run → clic en el job → expandir cada paso. ✅ verde = pasó, ❌ rojo = falló (el log del paso rojo dice por qué).
