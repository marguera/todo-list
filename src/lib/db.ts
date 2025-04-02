import { sql } from '@vercel/postgres';

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
};

// In-memory todos for local development when no DB connection is available
let localTodos: Todo[] = [
  {
    id: '1',
    text: 'Learn Next.js',
    completed: true,
    createdAt: new Date()
  },
  {
    id: '2',
    text: 'Build a todo app',
    completed: false,
    createdAt: new Date()
  }
];

// Check if running in development environment
const isDevelopment = process.env.NODE_ENV === 'development';

export async function createTodosTable() {
  if (isDevelopment) {
    console.log('Development mode: skipping table creation');
    return;
  }
  
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        text VARCHAR(255) NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Todos table created successfully');
  } catch (error) {
    console.error('Error creating todos table:', error);
    // Don't throw error, just log it - this allows the app to run without DB
  }
}

export async function getTodos() {
  if (isDevelopment) {
    console.log('Development mode: using local data');
    return localTodos;
  }
  
  try {
    const { rows } = await sql<Todo>`
      SELECT id, text, completed, created_at as "createdAt" 
      FROM todos 
      ORDER BY created_at DESC
    `;
    return rows;
  } catch (error) {
    console.error('Error fetching todos, using local data:', error);
    return localTodos;
  }
}

export async function addTodo(text: string) {
  if (isDevelopment) {
    console.log('Development mode: adding todo to local data');
    const newTodo = {
      id: String(localTodos.length + 1),
      text,
      completed: false,
      createdAt: new Date()
    };
    localTodos = [newTodo, ...localTodos];
    return newTodo;
  }
  
  try {
    const { rows } = await sql<Todo>`
      INSERT INTO todos (text) 
      VALUES (${text}) 
      RETURNING id, text, completed, created_at as "createdAt"
    `;
    return rows[0];
  } catch (error) {
    console.error('Error adding todo, using local data:', error);
    const newTodo = {
      id: String(localTodos.length + 1),
      text,
      completed: false,
      createdAt: new Date()
    };
    localTodos = [newTodo, ...localTodos];
    return newTodo;
  }
}

export async function updateTodoStatus(id: string, completed: boolean) {
  if (isDevelopment) {
    console.log('Development mode: updating todo in local data');
    const todoIndex = localTodos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      const updatedTodo = { ...localTodos[todoIndex], completed };
      localTodos[todoIndex] = updatedTodo;
      return updatedTodo;
    }
    return null;
  }
  
  try {
    const { rows } = await sql<Todo>`
      UPDATE todos 
      SET completed = ${completed} 
      WHERE id = ${id} 
      RETURNING id, text, completed, created_at as "createdAt"
    `;
    return rows[0];
  } catch (error) {
    console.error('Error updating todo status, using local data:', error);
    const todoIndex = localTodos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      const updatedTodo = { ...localTodos[todoIndex], completed };
      localTodos[todoIndex] = updatedTodo;
      return updatedTodo;
    }
    return null;
  }
}

export async function deleteTodo(id: string) {
  if (isDevelopment) {
    console.log('Development mode: deleting todo from local data');
    localTodos = localTodos.filter(todo => todo.id !== id);
    return { id };
  }
  
  try {
    await sql`
      DELETE FROM todos 
      WHERE id = ${id}
    `;
    return { id };
  } catch (error) {
    console.error('Error deleting todo, using local data:', error);
    localTodos = localTodos.filter(todo => todo.id !== id);
    return { id };
  }
}
