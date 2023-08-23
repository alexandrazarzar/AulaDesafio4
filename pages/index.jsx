import React, { useState, useEffect } from "react";
import TaskItem from "../components/TaskItem";

export default function TodoList() {
  const initialTasks = [1, 2, 3, 4, 5, 6].map((i) => ({
    id: i,
    title: `Task ${i}`,
    completed: i % 2 === 0,
  }));

  const [tasks, setTasks] = useState(initialTasks);
  const [filteredTasks, setFilteredTasks] = useState(initialTasks);
  const [newTitleTask, setNewTitleTask] = useState("");
  const [searchText, setSearchText] = useState(""); // Estado para o filtro de busca

  const handleNewTitleChange = (e) => {
    setNewTitleTask(e.target.value);
  };

  const handleAddNewTask = () => {
    const newTask = {
      id: new Date().getTime(),
      title: newTitleTask,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setNewTitleTask("");
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks([...tasks.filter((t) => t.id !== updatedTask.id), updatedTask]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks([...tasks.filter((task) => task.id !== taskId)]);
  };

  useEffect(() => {
    const filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [tasks, searchText]);

  return (
    <div className="container">
      <p>
        <label htmlFor="new-task">Add Item</label>
        <input
          data-testid="newTaskTitle"
          id="new-task"
          type="text"
          value={newTitleTask}
          onChange={handleNewTitleChange}
        />
        <button onClick={handleAddNewTask}>Add</button>
      </p>

      <h3>Todo</h3>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />
      <ul id="incomplete-tasks">
        {tasks
          .filter((task) => !task.completed && task.title.includes(searchText))
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
      </ul>
      <h3>Completed</h3>
      <ul id="completed-tasks">
        {tasks
          .filter((task) => task.completed)
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
      </ul>
    </div>
  );
}
