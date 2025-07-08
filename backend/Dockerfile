# Stage 1: Build the app
FROM node:20 as builder
WORKDIR /app

COPY package*.json ./
COPY .env.production ./              
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Run the app
FROM node:20
WORKDIR /app

COPY --from=builder /app /app
RUN npm install --omit=dev

ENV NODE_ENV=production             

EXPOSE 3000
CMD ["node", "dist/main"]
