FROM node:15.5.0

WORKDIR /app/client

COPY package.json .

RUN npm install --force

COPY . .

EXPOSE 9001

CMD ["npm", "start"]