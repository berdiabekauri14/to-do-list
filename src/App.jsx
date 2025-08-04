import React, { useState, useRef, useEffect } from 'react';
import img from './assets/logo.PNG';

export default React.memo(function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [pendingDeleteIndex, setPendingDeleteIndex] = useState(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("Theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    } else if (savedTheme === "light") {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0 && tasks.every(task => task.completed)) {
      alert("Congratulations! All tasks have been completed.");
    }
  }, [tasks]);

  const clearPlaceholder = () => {
    if (textareaRef.current) {
      textareaRef.current.placeholder = "Add a new task";
    }
  };

  const toggleTaskCompleted = (index) => {
    setTasks(tasks =>
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const AddTask = (e) => {
    e.preventDefault();
    const input = e.target.form.input.value.trim();

    if (input === "") {
      alert("Please enter a task.");
      return;
    } else if (tasks.some(task => task.text === input)) {
      alert("This task already exists.");
      clearPlaceholder();
      return;
    }

    setTasks([...tasks, { text: input, completed: false }]);
    textareaRef.current.value = "";
    clearPlaceholder();
  };

  const deleteTask = (index) => {
    setPendingDeleteIndex(index);
  };

  const confirmDeleteTask = () => {
    setTasks(tasks.filter((_, i) => i !== pendingDeleteIndex));
    setPendingDeleteIndex(null);
  };

  const cancelDeleteTask = () => {
    setPendingDeleteIndex(null);
  };

  const deleteTasks = () => {
    if (tasks.length === 0) {
      alert("You didn't created a task yet");
      return;
    }

    setTasks([]);
    alert("All tasks has been deleted")
  };

  const handleDarkModeToggle = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("Theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  return (
    <div className={`text-center flex justify-center items-center flex-col h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <button
          className='cursor-pointer bg-gray-500 text-white p-2 rounded m-2'
          onClick={handleDarkModeToggle}
        >
          {darkMode ? 'Turn off dark mode' : 'Turn on dark mode'}
        </button>
        <br />
        <h1 className='text-4xl font-bold'><button><img src={img} width={50} className=' relative top-3' alt="img" /></button> To-do List</h1>
        <br />
        <form name="form">
          <textarea
            ref={textareaRef}
            className={`border p-2 rounded outline-0 ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'border-gray-300 bg-white text-black'}`}
            type="text"
            placeholder="Add a new task"
            name="input"
          ></textarea>
          <br />
          <button className='bg-blue-500 text-white p-2 rounded m-2 cursor-pointer' onClick={AddTask}>Add Task</button>
        </form>
        <br />
        <div>
          <h1 className='text-2xl font-semibold'>Your tasks will be shown here: </h1>
          <ul name="list">
          {tasks.map((task, index) => (
            <li key={index} className=' m-1'>
              <button className={task.completed ? "cursor-pointer m-1 border-2 border-black size-5 bg-green-500" : "cursor-pointer m-1 border-2 border-black size-5"} onClick={() => toggleTaskCompleted(index)}><span className={task.completed ? " text-white relative bottom-1.5" : ""}>{task.completed ? "✓" : ""}</span></button>
              <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                {task.text}
              </span>
              { task.completed ? <span className='text-green-500'> (Completed)</span> : <span className='text-red-500'> (Not Completed)</span>}
              <button className='bg-red-500 text-white p-1 rounded ml-2 cursor-pointer' onClick={() => deleteTask(index)}>Delete</button>
              {pendingDeleteIndex === index && (
                <div className="inline-block ml-4 bg-gray-200 text-black p-2 rounded shadow">
                  <span>Are you sure you want to delete this task?</span>
                  <button className="bg-green-500 text-white p-1 rounded ml-2 cursor-pointer" onClick={confirmDeleteTask}>Yes</button>
                  <button className="bg-gray-500 text-white p-1 rounded ml-2 cursor-pointer" onClick={cancelDeleteTask}>No</button>
                </div>
              )}
            </li>
          ))
          }
        </ul>
          <br />
          {
            tasks.length === 0 ? <p className='text-gray-500 font-black'>No tasks available</p> : <button className='bg-red-500 text-white p-1 rounded ml-2 cursor-pointer' onClick={deleteTasks}>Delete Tasks</button>
          }
        </div>
    </div>
  );
});