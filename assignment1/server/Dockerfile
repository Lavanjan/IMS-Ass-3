FROM node

WORKDIR /app/server

COPY package.json .

RUN npm install --force

COPY . .

EXPOSE 9000

CMD ["npm", "start"]