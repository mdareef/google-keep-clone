import React, { useState, useRef } from "react";
import paint from "./paint.png";

const NoteForm = ({ onAddNote }) => {
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#f1f5f8");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      const formattedContent = content
        .split("\n")
        .map((line) => ({ title: line }));
      const completed = false;
      onAddNote(title, formattedContent, color, completed);
      setTitle("");
      setContent("");
      setColor("#f1f5f8");
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const value = e.target.value;
    setColor(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ backgroundColor: color || "#f1f5f8" }}
      className="note-form"
    >
      <div className="note-form-inputs">
        <div>
          <div className="input-title-text">Title</div>
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-title"
            required
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
        <div class="input-container">
          <input
            type="color"
            value={color}
            onChange={handleFileChange}
            className="input-color"
            ref={fileInputRef}
          />
          <img
            src={paint}
            alt="Image"
            onClick={handleClick}
            class="replacement-image"
          />
        </div>
        <button className="submit-button" type="submit">
          + Add Note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
