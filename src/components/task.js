import React from "react";

const Task = ({ task, onTaskToggle }) => {
  return (
    <div className="task">
      <div className="task-title">{task.title}</div>
    </div>
  );
};

export default Task;
