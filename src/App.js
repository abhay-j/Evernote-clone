import "./App.css";
import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import Sidebar from "./components/sidebar/sidebar.comp";
import Editor from "./components/editor/editor.comp";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
  root: {
    display: "flex",
    // backgroundColor: "red",
    height: "100%",
  },
});
const App = () => {
  const classes = useStyles();
  const [notes, setNotes] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  useEffect(() => {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot((serverUpdate) => {
        const notes = serverUpdate.docs.map((_doc) => {
          const data = _doc.data();
          data["id"] = _doc.id;

          return data;
        });
        console.log(notes);
        setNotes(notes);
      });
  }, []);
  const selectNote = (note, index) => {
    setSelectedNoteIndex(index);
    setSelectedNote(note);
  };
  const deleteNote = (index) => {};
  const noteUpdate = (id, title, text) => {
    // console.log("id:", id);
    firebase.firestore().collection("notes").doc(id).update({
      title: title,
      body: text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };
  return (
    <div className={classes.root}>
      {/* <div className={classes.sidebarWrapper}> */}
      <Sidebar
        notes={notes}
        selectedNote={selectedNote}
        selectedNoteIndex={selectedNoteIndex}
        onSelect={selectNote}
        onDelete={deleteNote}
      ></Sidebar>
      {/* </div> */}
      {selectedNote ? (
        <Editor
          selectedNote={selectedNote}
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          noteUpdate={noteUpdate}
        ></Editor>
      ) : null}
    </div>
  );
};

export default App;
