# Usamos una imagen de Node muy ligera (basada en Debian Slim)
FROM node:20-slim

# Seteamos variables de entorno para evitar interacciones durante la instalación
ENV DEBIAN_FRONTEND=noninteractive
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

# Instalamos las dependencias mínimas del sistema para que Chromium pueda arrancar
# 'npx playwright install-deps chromium' se encarga de instalar los .so necesarios (libgbm, libnss3, etc)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    && npx playwright install-deps chromium \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Descargamos el binario de Chromium (solo este, omitiendo Firefox y WebKit)
RUN npx playwright install chromium

WORKDIR /app

# Copiamos solo archivos de dependencias para aprovechar la caché de capas de Docker
COPY package*.json ./

# Instalamos las librerías de Node
RUN npm install

# Por defecto lanzamos los tests
CMD ["npx", "playwright", "test"]

