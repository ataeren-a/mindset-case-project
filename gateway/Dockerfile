FROM node:20.11.1 AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
COPY gateway/package*.json gateway/
RUN npm ci

FROM base AS runtime
COPY --from=deps /app/node_modules ./node_modules
COPY . .
WORKDIR /app/gateway
CMD ["npm", "start"]