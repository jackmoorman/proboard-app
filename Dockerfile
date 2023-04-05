FROM node:18.15

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate
RUN npx prisma generate
# RUN npm run build

EXPOSE 3000

CMD ["node", "server.js"]