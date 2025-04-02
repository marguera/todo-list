'use client';

import { useState, useCallback } from 'react';
import TodoList from '@/components/TodoList';
import AddTodo from '@/components/AddTodo';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);
  
  const handleAddTodo = useCallback(() => {
    // Increment the key to force a refresh of the TodoList component
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">Todo List App</h1>
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 w-full max-w-md mx-auto">
          <AddTodo onAddTodo={handleAddTodo} />
          <TodoList key={refreshKey} />
        </div>
      </div>
    </main>
  )
}
