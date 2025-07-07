# Stage 1: Build the app
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run the app
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app /app
RUN npm install --omit=dev
EXPOSE 3000
CMD ["node", "dist/main"]
