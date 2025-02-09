FROM node:20.11.1 AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
COPY sales-service/package*.json sales-service/
RUN npm ci

FROM base AS runtime
COPY --from=deps /app/node_modules ./node_modules
COPY . .
WORKDIR /app/sales-service
CMD ["npm", "start"]
