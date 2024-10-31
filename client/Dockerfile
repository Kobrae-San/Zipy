FROM node:22-alpine3.19

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 4124

ENV VITE_HOST=0.0.0.0

CMD [ "npm", "run", "dev" ]