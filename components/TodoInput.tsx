'use client';

import { useState } from 'react';
import type { Priority } from '../app/page';

interface TodoInputProps {
  onAdd: (text: string, priority: Priority) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority);
    setText('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-row">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={text}
          onChange={e => setText(e.target.value)}
          maxLength={200}
          aria-label="New todo"
        />
        <select
          className="priority-select"
          value={priority}
          onChange={e => setPriority(e.target.value as Priority)}
          aria-label="Priority"
        >
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </div>
    </form>
  );
}
