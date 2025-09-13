import React, { useState } from 'react';

export default function Menu({ index, tasks, setTasks, darkMode, closeMenu, onAddSubtask }) {
  const [showSubTaskInput, setShowSubTaskInput] = useState(false);
  const [subTaskText, setSubTaskText] = useState('');

  const handleDeleteTask = () => {
    setTasks(tasks => tasks.filter((_, i) => i !== index));
    closeMenu();
  };

  const handleAddSubTask = () => {
    if (subTaskText.trim()) {
      onAddSubtask(index, subTaskText.trim());
      setSubTaskText('');
      setShowSubTaskInput(false);
      closeMenu();
    }
  };

  return (
    <div
      className={
        darkMode
          ? "bg-gray-800 text-white p-2 rounded absolute z-10"
          : "bg-gray-200 text-black p-2 rounded absolute z-10"
      }
      style={{ right: 0, top: 30, minWidth: 180 }}
    >
      <button
        className="bg-red-500 text-white p-1 rounded m-1 cursor-pointer w-full"
        onClick={handleDeleteTask}
      >
        Delete Task
      </button>
      <button
        className="bg-green-500 text-white p-1 rounded m-1 cursor-pointer w-full"
        onClick={() => setShowSubTaskInput(true)}
      >
        Add Subtask
      </button>
      {showSubTaskInput && (
        <div className="mt-2">
          <input
            type="text"
            value={subTaskText}
            onChange={e => setSubTaskText(e.target.value)}
            placeholder="Subtask..."
            className={`border p-1 rounded w-full mb-1 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
            autoFocus
          />
          <button
            className="bg-blue-500 text-white p-1 rounded m-1 cursor-pointer w-full"
            onClick={handleAddSubTask}
          >
            Save Subtask
          </button>
          <button
            className="bg-gray-500 text-white p-1 rounded m-1 cursor-pointer w-full"
            onClick={() => setShowSubTaskInput(false)}
          >
            Cancel
          </button>
        </div>
      )}
      <button
        className="bg-gray-400 text-white p-1 rounded m-1 cursor-pointer w-full"
        onClick={closeMenu}
      >
        Close
      </button>
      {tasks[index].subTasks && tasks[index].subTasks.length > 0 && (
        <div className="mt-2">
          <div className="font-bold text-sm mb-1">Subtasks:</div>
          <ul className="ml-2">
            {tasks[index].subTasks.map((sub, subIdx) => (
              <li key={subIdx} className="text-xs italic text-gray-500">
                - {sub}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}