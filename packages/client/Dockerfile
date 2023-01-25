FROM node:18-alpine3.15

COPY . /client
WORKDIR /client
RUN npm install --legacy-peer-deps
CMD ["yarn","dev"]
