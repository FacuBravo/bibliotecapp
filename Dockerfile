FROM node:18-bullseye

# 🔴 CLAVE: habilitar 32 bits
RUN dpkg --add-architecture i386

RUN apt-get update && apt-get install -y \
    wine \
    wine32 \
    wine64 \
    xvfb \
    libgtk-3-0 \
    libx11-xcb1 \
    libxcb-dri3-0 \
    libxtst6 \
    libnss3 \
    libxss1 \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libgbm1 \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# 🔴 CLAVE: forzar wine 32 bits
ENV WINEARCH=win32
ENV WINEPREFIX=/root/.wine32

WORKDIR /app

COPY package*.json ./

CMD ["sh", "-c", "npm install && npm run build:win"]