# Dockerfile - Compilación de instalador Windows 32 bits para Electron
FROM electronuserland/builder:wine

# Configura el entorno de trabajo
WORKDIR /project

# Copia los archivos del proyecto
COPY . .

# Instala dependencias
RUN npm install

# Construye para Windows 32 bits
CMD ["npm", "run", "build:win"]
