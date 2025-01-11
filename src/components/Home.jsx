import React, { useState } from 'react';
import './Home.css';

function Home() {
  const [task, setTask] = useState(''); // Input field value
  const [tasks, setTasks] = useState({ todo: [], ongoing: [], completed: [] }); // Task categories

  // Handle input change
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Add task to "To-Do" section
  const addTask = () => {
    if (task.trim() !== '') {
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, task],
      }));
      setTask(''); // Clear input
    }
  };

  // Move task to another category
  const moveTask = (currentCategory, targetCategory, taskToMove) => {
    setTasks((prevTasks) => {
      // Remove task from current category
      const updatedCurrent = prevTasks[currentCategory].filter(
        (t) => t !== taskToMove
      );
      // Add task to target category
      const updatedTarget = [...prevTasks[targetCategory], taskToMove];
      return { ...prevTasks, [currentCategory]: updatedCurrent, [targetCategory]: updatedTarget };
    });
  };

  // Delete a task
  const deleteTask = (currentCategory, taskToDelete) => {
    setTasks((prevTasks) => {
      const updatedCategory = prevTasks[currentCategory].filter(
        (t) => t !== taskToDelete
      );
      return { ...prevTasks, [currentCategory]: updatedCategory };
    });
  };

  // Clear all tasks in a category
  const clearTasks = (category) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: [],
    }));
  };

  return (
    <div className="home">
      <form
        className="task-form"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent form reload
          addTask();
        }}
      >
        <input
          type="text"
          placeholder="Enter task..."
          className="task-input"
          value={task}
          onChange={handleInputChange}
        />
        <button
          type="button"
          className="add-task-button"
          onClick={addTask}
        >
          ADD TASK
        </button>
      </form>
      <div className="task-sections">
        {/* To-Do Section */}
        <div className="task-section">
          <h2>To-Do Tasks</h2>
          <button onClick={() => clearTasks('todo')} className="clear-button">Clear All</button>
          <ul>
            {tasks.todo.map((t, index) => (
              <li key={index}>
                {t}
                <button onClick={() => moveTask('todo', 'ongoing', t)}>Move to Ongoing</button>
                <button onClick={() => moveTask('todo', 'completed', t)}>Move to Completed</button>
                <button onClick={() => deleteTask('todo', t)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Ongoing Section */}
        <div className="task-section">
          <h2>Ongoing Tasks</h2>
          <button onClick={() => clearTasks('ongoing')} className="clear-button">Clear All</button>
          <ul>
            {tasks.ongoing.map((t, index) => (
              <li key={index}>
                {t}
                <button onClick={() => moveTask('ongoing', 'todo', t)}>Move to To-Do</button>
                <button onClick={() => moveTask('ongoing', 'completed', t)}>Move to Completed</button>
                <button onClick={() => deleteTask('ongoing', t)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Completed Section */}
        <div className="task-section">
          <h2>Completed Tasks</h2>
          <button onClick={() => clearTasks('completed')} className="clear-button">Clear All</button>
          <ul>
            {tasks.completed.map((t, index) => (
              <li key={index}>
                {t}
                <button onClick={() => moveTask('completed', 'todo', t)}>Move to To-Do</button>
                <button onClick={() => moveTask('completed', 'ongoing', t)}>Move to Ongoing</button>
                <button onClick={() => deleteTask('completed', t)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
