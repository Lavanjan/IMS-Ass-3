FROM node

WORKDIR /app

COPY package.json .

RUN npm install --force
# RUN npm run build
# RUN npm i -g pm2 --legacy-peer-deps

COPY . .

EXPOSE 80

CMD ["npm", "start"]