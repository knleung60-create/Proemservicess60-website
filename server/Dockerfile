FROM node:22-alpine

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev
COPY enquiry-server.js ./

EXPOSE 8787
CMD ["npm", "start"]
