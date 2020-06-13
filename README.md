# Getting started

### Installation
1. Clone the repository
git clone https://bildstudio@dev.azure.com/bildstudio/Sandbox/_git/Tetka%20poruducts
2. Switch to the repo folder
cd nestjs
3. Install dependencies
npm install

### Database
API works with MONGODB database. Get mongodb config data from .env file
MONGODB_URL='my-mongodb-url'
DB_TYPE=mongodb
DB_HOST=localhost
DB_DATABASE=test
DB_USERNAME='my-mongodb-username'
DB_PASSWORD='my-mongodb-password'
DB_PORT=27017

### NPM scripts
npm run start:dev - Start application
npm start -- watch - Start application in watch mode

### Start application

Test api with http://localhost:3000/api/ in your favourite browser

### Swagger API docs
This example repo uses the NestJS swagger module for API documentation. NestJS Swagger - www.swagger.io

### Authentication
This applications uses JSON Web Token (JWT) to handle authentication. The token is passed with each request using the Authorization header with Token scheme. Enter your login/signup data into /auth/signin or /auth/signup body and paste the token into Authorization heather