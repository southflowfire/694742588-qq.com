FROM registry.cn-shanghai.aliyuncs.com/attonex/node:alpine AS build
WORKDIR /app
COPY . .
RUN npm install

ENTRYPOINT [ "npm", "run", "start" ]
