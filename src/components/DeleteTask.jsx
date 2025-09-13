import { useState } from "react";

export default function DeleteTask({ index, tasks, setTasks, darkMode, closeMenu }) {
  const [pendingDelete, setPendingDelete] = useState(false);

  const deleteTask = () => setPendingDelete(true);

  const confirmDeleteTask = () => {
    setTasks(tasks.filter((_, i) => i !== index));
    setPendingDelete(false);
    closeMenu();
    alert(`The task ${index + 1} has been deleted`);
  };

  const cancelDeleteTask = () => setPendingDelete(false);

  return (
    <>
      <button className='bg-red-500 text-white p-1 rounded ml-2 cursor-pointer' onClick={deleteTask}>Delete</button>
      {pendingDelete && (
        <div className={darkMode ? "bg-gray-800 text-white p-2 rounded mt-2" : "bg-gray-200 text-black p-2 rounded mt-2"}>
          <span>Are you sure you want to delete this task?</span>
          <button className="bg-green-500 text-white p-1 rounded ml-2 cursor-pointer" onClick={confirmDeleteTask}>Yes</button>
          <button className="bg-gray-500 text-white p-1 rounded ml-2 cursor-pointer" onClick={cancelDeleteTask}>No</button>
        </div>
      )}
    </>
  );
}