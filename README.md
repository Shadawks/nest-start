# 🛡️ NestJS Start

A boilerplate for building secure and scalable applications with NestJS.

## 🚀 Features

- **Authentication**: JWT-based authentication.
- **Validation**: Schema validation with Zod.
- **ORM**: MikroORM with SQLite.

## ⚙️ Configuration

Create a `.env` file in the root directory and set the required variables.
  - `JWT_SECRET=your_jwt_secret`
  - `JWT_EXPIRES_IN=1d`

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Shadawks/nest-start
cd nest-start

# Install dependencies
npm install
```

## 🏃‍♂️ Running the Application

```bash
# Start the application
npm run start:dev
```

## 📜 API Documentation

### 🔐 Auth

| Method | URL            | Description                        | Protection     |
|--------|----------------|------------------------------------|----------------|
| POST   | /auth/register | Register a new user                | ❌             |
| POST   | /auth/login    | Login, returns a JWT               | ❌             |
| GET    | /auth/me       | Profile of the connected user      | ✅ AuthGuard   |

### 👤 Users

| Method | URL                     | Description                           | Protection     |
|--------|-------------------------|---------------------------------------|----------------|
| GET    | /users                  | List all users with pagination        | ✅ AdminGuard  |
| GET    | /users/:id              | Get user details by ID                | ✅ AdminGuard  |
| GET    | /users/email/:email     | Find user by email address            | ✅ AdminGuard  |
| GET    | /users/username/:username | Find user by username               | ✅ AdminGuard  |
| POST   | /users                  | Create a new user                     | ✅ AdminGuard  |
| PATCH  | /users/:id              | Update user information               | ✅ AdminGuard  |
| DELETE | /users/:id              | Delete user account                   | ✅ AdminGuard  |
