import React, { useState } from "react";

const NoteForm = ({ onAddNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#ffffff");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      const formattedContent = content
        .split("\n")
        .map((line) => ({ title: line }));
      const completed = false;
      onAddNote(title, formattedContent, color, completed);
      setTitle("");
      setContent("");
      setColor("#ffffff");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <div className="note-form-inputs">
        <div>
          <div className="input-title-text">Title</div>
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-title"
          />
        </div>
        <div>
          <div className="input-title-text">Content</div>
          <textarea
            placeholder="Content (new line for each task)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input-textarea"
          />
        </div>
      </div>
      <div className="note-form-bottom">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="input-color"
        />
        <button className="submit-button" type="submit">
          + Add Note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
