import React, { useState } from 'react';


const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  // Add new todo button func
  const handleAddTodo = () => {
    if (!newTodo) return;
    setTodos([...todos,{id: new Date().getTime(), text: newTodo, checked: false}]);
    setNewTodo('');
  }

  //Filter the list 
  const onCheckedChanged = (id, checked) => {
    setTodos((todos) =>
      todos.map((t) => (t.id === id ? { ...t, checked } : t))
    );
  };  
 
  //Show or hide completed list Button 
  const btnShow = () => {
    setShowCompleted(false);
  };
  const btnHide = () => {
    setShowCompleted(true);
  };
 
const checkedTodosCount = todos.filter((t) => t.checked).length;

  return (
    <div className='container'>
      <h1>Todo List</h1>
      <div className='button'>
        {/* Textbox */}
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        &nbsp;&nbsp;&nbsp;

        {/* Add A Task */}
        <button className='addbtn' onClick={handleAddTodo}>Add Todo</button>
        &nbsp;&nbsp;&nbsp;
        
        {/* Clear Checklist */}
        <button className='clearbtn' onClick={() => {setTodos([]);}}>Clear Todos</button>
        &nbsp;&nbsp;&nbsp;
      </div>
        <p>Checked Todos Count: {checkedTodosCount}</p>
          {/* Show/Hide completed task*/}
          {showCompleted ? (
          <button className='showbtn' onClick={btnShow}>Show tasks</button>
        ) : (
          <button className='hidebtn' onClick={btnHide}>Hide tasks</button>
        )}
      <div>
        {/* Todo Checklist */}
        <ul>
        {(showCompleted ? todos.filter((t) => t.checked !== true) : todos).map(
          (todo) => (
            <div key={todo.id}>
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={(e) => {
                  onCheckedChanged(todo.id, !todo.checked);
                }}
              />
              <span style={{ textDecoration: todo.checked ? 'line-through' : 'none' }}>{todo.text}</span>
              &nbsp;&nbsp;&nbsp;

              {/* Todo delete button */}
              <button className='ex'
                onClick={() => {
                  setTodos((todos) => todos.filter((t) => t.id !== todo.id));
                }}
              >
                x
              </button>
              </div>
          )
        )}
        </ul>
      </div>
      
    </div>
  );
}

export default TodoList;