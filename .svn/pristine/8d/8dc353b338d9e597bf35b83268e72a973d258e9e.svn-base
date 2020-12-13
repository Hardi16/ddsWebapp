FROM node:10.16.3
EXPOSE 3000
WORKDIR /dashboardandds
COPY . ./
RUN npm install --silent
RUN npm install react-scripts@3.4.0
CMD ["npm", "start"]