FROM node:16 as builder
WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

FROM nginx:latest

COPY /etc/nginx/sites-available/cowket.malrang.dev /etc/nginx/sites-available/default
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 13001
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]