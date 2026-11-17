# Clínica Vida — Proyecto DevOps (Unidad 1)

Sitio web **estático y ficticio** que simula un formulario de reserva de horas médicas. Proyecto académico IACC, diseñado para demostrar fundamentos DevOps, control de versiones con Git/GitHub y ejecución reproducible con **Docker Desktop + Nginx**.

> **Advertencia:** no es una clínica real. No procesa reservas, no permite agendar atención real y no almacena ni envía datos personales. Utiliza exclusivamente información de demostración.

## Requisitos

- Docker Desktop abierto y con el motor de contenedores Linux en ejecución.
- Docker Compose incluido en Docker Desktop.
- Git y una cuenta de GitHub para publicar el proyecto (no se necesitan para ejecutarlo localmente).
- Navegador web.

## Estructura

```text
devops-reservas-medicas/
├── src/
│   ├── index.html
│   ├── styles.css
│   └── app.js                 # Interacción local, sin servidor ni almacenamiento
├── Dockerfile                 # Imagen base: nginx:alpine
├── docker-compose.yml        # Puerto 8080 (host) -> 80 (contenedor)
├── .env.example               # Variables de ejemplo, sin credenciales
├── .gitignore                 # Exclusión de datos locales/sensibles
├── .dockerignore              # Exclusión del contexto de construcción
├── .github/
│   └── workflows/
│       └── devops-automation.yml  # CI complementaria
├── docs/
│   ├── GUIA_ENTREGA.md
│   └── REGISTRO_EVIDENCIAS.md
└── README.md
```

## Ejecución local (Windows: PowerShell o terminal de VS Code)

Abre Docker Desktop. Después, abre una terminal **en la carpeta raíz del proyecto**, donde está `docker-compose.yml`.

```powershell
docker --version
docker compose version
docker info
docker compose config
docker compose up -d --build
docker compose ps
```

Entra a **http://localhost:8080**. Debe verse la página de Clínica Vida. Prueba el formulario con una especialidad, una fecha de lunes a viernes dentro de los próximos 45 días, un horario y una modalidad. El resultado será una **confirmación exclusivamente simulada**.

Para verificar el endpoint desde PowerShell:

```powershell
curl.exe -I http://localhost:8080
```

Para inspeccionar registros y métricas:

```powershell
docker compose logs --tail=30 web
docker stats --no-stream devops-reservas-web
```

Para detener y limpiar los recursos del proyecto:

```powershell
docker compose down
docker compose ps
```

El comando `docker compose down` detiene y elimina el contenedor y la red creada por Compose, pero **conserva la imagen Docker** para futuras ejecuciones.

### Puerto ocupado

La aplicación usa el puerto local 8080. Si ya está ocupado, crea un archivo `.env` a partir de `.env.example` y modifica `HOST_PORT=8081`. Luego visita `http://localhost:8081`. **Para las capturas de evaluación se debe usar 8080** cuando sea posible.

## Git y GitHub: flujo sugerido

1. Crea un repositorio **público vacío** llamado `devops-reservas-medicas` en GitHub. No actives README ni `.gitignore` durante la creación.
2. Ejecuta en una terminal situada en la carpeta del proyecto:

   ```powershell
   git init
   git branch -M main
   git add .
   git commit -m "chore: crear base del proyecto DevOps de reservas"
   git remote add origin https://github.com/TU_USUARIO/devops-reservas-medicas.git
   git push -u origin main
   ```

3. Para evidenciar trabajo con ramas, crea `docs/evidencias`, modifica `docs/REGISTRO_EVIDENCIAS.md` incorporando tus resultados reales y haz un commit de esa edición:

   ```powershell
   git switch -c docs/evidencias
   git add docs/REGISTRO_EVIDENCIAS.md
   git commit -m "docs: documentar evidencias de ejecución"
   git push -u origin docs/evidencias
   ```

4. En GitHub crea un **pull request** desde `docs/evidencias` hacia `main`. Revisa el diff, agrega una descripción y realiza **Merge pull request**.
5. En tu terminal, actualiza la rama principal y revisa el historial:

   ```powershell
   git switch main
   git pull origin main
   git --no-pager log --oneline --graph --all -10
   ```

**Importante:** `TU_USUARIO` es un marcador que debes reemplazar por tu usuario real. Nunca publiques contraseñas o tokens.

## Automatización complementaria

El workflow `.github/workflows/devops-automation.yml` ejecuta validaciones al realizar un `push` o abrir un pull request hacia `main`. Comprueba la presencia de archivos exigidos, construye la imagen y solicita la página por HTTP en un entorno temporal de GitHub Actions. **No publica la aplicación en Internet ni necesita credenciales.**

## Seguridad y alcance

- Sin backend ni base de datos; las selecciones solo existen en memoria del navegador durante la sesión.
- No se solicitan nombres, RUT, correos electrónicos, antecedentes médicos ni contraseñas.
- `.env.example` incluye únicamente un puerto de ejemplo. `.gitignore` excluye `.env` y archivos potencialmente sensibles.
- El servicio se publica solo en `127.0.0.1`, para acceder desde el mismo computador.
- `Dockerfile` usa explícitamente `nginx:alpine`, exigido por la tarea.
- En producción real harían falta autenticación, controles de acceso, políticas de privacidad, cifrado, validaciones de servidor y servicios de persistencia seguros. **No están incluidos** porque la evaluación exige una simulación estática.

## Evidencias e informe académico

Consulta `docs/GUIA_ENTREGA.md` y `docs/REGISTRO_EVIDENCIAS.md` para saber qué capturar y qué secciones completar. Las capturas reales deben insertarse en el **informe final usando la plantilla oficial de IACC**, no solamente guardarse como archivos separados.

## Fuentes de consulta

- Material IACC (2026), semanas 1, 2 y 3 de la asignatura DevOps.
- Documentación oficial de Docker: https://docs.docker.com/
- Documentación oficial de Git: https://git-scm.com/doc
- Documentación de GitHub: https://docs.github.com/
