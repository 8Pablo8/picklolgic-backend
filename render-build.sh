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
  cp -R $XDG_CACHE_HOME/puppeteer/ $PUPPETEER_CACHE_DIR
else 
  echo "...Almacenando la caché de Puppeteer en la caché de compilación" 
  cp -R $PUPPETEER_CACHE_DIR $XDG_CACHE_HOME
fi
