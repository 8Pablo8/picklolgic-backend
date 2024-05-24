# Utiliza una imagen base de Node.js
FROM node:latest

# Instala las dependencias del sistema necesarias para Puppeteer y Chrome
RUN apt-get update; apt-get clean

# Install wget.
RUN apt-get install -y wget

RUN apt-get install -y gnupg

# Set the Chrome repo.
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list

# Install Chrome.
RUN apt-get update && apt-get -y install google-chrome-stable

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de configuración
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el script de compilación
COPY render-build.sh /usr/src/app/render-build.sh

# Da permisos de ejecución al script de compilación
RUN chmod +x /usr/src/app/render-build.sh

# Ejecuta el script de compilación
RUN /usr/src/app/render-build.sh

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["node", "server.js"]
