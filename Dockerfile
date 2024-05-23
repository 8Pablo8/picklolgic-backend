# Utiliza una imagen base de Node.js
FROM node:latest

# Instala las dependencias del sistema necesarias para Puppeteer y Chrome
RUN apt-get update && \
    apt-get install -y wget gnupg ca-certificates procps && \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update && \
    apt-get install -y google-chrome-stable && \
    rm -rf /var/lib/apt/lists/*

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de configuración
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
