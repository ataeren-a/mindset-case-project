FROM node:20.11.1 AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
COPY user-service/package*.json user-service/
RUN npm ci

FROM base AS runtime
COPY --from=deps /app/node_modules ./node_modules
COPY . .
WORKDIR /app/user-service
CMD ["npm", "start"]
