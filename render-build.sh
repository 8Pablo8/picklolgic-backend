#!/usr/bin/env bash
# Salir en caso de error
set -o errexit

# Instalar las dependencias
#npm install
# Ejecutar la construcción (descomenta esta línea si es necesario)
# npm run build

# Verificar si el directorio de la caché de Puppeteer existe antes de copiar los archivos
if [[ -d $PUPPETEER_CACHE_DIR ]]; then 
  echo "...Copiando la caché de Puppeteer desde la caché de compilación" 
  cp -R $XDG_CACHE_HOME/puppeteer/ $PUPPETEER_CACHE_DIR || echo "No existe la caché de Puppeteer, se creará una nueva."
else 
  echo "...Creando el directorio de caché de Puppeteer y almacenando la caché en la caché de compilación"
  mkdir -p $PUPPETEER_CACHE_DIR
  cp -R $PUPPETEER_CACHE_DIR $XDG_CACHE_HOME || echo "No se pudo copiar la caché de Puppeteer."
fi
