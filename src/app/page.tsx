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
    <main className="flex min-h-screen flex-col items-center justify-start p-4 md:p-8 bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-indigo-700">
          ✓ My Todo List
        </h1>
        <div className="bg-white shadow-2xl rounded-xl p-6 border border-indigo-100">
          <AddTodo onAddTodo={handleAddTodo} />
          <TodoList key={refreshKey} />
        </div>
        <p className="text-center text-xs mt-6 text-indigo-500">
          Built with Next.js and Tailwind CSS
        </p>
      </div>
    </main>
  )
}
