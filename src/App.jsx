import React, { useState, useRef } from 'react';

export default React.memo(function App() {
  const [tasks, setTasks] = useState([]);
  const textareaRef = useRef(null);

  const clearPlaceholder = () => {
    if (textareaRef.current) {
      textareaRef.current.placeholder = "";
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
      return;
    }

    setTasks([...tasks, { text: input, completed: false }]);
    textareaRef.current.value = "";
    clearPlaceholder();
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  const deleteTasks = () => {
    if (tasks.length === 0) {
      alert("You didn't created a task yet");
      return;
    }

    setTasks([]);
    alert("All tasks has been deleted")
  };

  return (
    <div className=' text-center flex justify-center items-center flex-col h-screen'>
        <h1 className='text-4xl font-bold'>To-do List</h1>
        <br />
        <form name="form">
          <textarea
            ref={textareaRef}
            className='border border-gray-300 p-2 rounded outline-0'
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
                <button className='cursor-pointer m-1' onClick={() => toggleTaskCompleted(index)}>●</button>
                <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                  {task.text}
                </span>
                <button className='bg-red-500 text-white p-1 rounded ml-2 cursor-pointer' onClick={() => deleteTask(index)}>Delete</button>
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
})