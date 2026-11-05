# Informe de implementación

**Asignatura:** Electiva 1: Introducción a DevOps (ITLA 2026-C-3)
**Tema:** Pipeline CI/CD con GitHub Actions
**Estudiante(s):** Geisi Lisbeth Familia Montero (matrícula 2025-1977) · **Fecha:** ______
**Repositorio:** https://github.com/Geisi-Montero/app-tareas-cicd
**Página desplegada:** https://Geisi-Montero.github.io/app-tareas-cicd/


## 1. Resumen
Se implementó un pipeline CI/CD en GitHub Actions para una aplicación Node.js/Express de lista de tareas. El pipeline ejecuta análisis estático, pruebas unitarias y de integración con umbral de cobertura, construye la imagen Docker y despliega el frontend a GitHub Pages solo si todo lo anterior pasa.

## 2. Configuración inicial
- Repositorio público creado en GitHub y plantilla subida a `main`.
- Estructura: `src/`, `public/`, `tests/{unit,integration}`, `docs/`, `.github/workflows/`.
- Pages configurado con **Source: GitHub Actions**.
- [CAPTURA] Repositorio con su estructura. [CAPTURA] Settings → Pages.

## 3. Cambios realizados sobre la plantilla
| Cambio | Archivo(s) | Motivo |
|---|---|---|
| Endpoint `DELETE /api/tareas/:id` | `src/app.js` | Funcionalidad nueva pedida en la práctica |
| Validación de título (máx. 100) en módulo puro | `src/validacion.js` | Permitir pruebas unitarias reales |
| Contador de IDs independiente (`siguienteId`) | `src/app.js` | La plantilla usaba `length + 1`, que duplica IDs al borrar |
| Botón «Eliminar» en el frontend | `public/index.html` | Usar la nueva funcionalidad |
| ESLint real (`eslint.config.js`) | `package.json` | Reemplaza `node --check` por análisis estático real |
| Umbral de cobertura | `package.json` (`jest.coverageThreshold`) | Exigir pruebas en código nuevo |
| Subida de cobertura como artefacto | `.github/workflows/ci.yml` | Evidencia descargable |

## 4. Pruebas
- **Total: 22 pruebas** (6 originales + 16 nuevas): 10 ejecuciones unitarias de `validarTitulo` (6 definiciones, una con `test.each`) y 6 pruebas de integración nuevas, además de las originales movidas a `tests/integration/`.
- **Cobertura obtenida (local):** sentencias 96.66 %, ramas 88.88 %, funciones 100 %, líneas 100 %.
- **Umbral exigido:** 90 / 80 / 90 / 90 %.
- [CAPTURA] Salida de `npm test`.

## 5. Pipeline
Resumen en el README y detalle en [`PIPELINE.md`](PIPELINE.md).
- [CAPTURA] Run completo en verde, con los dos jobs.

## 6. Demostración rojo → verde
| Paso | Acción | Resultado |
|---|---|---|
| 1 | Rama `demo/rojo`: cambié `res.status(204)` por `res.status(200)` en el DELETE | ❌ Pipeline en rojo: falla *DELETE elimina la tarea (204)* |
| 2 | Corregí el código y volví a subir | ✅ Pipeline en verde |
- [CAPTURA] Run rojo con el paso fallido expandido. [CAPTURA] Run verde posterior.
- Commit que rompió: `______` · Commit que corrigió: `______`

## 7. Despliegue
- URL publicada: https://Geisi-Montero.github.io/app-tareas-cicd/
- [CAPTURA] Página funcionando.

## 8. Problemas encontrados y soluciones
| Problema | Solución |
|---|---|
| (ejemplo) Pages no estaba activado y falló el despliegue | Settings → Pages → Source: GitHub Actions y re-ejecutar |
| (agrega los tuyos) | |

## 9. Lecciones aprendidas
- (Escribe 3–5 ideas propias: por qué importa que el deploy dependa de las pruebas, valor del umbral de cobertura, etc.)

## 10. Conclusiones
(2–3 párrafos con tus palabras.)
