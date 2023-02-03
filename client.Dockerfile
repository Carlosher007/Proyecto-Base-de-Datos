FROM node:18-alpine3.15


WORKDIR /client
COPY ./packages/client .

RUN npm install --legacy-peer-deps

CMD ["yarn", "start"]