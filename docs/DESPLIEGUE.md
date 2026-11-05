# Instrucciones de despliegue

## A. GitHub Pages (automático por el pipeline)
1. Crea un repositorio **público** en GitHub (vacío, sin README).
2. Sube el proyecto:
   ```bash
   git init
   git add .
   git commit -m "feat: proyecto inicial con pipeline CI/CD"
   git branch -M main
   git remote add origin https://github.com/Geisi-Montero/app-tareas-cicd.git
   git push -u origin main
   ```
3. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**. *(Hazlo antes o justo después del primer push; sin esto el job de despliegue falla.)*
4. Abre **Actions** y espera el check verde. La URL queda en `https://Geisi-Montero.github.io/app-tareas-cicd/`.
5. Cada push posterior a `main` redespliega automáticamente.

### Solución de problemas
| Síntoma | Causa probable | Solución |
|---|---|---|
| `deploy-pages` falla con *Pages not enabled* / 404 | Pages sin activar | Settings → Pages → Source: **GitHub Actions**, y *Re-run jobs* |
| Pruebas fallan por cobertura | Código nuevo sin pruebas | Agrega pruebas o revisa `coverage/` |
| El push se rechaza | Remoto con commits previos | Crea el repo **vacío** o haz `git pull --rebase` |
| La página no muestra la API | Pages es estático | Es lo esperado; usa `npm start` o Docker |

## B. Local con Node
```bash
npm install && npm start      # http://localhost:3000
```

## C. Local con Docker
```bash
docker build -t tareas-devops .
docker run -p 3000:3000 tareas-devops
curl http://localhost:3000/health
```
La imagen incluye `HEALTHCHECK` sobre `/health` y corre como usuario no-root (`node`).
