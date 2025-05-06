# 🛡️ NestJS Start

A boilerplate for building secure and scalable applications with NestJS.

## 🚀 Features

- **Authentication**: JWT-based authentication with refresh tokens.
- **Authorization**: Role-based access control (RBAC) with permissions.
- **User Management**: User registration, login, and profile management.
- **Role Management**: Create, update, delete roles and assign permissions.
- **Permission Management**: Create, update, delete permissions and assign them to roles.
- **Validation**: Schema validation with Zod.
- **ORM**: MikroORM with SQLite.
- **Mailer**: Send emails with Nodemailer.

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
# Run migrations
npx mikro-orm migration:create

# Update the database
npx mikro-orm migration:up

# Start the application
npm run start:dev
```

## 📜 API Documentation

### 🔐 Auth

| Method | URL            | Description                        | Protection      |
|--------|----------------|------------------------------------|-----------------|
| POST   | /auth/register | Register a new user                | ❌             |
| POST   | /auth/login    | Login, returns a JWT               | ❌             |
| GET    | /auth/me       | Profile of the connected user      | ✅ AuthGuard   |
| POST   | /auth/refresh  | Refresh JWT token                  | ✅ AuthGuard   |
| POST   | /auth/logout   | Logout, invalidates refresh token  | ✅ AuthGuard   |

### 👤 Users

| Method | URL                        | Description                | Role  | Permission  |
|--------|----------------------------|----------------------------|-------|-------------|
| GET    | /users                     | Get all users              | Admin | users:list   |
| GET    | /users/:id                 | Get a user by ID           | Admin | users:view   |
| POST   | /users                     | Create a new user          | Admin | users:create |
| PATCH  | /users/:id                 | Update a user by ID        | Admin | users:update |
| DELETE | /users/:id                 | Delete a user by ID        | Admin | users:delete |
| GET    | /users/username/:username | Get a user by username     | Admin | users:view   |
| GET    | /users/email/:email       | Get a user by email        | Admin | users:view   |

### 📜 Roles

| Method | URL                                 | Description                      | Role  | Permission  |
|--------|-------------------------------------|----------------------------------|-------|-------------|
| GET    | /roles                              | Get all roles                    | Admin | roles:list   |
| GET    | /roles/:id                          | Get a role by ID                 | Admin | roles:view   |
| POST   | /roles                              | Create a new role                | Admin | roles:create |
| PATCH  | /roles/:id                          | Update a role by ID              | Admin | roles:update |
| DELETE | /roles/:id                          | Delete a role by ID              | Admin | roles:delete |
| POST   | /roles/users/:userId/roles/:roleId  | Assign a role to a user          | Admin | roles:assign |
| DELETE | /roles/users/:userId/roles/:roleId  | Remove a role from a user        | Admin | roles:remove |
| POST   | /roles/:id/permissions              | Assign a permission to a role    | Admin | roles:assign |
| DELETE | /roles/:id/permissions/:permissionId| Remove a permission from a role  | Admin | roles:remove |
| GET    | /roles/:id/permissions              | Get all permissions of a role    | Admin | roles:view   |

## 🔑 Permissions

| Method | URL                | Description                 | Role  | Permission         |
|--------|--------------------|-----------------------------|-------|---------------------|
| GET    | /permissions       | Get all permissions         | Admin | permissions:list     |
| GET    | /permissions/:id   | Get a permission by ID      | Admin | permissions:view     |
| POST   | /permissions       | Create a new permission     | Admin | permissions:create   |
| PATCH  | /permissions/:id   | Update a permission by ID   | Admin | permissions:update   |
| DELETE | /permissions/:id   | Delete a permission by ID   | Admin | permissions:delete   |

