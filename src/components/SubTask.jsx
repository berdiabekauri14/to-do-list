import { useState, useEffect } from 'react';

export default function SubTask({ taskId, onAddSubTask }) {
    const [subTaskText, setSubTaskText] = useState('');
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("Theme");
        if (savedTheme === "dark") {
            setDarkMode(true);
        } else if (savedTheme === "light") {
            setDarkMode(false);
        }
    }, []);

    const handleAddSubTask = () => {
        if (subTaskText.trim()) {
            onAddSubTask(taskId, subTaskText.trim());
            setSubTaskText('');
        }
    };

    return (
        <div style={{ marginTop: '1rem' }}>
            <textarea
                type="text"
                value={subTaskText}
                className={`border p-2 rounded outline-0 ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'border-gray-300 bg-white text-black'}`}
                onChange={e => setSubTaskText(e.target.value)}
                placeholder="Add a subtask..."
            ></textarea>
            <button
                onClick={handleAddSubTask}
                className="bg-green-600 text-white rounded cursor-pointer"
                style={{ marginLeft: '8px', padding: '8px 12px' }}
            >
                Add Subtask
            </button>
        </div>
    );
}