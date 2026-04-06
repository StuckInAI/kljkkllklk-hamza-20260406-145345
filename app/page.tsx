'use client';

import { useState, useEffect, useCallback } from 'react';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import TodoFilters from '../components/TodoFilters';
import TodoStats from '../components/TodoStats';

export type Priority = 'low' | 'medium' | 'high';
export type FilterType = 'all' | 'active' | 'completed';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('todos');
    if (stored) {
      try {
        setTodos(JSON.parse(stored));
      } catch {
        setTodos([]);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, mounted]);

  const addTodo = useCallback((text: string, priority: Priority) => {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: new Date().toISOString()
    };
    setTodos(prev => [newTodo, ...prev]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter(t => t.completed).length;
  const activeCount = todos.filter(t => !t.completed).length;

  if (!mounted) return null;

  return (
    <main className="container">
      <header className="header">
        <h1>✅ Todo App</h1>
        <p>Stay organized, stay productive</p>
      </header>

      <div className="card">
        <TodoInput onAdd={addTodo} />
      </div>

      <div className="card">
        <TodoFilters filter={filter} onFilterChange={setFilter} />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
        <TodoStats
          total={todos.length}
          active={activeCount}
          completed={completedCount}
          onClearCompleted={clearCompleted}
        />
      </div>
    </main>
  );
}
