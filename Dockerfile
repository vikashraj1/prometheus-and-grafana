FROM node:22-alpine

USER node
WORKDIR /app

COPY --chown=node:node . .

RUN npm install
RUN npm ci --only=production
RUN npm audit fix

EXPOSE 3000

HEALTHCHECK CMD wget -q -O /dev/null http://localhost || exit 1

CMD ["node", "server.js"]