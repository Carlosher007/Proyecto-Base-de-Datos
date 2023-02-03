FROM node:18-alpine3.15


WORKDIR /client
COPY ./packages/client .


RUN apk add --update redis
RUN npm install --legacy-peer-deps

CMD ["yarn", "dev"]