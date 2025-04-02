'use client';

import { useState } from 'react';

interface AddTodoProps {
  onAddTodo?: () => void;
}

export default function AddTodo({ onAddTodo }: AddTodoProps) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text.trim() }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      
      setText('');
      
      // Call the onAddTodo callback to refresh the list
      if (onAddTodo) {
        onAddTodo();
      }
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r transition-colors duration-200 disabled:bg-blue-300"
          disabled={loading || !text.trim()}
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </div>
    </form>
  );
}
