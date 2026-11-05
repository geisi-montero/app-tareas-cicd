# Guion del video / presentación (5–8 min)

Tip: graba la pantalla (OBS, Zoom o Loom), súbelo a YouTube como **No listado** y pega el enlace en el README e informe.

| Min | Qué mostrar | Qué decir |
|---|---|---|
| 0:00 | Portada: nombre, materia, objetivo | «Voy a mostrar un pipeline CI/CD con GitHub Actions para una app de tareas.» |
| 0:30 | Repositorio y estructura de carpetas | Explicar `src`, `tests/unit`, `tests/integration`, `.github/workflows` |
| 1:30 | Código nuevo: `DELETE` y `validacion.js` | Qué agregaste y por qué (incluye el bug de IDs duplicados que corregiste) |
| 2:30 | Terminal: `npm run lint` y `npm test` | Mostrar 22 pruebas y la tabla de cobertura |
| 3:30 | `ci.yml` línea por línea | Disparadores, job 1, `needs`, `if` del deploy |
| 4:30 | **Demo rojo:** romper algo → push → Actions en ❌ | Mostrar el paso que falló y leer el log |
| 5:30 | **Demo verde:** corregir → push → Actions en ✅ | El deploy solo corre cuando todo pasa |
| 6:30 | Abrir la URL de GitHub Pages | Página publicada |
| 7:00 | Cierre | Lecciones aprendidas |

## Comandos de la demo rojo → verde
```bash
git checkout -b demo/rojo
# 1) Rompe algo a propósito: en src/app.js cambia  res.status(204).end()  por  res.status(200).end()
npm test                              # (opcional) verás la prueba fallar localmente
git commit -am "test: romper DELETE a propósito (demo)"
git push -u origin demo/rojo
# En GitHub: abre un Pull Request hacia main -> el pipeline queda en ROJO (y no despliega)

# 2) Corrige: vuelve a poner res.status(204).end()
git commit -am "fix: restaurar 204 en DELETE"
git push                              # el pipeline pasa a VERDE
# Haz "Merge pull request" -> el push a main dispara el despliegue a Pages
```
