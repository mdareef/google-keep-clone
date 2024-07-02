import React from "react";
import NoteList from "./components/noteList";
import Header from "./components/header";
import "./styles.css";

const App = () => {
  return (
    <div className="app">
      <Header />
      <NoteList />
    </div>
  );
};

export default App;
