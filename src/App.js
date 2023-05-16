import { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  const handleAddTodo = () => {
    if (!newTodo) return;
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo('');
  }

  const handleToggleCompleted = (i) => {
    const newTodos = [...todos];
    newTodos[i].completed = !newTodos[i].completed;
    setTodos(newTodos);
  }

  const filteredTodos = showCompleted ? todos : todos.filter((todo) => !todo.completed);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {filteredTodos.map((todo, i) => (
          <li key={i}>
            <input type="checkbox" checked={todo.completed} onChange={() => handleToggleCompleted(i)} />
            {todo.text}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={showCompleted} onChange={() => setShowCompleted(!showCompleted)} />
          Show completed tasks
        </label>
      </div>
    </div>
  );
}
export default TodoList;