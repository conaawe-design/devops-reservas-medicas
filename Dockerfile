# Imagen exigida por el enunciado de la Unidad 1.
FROM nginx:alpine

# Archivos públicos del sitio estático. No se incluyen credenciales ni datos reales.
COPY src/ /usr/share/nginx/html/

EXPOSE 80
