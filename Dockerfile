# Usa una versión estable de Node (puedes cambiar a la que necesites)
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia package.json y package-lock.json primero (para cachear deps)
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo el proyecto al contenedor
COPY . .

# Expone el puerto donde Next.js corre por defecto
EXPOSE 3000

# Comando para correr tu app en modo producción
CMD ["npm", "run", "dev"] 
# o "start" si ya construiste con "build"

