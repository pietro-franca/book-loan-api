# Book Loan API

A RESTful API for managing book loans, returns, and user access in a library system.

## Features

- User registration and login with JWT authentication
- Role-based access (admin vs. standard users)
- Book catalog management (admin only)
- Book borrowing and returning (standard users)
- Loan tracking with due dates and late return status

## Tools and packages

- Node.js
- Express.js
- UUID
- bcrypt
- JWT (jsonwebtoken)
- dotenv

## Roles and Permissions

### Standard User

- View available books
- Borrow books
- Return borrowed books
- View own loan history

### Admin

- Add, update, and delete books
- View all users
- Promote users to admin
- Delete users
- View all loans

## Getting Started

1. Clone the repository: 

        git clone https://github.com/your-username/book-loan-api.git

2. Install dependencies:

        npm install

3. Create a `.env` file with:

        JWT_KEY=your_secret_key

4. Start the server:

        npm start
