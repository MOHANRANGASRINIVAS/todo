import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;

    if (isEditing) {
      setTodoList(todoList.map(todo => (
        todo.id === editId ? { ...todo, text: newTodo } : todo
      )));
      setIsEditing(false);
      setEditId(null);
    } else {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
        completed: false
      };
      setTodoList([...todoList, newTodoItem]);
    }

    setNewTodo('');
  };

  const handleDelete = (id) => {
    setTodoList(todoList.filter(todo => todo.id !== id));
  };

  const handleEdit = (id) => {
    const todo = todoList.find(todo => todo.id === id);
    setNewTodo(todo.text);
    setIsEditing(true);
    setEditId(id);
  };

  const handleToggleComplete = (id) => {
    setTodoList(todoList.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4"> Todo App (React)</h2>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={handleAddTodo}
        >
          {isEditing ? 'Update' : 'Add'}
        </button>
      </div>

      <ul className="list-group">
        {todoList.map(todo => (
          <li
            key={todo.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'completed' : ''}`}
          >
            <span
              onClick={() => handleToggleComplete(todo.id)}
              style={{ cursor: 'pointer', flex: 1 }}
              className={todo.completed ? 'text-decoration-line-through text-muted' : ''}
            >
              {todo.text}
            </span>

            <div className="btn-group">
              <button
                className="btn btn-sm btn-warning"
                onClick={() => handleEdit(todo.id)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
