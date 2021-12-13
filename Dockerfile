FROM node:14-alpine as builder
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN npm i -g yarn
RUN yarn install

COPY . .

RUN npm run build

FROM nginx:latest

COPY /etc/nginx/sites-available/cowket.malrang.dev /etc/nginx/sites-available/default
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 13001
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]