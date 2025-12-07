FROM node:18-alpine

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation
RUN npm install

# Copie du reste du code
COPY . .

# Exposition du port
EXPOSE 3002

# Démarrage
CMD ["npm", "start"]