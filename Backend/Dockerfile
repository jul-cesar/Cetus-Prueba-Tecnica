FROM node:20-alpine


WORKDIR /app


COPY package*.json ./


RUN npm install -g pnpm


RUN pnpm install --no-frozen-lockfile


COPY . .


RUN mkdir -p src/generated/prisma


RUN pnpm prisma generate


RUN pnpm run build

RUN if [ ! -d "/app/dist/src/generated/prisma" ]; then \
    mkdir -p /app/dist/src/generated && \
    ln -s /app/src/generated/prisma /app/dist/src/generated/prisma; \
    fi


EXPOSE 3001


CMD ["node", "dist/api/index.js"]
