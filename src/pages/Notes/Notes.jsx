import "./Notes.css";
import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import Sidebar from "../../components/sidebar/sidebar.comp";
import Editor from "../../components/editor/editor.comp";
import { makeStyles } from "@material-ui/styles";
import { v4 as uuidv4 } from "uuid";
const useStyles = makeStyles({
  root: {
    display: "flex",
    // backgroundColor: "red",
    height: "100%",
  },
});
const NotesPage = () => {
  const classes = useStyles();
  const [notes, setNotes] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  // const [currentNewNote, setCurrentNewNote] = useState(null);
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
        // console.log(notes);
        setNotes(notes);
      });
  }, []);
  // useEffect(() => {
  //   if (currentNewNote) {
  //     const curNote = notes.filter(
  //       (_note) => _note.uid === currentNewNote.uid
  //     )[0];
  //     const curNoteIndex = notes.indexOf(curNote);

  //     console.log(
  //       "from useEffect currentNote and its index",
  //       curNote,
  //       curNoteIndex
  //     );
  //     setSelectedNoteIndex(curNoteIndex);
  //     setSelectedNote(curNote);
  //   } else {
  //     console.log("currentNewNote is null");
  //   }
  // }, [currentNewNote]);
  const selectNote = (note, index) => {
    setSelectedNoteIndex(index);
    setSelectedNote(note);
  };
  const deleteNote = (note) => {
    const delIndex = notes.indexOf(note);
    const newNotes = notes.filter((_note) => _note !== note);
    setNotes(newNotes);
    if (selectedNoteIndex === delIndex) {
      setSelectedNoteIndex(null);
      setSelectedNote(null);
    } else {
      notes.length > 1
        ? selectNote(notes[selectedNoteIndex - 1], selectedNoteIndex - 1)
        : setSelectedNoteIndex(null);
      setSelectedNote(null);
    }

    firebase.firestore().collection("notes").doc(note.id).delete();
  };
  const noteUpdate = (id, title, text) => {
    if (id) {
      firebase.firestore().collection("notes").doc(id).update({
        title: title,
        body: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      console.log("id:", id);
    } else {
      console.log("id:", id);
    }
  };
  const newNote = async (title) => {
    let uid = uuidv4();
    const note = {
      title: title,
      body: "",
      uid: uid,
    };
    console.log(note);
    await firebase.firestore().collection("notes").add({
      title: note.title,
      body: note.body,
      uniqueId: note.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setNotes((prev) => {
      return [...prev, note];
    });
    // setCurrentNewNote(note);
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
        addNote={newNote}
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

export default NotesPage;
