# TODO

## Project Overview

A simple Todo app to keep your todos.

## Features

### 1. User Authentication
   - Users can create accounts and log in securely using JWT (JSON Web Tokens) for authentication.

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

## Demo Pics

![Blank to-do](https://github.com/sn0wFlake420/Todo/assets/90910054/057903ed-1032-483e-9c7c-991281cea4df)
![Completed](https://github.com/sn0wFlake420/Todo/assets/90910054/2ead77a9-2cee-40e5-ae57-69fbc2adcd58)
![Create To-do](https://github.com/sn0wFlake420/Todo/assets/90910054/7f30056b-79b7-4e67-b118-7212e6ed4796)
![Not_Found](https://github.com/sn0wFlake420/Todo/assets/90910054/9f90a8a8-304a-41e5-98cf-499202bb361a)
![Sign-in](https://github.com/sn0wFlake420/Todo/assets/90910054/9c78b28c-8bbf-4efb-a609-e7caefd44c50)
![Sign-up](https://github.com/sn0wFlake420/Todo/assets/90910054/193becd1-4894-4638-96c4-e202829ee1f7)
![Unauthenticated](https://github.com/sn0wFlake420/Todo/assets/90910054/39dec898-fcba-4656-b9cb-5186470520af)
![Update to-do](https://github.com/sn0wFlake420/Todo/assets/90910054/4a37428c-06fe-4e3e-a966-353293a98390)






