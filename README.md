# Auth API – Node.js, Express, JWT

A secure authentication API built with Node.js and Express. This project demonstrates user registration, login, password hashing using bcrypt, and protected routes with JSON Web Tokens (JWT). All user data is stored in-memory for simplicity, and sensitive data like the JWT secret is managed via environment variables.

## Features

- User registration with validation
- Password hashing using bcryptjs
- Login with JWT token generation
- Protected route to get current user
- Middleware for token authentication
- Environment-based config with dotenv

## Tech Stack

- Node.js
- Express.js
- bcryptjs
- jsonwebtoken
- express-validator
- dotenv

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/auth-api.git
cd auth-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables
Create a .env file in the root folder and add:
```bash
JWT_SECRET=your_super_secret_jwt_key
```

### 4. Start the server
```bash
node index.js
```
Server will run at: http://localhost:3002

## Postman Collection
A Postman collection file is included to make testing easier.
1. Open Postman
2. Click Import
3. Select the file: ```auth-api.postman_collection.json```
4. Use the predefined requests to test the API


## API Endpoints
POST /api/auth/register<br>
Register a new user.<br>

Request Body
```json
{
  "username": "john",
  "password": "secret123"
}
```
---
POST /api/auth/login <br>
Login to receive a JWT token.<br>

Request Body
```json
{
  "username": "john",
  "password": "secret123"
}
```

Response
```json
{
  "token": "your.jwt.token"
}
```
---
GET /api/auth/me<br>
Get the current logged-in user.<br>

Headers
```http
Authorization: Bearer <your_token>
```

Response
```json
{
  "user": {
    "id": 1,
    "username": "john"
  }
}
```
---
## Input Validation
- username: required, string
- password: required, min length 6
- Token must be passed in the Authorization header