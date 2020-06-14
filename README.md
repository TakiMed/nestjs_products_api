# Products API
### Tools used for project
This API uses [nestJS](https://docs.nestjs.com/) framework version 7.1.0 and is integrated with mongoDB database.

### Run app locally
1. Clone the repository
```
git clone https://bildstudio@dev.azure.com/bildstudio/Sandbox/_git/Tetka%20poruducts
```
2. Switch to the repo folder
```
cd Tetka%20products
```
3. Install dependencies
```
npm install
```
4. To start local server:
```
npm run start:dev
```
5. To start in watch mode:
```
npm start -- watch
```

### Database
API works with MONGODB database. Get mongodb config data from .env file
```
MONGODB_URL='my-mongodb-url'
```

### Start application
Test api with http://localhost:3000/api in your favourite browser

### Swagger API docs
This example repo uses the NestJS swagger module for API documentation. NestJS Swagger - www.swagger.io

### Authentication
This applications uses JSON Web Token (JWT) to handle authentication. The token is passed with each request using the Authorization header with Token scheme. Enter your login/signup data into `/auth/signin` or `/auth/signup` body and paste the token into Authorization heather
