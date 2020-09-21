FROM node:14

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

EXPOSE 3000

RUN npm run swagger:gen

RUN npm run build

CMD ["node", "dist/src/index.js"]
