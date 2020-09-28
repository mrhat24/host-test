FROM node:14

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["node", "dist/index.js"]
