# Guía de contribución

## Flujo de trabajo
1. Crea una rama desde `main`: `git checkout -b feat/nombre-corto` (o `fix/...`, `docs/...`).
2. Haz cambios pequeños y commits claros.
3. Antes de subir, ejecuta **localmente**:
   ```bash
   npm run lint
   npm test
   ```
4. Sube la rama y abre un **Pull Request** hacia `main`.
5. Espera que el pipeline esté en **verde** antes de hacer *merge*.

## Convención de commits
`tipo: descripción corta en minúsculas`

| Tipo | Uso |
|---|---|
| `feat` | Funcionalidad nueva |
| `fix` | Corrección de error |
| `test` | Pruebas |
| `docs` | Documentación |
| `ci` | Cambios al pipeline |
| `refactor` | Reestructurar sin cambiar comportamiento |

Ejemplo: `feat: agregar endpoint DELETE /api/tareas/:id`

## Reglas de calidad
- Todo cambio de comportamiento lleva su prueba.
- La cobertura no puede bajar de los umbrales de `package.json`.
- ESLint debe pasar sin errores.
- No subir `node_modules/` ni `coverage/` (ya están en `.gitignore`).

## Agregar una prueba
- **Unitaria** → `tests/unit/*.test.js` (funciones puras, sin HTTP).
- **Integración** → `tests/integration/*.test.js` (usa `supertest` con `createApp()`).

## Reportar un problema
Abre un *Issue* con: qué esperabas, qué pasó y pasos para reproducirlo.
