import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Note from "./note";
import NoteForm from "./noteForm";

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  const addNote = (title, content, color, completed) => {
    setNotes([...notes, { id: Date.now(), title, content, color, completed }]);
  };

  const updateNote = (noteId) =>
    notes.map((note) => {
      if (note.id === noteId) {
        return { ...note, completed: !note.completed };
      }
      return note;
    });

  const toggleTask = (noteId) => {
    let updateNotes = updateNote(noteId);
    const noteToMove = updateNotes.find(
      (note) => note.id === noteId && note.completed
    );

    const noteToFirst = updateNotes.find(
      (note) => note.id === noteId && !note.completed
    );

    if (noteToMove) {
      updateNotes = updateNotes.filter((note) => note.id !== noteId);
      updateNotes.push(noteToMove);
    }
    if (noteToFirst) {
      updateNotes = updateNotes.filter((note) => note.id !== noteId);
      updateNotes.unshift(noteToFirst);
    }

    setNotes(updateNotes);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedNotes = Array.from(notes);
    const [removed] = reorderedNotes.splice(result.source.index, 1);
    reorderedNotes.splice(result.destination.index, 0, removed);

    setNotes(reorderedNotes);
  };

  const onColorEdit = (noteId, color) => {
    const updateNote = () =>
      notes.map((note) => {
        if (note.id === noteId) {
          return { ...note, color: color };
        }
        return note;
      });
    setNotes(updateNote());
  };

  const onCloseNote = (noteId) => {
    const updateNote = notes.filter((note) => note.id !== noteId);
    setNotes(updateNote);
  };
  return (
    <div>
      <NoteForm onAddNote={addNote} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="notes">
          {(provided) => (
            <div
              className="note-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                height: "70px",
                display: "flex",
                flexWrap: "wrap",
                padding: "10px",
              }}
            >
              {notes.length === 0 && (
                <div className="no-note">
                  No Note Found <br />{" "}
                  <span>Create new note please fill the form</span>
                </div>
              )}

              {notes.map((note, index) => (
                <Draggable
                  key={note.id}
                  draggableId={note.id.toString()}
                  index={index}
                  isDragDisabled={note.completed}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={` note-container ${
                        note?.completed ? "completed" : ""
                      }`}
                      style={{
                        ...provided.draggableProps.style,
                        minHeight: "80px",
                        margin: "5px",
                        padding: "8px 10px",
                        backgroundColor: note.color || "#ffffff",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        boxShadow: snapshot.isDragging
                          ? "0 0 5px rgba(0,0,0,0.3)"
                          : "none",
                      }}
                    >
                      <Note
                        note={note}
                        onTaskToggle={toggleTask}
                        onColorEdit={onColorEdit}
                        onCloseNote={onCloseNote}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default NoteList;
