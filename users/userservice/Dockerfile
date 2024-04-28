# Usa una imagen oficial de Node.js como imagen base
FROM node:20

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/userservice

# Copia package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install --ignore-scripts

# Copia el código fuente de la aplicación al directorio de trabajo
COPY . .

# Cambia a un usuario no privilegiado
RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot
USER nonroot

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 8001

# Define el comando para ejecutar la aplicación
CMD ["node", "user-service.js"]
