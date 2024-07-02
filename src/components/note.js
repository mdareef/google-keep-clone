import React from "react";
import Task from "./task";

const Note = ({ note, onTaskToggle, onColorEdit, onCloseNote }) => {
  return (
    <div
      style={{ backgroundColor: note.color }}
      className={` note ${note?.completed ? "completed" : ""}`}
    >
      <div
        className={`task-container task ${note?.completed ? "completed" : ""}`}
      >
        <input
          type="checkbox"
          checked={note?.completed}
          onChange={() => onTaskToggle(note.id)}
          className="task-checkbox"
        />
        <div className="note-title">{note.title}</div>
      </div>
      <div className="note-content">
        {Array.isArray(note.content) &&
          note.content.map((task, index) => <Task key={index} task={task} />)}
      </div>
      <input
        type="color"
        value={note?.color}
        onChange={(e) => onColorEdit(note.id, e.target.value)}
        className="input-color-edit"
      />
      <div className="close-note" onClick={() => onCloseNote(note.id)}>
        X
      </div>
    </div>
  );
};

export default Note;
