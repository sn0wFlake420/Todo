# TODO

## Project Overview

A simple Todo app to keep your todos.

## Features

### 1. User Authentication
   - Users can create accounts and log in securely using JWT (JSON Web Tokens) for authentication.
   - Passwords are securely hashed using bcrypt for enhanced security.

### 2. Todo
   - Users can create, view, edit and delete todos.
   - Users can also view completed todos until they want to.

## Technologies Used

- **Frontend:**
  - React: JavaScript library for building user interfaces.
  - Tailwind CSS: A utility-first CSS framework for styling.

- **Backend:**
  - Node.js: JavaScript runtime for server-side development.
  - Express.js: Web application framework for Node.js.
  - Postgres: A SQL database for storing user details and todo.
  - Prisma: ORM for interacting with the database.
 
### Installation

Follow these steps to set up the WordWiz project locally:

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/sn0wFlake420/Todo.git
   ```

2. Navigate to the project directory:

   ```
   cd Todo
   ```

3. Install server dependencies:

   ```
   cd server
   npm i
   npx prisma migrate dev
   tsc -b
   node dist/index.js
   ```

4. Install client dependencies:

   ```
   cd ../client
   npm i
   ```

5. Create a `.env` file in the `server` directory and configure your environment variables:

   ```
   DATABASE_URL=your-postgres-connection-string
   ```

6. Start the server:

   ```
   cd ../server
   node index.js
   ```

7. Start the client:

   ```
   cd ../client
   npm run dev
   ```

Todo should now be running locally. You can access it by opening your browser and navigating to `http://localhost:3000`.

## Usage

- Register for an account or log in.
- Create a todo.
- Start finishing tasks and marking the todos as done.
- Edit the todos if u want.
- Delete the todos when completed.


