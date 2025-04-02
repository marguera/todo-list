'use client';

import { Todo } from '@/lib/db';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const handleToggle = () => {
    onToggle(todo.id, !todo.completed);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <li className="flex items-center justify-between p-4 mb-3 bg-white rounded-lg shadow-md border-l-4 border-indigo-400 transition-all hover:shadow-lg group">
      <div className="flex items-center flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="h-5 w-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500 cursor-pointer"
        />
        <span className={`ml-3 text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {todo.text}
        </span>
      </div>
      <div className="flex items-center">
        <span className="text-xs text-gray-400 mr-3 opacity-0 group-hover:opacity-100 transition-opacity">
          {new Date(todo.createdAt).toLocaleDateString()}
        </span>
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-500 focus:outline-none transition-colors duration-200"
          aria-label="Delete Todo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </li>
  );
}
