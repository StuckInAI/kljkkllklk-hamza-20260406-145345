'use client';

import type { Todo } from '../app/page';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="icon">📝</div>
        <p>No todos here. Add one above!</p>
      </div>
    );
  }

  return (
    <ul className="todo-list" style={{ listStyle: 'none' }}>
      {todos.map(todo => (
        <li key={todo.id}>
          <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
