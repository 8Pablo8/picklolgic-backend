# Usa la imagen oficial de Node como base
FROM node:latest

# Instala las dependencias necesarias para Puppeteer y Chrome
RUN apt-get update \
    && apt-get install -y wget gnupg ca-certificates procps \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos de configuración de tu aplicación
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expón el puerto en el que tu aplicación se ejecutará
EXPOSE 3001

# Comando para ejecutar tu aplicación cuando se inicie el contenedor
CMD ["npm", "start"]
