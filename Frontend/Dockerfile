FROM node:20-alpine


WORKDIR /app


COPY package*.json ./


RUN npm install --legacy-peer-deps


COPY . .


RUN npm run build


RUN npm install -g serve


EXPOSE 3000


CMD ["serve", "-s", "dist", "-l", "3000"]
