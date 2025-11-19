'use client'
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all todos
  useEffect(() => {
    async function fetchTodos() {
      const res = await fetch("/api/todos");
      const { data } = await res.json();
      setTodos(data);
    }
    fetchTodos();
  }, []);

  // Create
  async function handleCreate(e) {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setLoading(true);
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodo })
    });
    const { data } = await res.json();
    setTodos(prev => [...prev, data]); // Add new todo
    setNewTodo("");
    setLoading(false);
  }

  // Delete
  async function handleDelete(id) {
    setLoading(true);
    await fetch(`/api/todos?id=${id}`, { method: "DELETE" });
    setTodos(prev => prev.filter(todo => todo.id !== id));
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-blue-100 dark:from-black dark:to-zinc-900 py-14 px-3 flex flex-col items-center">
      <header className="w-full flex items-center justify-between px-8 py-6 bg-white dark:bg-zinc-950 rounded-xl shadow mb-8">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-zinc-100">To-Do Dashboard</h1>
        {/* You could add user info, logout, etc. here */}
      </header>

      {/* Create */}
      <form
        onSubmit={handleCreate}
        className="flex w-full max-w-md gap-2 mb-8"
      >
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-full border focus:outline-none"
          placeholder="Add new task..."
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-500 transition"
        >
          Add
        </button>
      </form>

      {/* List */}
      <div className="w-full max-w-2xl mt-4">
        <ul className="divide-y divide-zinc-200 dark:divide-zinc-800 rounded-xl bg-white dark:bg-zinc-950 shadow">
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center justify-between px-4 py-3">
              <span className="text-lg">{todo.text}</span>
              <button
                onClick={() => handleDelete(todo.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400"
                disabled={loading}
              >
                Delete
              </button>
            </li>
          ))}
          {todos.length === 0 && (
            <li className="px-4 py-3 text-zinc-400 text-center">No tasks yet. Add one above!</li>
          )}
        </ul>
      </div>
    </div>
  );
}
