import React, { useRef } from "react";
import Task from "./task";
import paint from "./paint.png";

const Note = ({ note, onTaskToggle, onColorEdit, onCloseNote }) => {
  const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    onColorEdit(note.id, e.target.value);
  };
  return (
    <div className={` note ${note?.completed ? "completed" : ""}`}>
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
      <div class="input-container-edit">
        <input
          type="color"
          value={note?.color}
          onChange={handleFileChange}
          className="input-color-edit"
          ref={fileInputRef}
          disabled={note?.completed}
        />
        <img
          src={paint}
          alt="Image"
          onClick={handleClick}
          class="replacement-image-edit"
        />
      </div>
      <div className="close-note" onClick={() => onCloseNote(note.id)}>
        X
      </div>
    </div>
  );
};

export default Note;
