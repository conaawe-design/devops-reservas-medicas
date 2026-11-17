# Guía de entrega — DevOps Unidad 1

Este proyecto cubre la **implementación exigida** para el caso de la empresa de salud. La entrega académica final debe incluir, además del código, el **informe en la plantilla oficial IACC**, sus **capturas reales**, el **enlace público al repositorio** y el **ZIP del proyecto**.

## Qué exige la tarea (6 actividades)

1. Diagnóstico: cuatro o más problemas del proceso tradicional y propuesta DevOps vinculada al caso.
2. Ciclo DevOps: Plan, Code, Build, Test, Release, Deploy, Operate y Monitor, con acciones y evidencia por fase.
3. Agilidad/Git: comparación Scrum-Kanban, ramas, commits, pull request, revisión, merge a main y capturas.
4. Implementación: src/index.html, src/styles.css, Dockerfile basado en nginx:alpine, docker-compose.yml, .env.example, .gitignore y README.md. Repo público, sin secretos.
5. Docker: imagen construida, contenedor iniciado, estado, visita a localhost:8080, logs y detención, más capturas.
6. Informe: monitoreo local (logs o stats), resultados, incidentes reales o ausencia de ellos, seguridad y >=4 mejoras. Enlace público y ZIP.

**GitHub Actions es opcional:** hay un ejemplo incluido que se ejecuta desde GitHub sin desplegar a servidores externos.

## Secuencia de capturas recomendadas

Todas las capturas se hacen **en tu computador**, no están pre-generadas:

1. VS Code con estructura del proyecto y archivos fuente.
2. Terminal: `docker --version`, `docker compose version`, `docker info` (se pueden separar).
3. Terminal: `docker compose up -d --build` mostrando resultado de construcción.
4. Docker Desktop: contenedor `devops-reservas-web` en ejecución.
5. Terminal: `docker compose ps` (idealmente `healthy` tras unos segundos, si el chequeo funciona).
6. Navegador: `http://localhost:8080` y formulario visible.
7. Navegador: mensaje **Simulación realizada** (con datos ficticios del formulario).
8. Terminal: `docker compose logs --tail=30 web` y `docker stats --no-stream devops-reservas-web`.
9. GitHub: repositorio **público**, historial de commits, rama `docs/evidencias`, pull request abierto y luego fusionado.
10. Terminal: `docker compose down` y `docker compose ps`, confirmando la detención.
11. Si usas GitHub Actions: pantalla de ejecución del workflow con su estado real.

Cada captura del informe debe incluir un pie del tipo: *Figura N. Verificación del contenedor mediante Docker Desktop. Fuente: elaboración propia.*

## Comandos fundamentales

```powershell
# Desde la carpeta que contiene docker-compose.yml

docker compose config
docker compose up -d --build
docker compose ps
curl.exe -I http://localhost:8080
docker compose logs --tail=30 web
docker stats --no-stream devops-reservas-web
docker compose down
```

## Riesgos y errores posibles

- `docker: command not found`: Docker Desktop no está instalado o la terminal debe reiniciarse.
- `Cannot connect to the Docker daemon`: iniciar Docker Desktop y esperar a que el motor esté operativo.
- Puerto 8080 ocupado: detener el servicio que lo ocupa o cambiar `HOST_PORT` en un archivo `.env` local (no publicar `.env`).
- `localhost:8080` no abre: ejecutar `docker compose ps` y `docker compose logs web` para revisar el estado.
- Git solicita autenticación: seguir el mecanismo seguro de autenticación del navegador/administrador de credenciales; no introducir contraseñas directamente en archivos del proyecto.
- Si el formulario rechaza fechas de fin de semana, elegir un día hábil. No refleja una agenda médica real.

## Puntos de mejora para Actividad 6 (propuestas, no implementaciones)

1. Automatizar pruebas de contenido, HTML, accesibilidad y vulnerabilidades en GitHub Actions.
2. Fijar versiones/digests de imágenes, revisar periódicamente actualizaciones y escanear imágenes.
3. Añadir tableros y alertas de disponibilidad, tiempos de respuesta y consumo de recursos.
4. Definir un flujo de revisión obligatorio antes de fusionar a `main` y criterios de liberación.
5. Introducir observabilidad y gestión segura de secretos para una futura versión con backend real.

Estas mejoras se pueden analizar con relación al caso, sin afirmar que ya existen en la simulación.

## Instrucciones formales de presentación

- Usar la **plantilla de la tarea proporcionada por IACC** (no incluida aquí).
- Incorporar toda la bibliografía una sola vez **al final** del informe, en formato APA 7.
- Entregar el informe final en **PDF**, con el nombre `Nombre_Apellido_Tarea1.pdf`.
- Incluir la URL del repositorio público y adjuntar el archivo comprimido del proyecto.
- No colocar capturas con contraseñas, tokens, datos de pacientes o información privada.
