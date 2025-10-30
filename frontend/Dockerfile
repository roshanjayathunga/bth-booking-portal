# Build
FROM node:20 AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Serve static files
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
RUN yarn global add serve
EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "80"]
