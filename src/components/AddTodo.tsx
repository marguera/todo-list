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
    <form onSubmit={handleSubmit} className="w-full">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}
      <div className="relative flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full p-3 pl-4 pr-24 rounded-lg border-2 border-indigo-100 focus:border-indigo-300 focus:outline-none text-gray-700 shadow-sm"
          disabled={loading}
        />
        <button
          type="submit"
          className="absolute right-2 bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-300 text-sm font-medium"
          disabled={loading || !text.trim()}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding
            </span>
          ) : (
            'Add Task'
          )}
        </button>
      </div>
    </form>
  );
}
