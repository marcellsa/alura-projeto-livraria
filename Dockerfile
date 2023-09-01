# Use uma imagem base do Node.js
FROM node:18

# Configuração inicial
WORKDIR /app

# Copie os arquivos de configuração e código da API
COPY package*.json ./
RUN npm install
COPY . .

# Comando para iniciar a API (ajuste conforme sua configuração)
CMD ["npm", "dev"]
