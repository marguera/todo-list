# Todo List App

A simple todo list application built with Next.js, Tailwind CSS, and Vercel Postgres.

## Features

- Create, read, update, and delete todos
- Mark todos as completed
- Responsive design with Tailwind CSS
- Server-side rendering with Next.js
- PostgreSQL database with Vercel Postgres

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)

## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- npm or yarn
- A Vercel account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/todo-list.git
cd todo-list
```

2. Install the dependencies:

```bash 
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with your Vercel Postgres credentials:

```env
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment to Vercel

1. Push your code to a GitHub repository.

2. Create a new project on [Vercel](https://vercel.com/new).

3. Link your GitHub repository.

4. Configure the environment variables in the Vercel dashboard, adding the same PostgreSQL credentials as in your `.env.local` file.

5. Deploy the application.

6. Create a Vercel Postgres database from the Vercel dashboard:
   - Go to the "Storage" tab
   - Select "Create a Postgres Database"
   - Follow the instructions to provision your database

7. Vercel will automatically add the environment variables to your project.

## Project Structure

```
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API Routes
│   │   │   └── todos/    # Todo API endpoints
│   │   ├── page.tsx      # Home page
│   │   └── layout.tsx    # Root layout
│   ├── components/       # React components
│   │   ├── AddTodo.tsx   # Add todo form
│   │   ├── TodoItem.tsx  # Todo item component
│   │   └── TodoList.tsx  # Todo list component
│   └── lib/              # Utility functions and database
│       └── db.ts         # Database queries
├── public/               # Static assets
├── .env.local            # Environment variables (local)
└── package.json          # Project dependencies
```

## License

This project is licensed under the MIT License.