import { sql } from '@vercel/postgres';

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
};

export async function createTodosTable() {
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
    throw error;
  }
}

export async function getTodos() {
  try {
    const { rows } = await sql<Todo>`
      SELECT id, text, completed, created_at as "createdAt" 
      FROM todos 
      ORDER BY created_at DESC
    `;
    return rows;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}

export async function addTodo(text: string) {
  try {
    const { rows } = await sql<Todo>`
      INSERT INTO todos (text) 
      VALUES (${text}) 
      RETURNING id, text, completed, created_at as "createdAt"
    `;
    return rows[0];
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
}

export async function updateTodoStatus(id: string, completed: boolean) {
  try {
    const { rows } = await sql<Todo>`
      UPDATE todos 
      SET completed = ${completed} 
      WHERE id = ${id} 
      RETURNING id, text, completed, created_at as "createdAt"
    `;
    return rows[0];
  } catch (error) {
    console.error('Error updating todo status:', error);
    throw error;
  }
}

export async function deleteTodo(id: string) {
  try {
    await sql`
      DELETE FROM todos 
      WHERE id = ${id}
    `;
    return { id };
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
}
