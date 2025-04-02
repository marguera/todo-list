'use client';

import { useEffect, useState } from 'react';
import { Todo } from '@/lib/db';
import TodoItem from './TodoItem';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch('/api/todos');
        
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        setError('Failed to load todos. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchTodos();
  }, []);

  const toggleTodoStatus = async (id: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const updatedTodo = await response.json();
      
      setTodos(todos.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="mt-6 text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="mt-2 text-indigo-500">Loading your todos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-50 text-red-500 rounded-lg border border-red-200 text-center">
        <p className="font-medium">{error}</p>
        <p className="text-sm mt-1">Try refreshing the page.</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="mt-6 p-8 text-center">
        <div className="text-5xl mb-3">📝</div>
        <p className="text-gray-500">Your list is empty. Add your first task above!</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-sm uppercase tracking-wide text-gray-500 font-semibold mb-3">
        Your Tasks ({todos.filter(t => !t.completed).length} remaining)
      </h2>
      <ul className="space-y-1">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodoStatus}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}
