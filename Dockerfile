FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY client/package.json client/
COPY server/package.json server/
RUN npm install

FROM deps AS client-build
COPY client client
RUN npm run build -w client

FROM deps AS server-build
COPY server server
RUN npm run build -w server
RUN npm prune --omit=dev -w server

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=server-build /app/server/dist ./dist
COPY --from=server-build /app/server/node_modules ./node_modules
COPY server/package.json ./
COPY --from=client-build /app/client/dist ./client/dist
EXPOSE 4000
CMD ["node", "dist/index.js"]
