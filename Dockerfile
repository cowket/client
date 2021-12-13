FROM node:16 as builder
WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

FROM nginx:latest

COPY --from=builder /app/default /etc/nginx/sites-available/
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 13001
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]