# Stage 1: Build the app
FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare npm@latest --activate

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

COPY . .
RUN npm run build

# Clean cache
RUN rm -rf .next/cache

# Stage 2: Run the app
FROM node:20-alpine AS runner
WORKDIR /app

RUN corepack enable && corepack prepare npm@latest --activate

# Only copy necessary files for standalone
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]