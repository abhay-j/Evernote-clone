import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import debounce from "../../helpers";

import { makeStyles } from "@material-ui/core";
import { TimeToLeave } from "@material-ui/icons";
//
const useStyles = makeStyles({
  editorContainer: {
    width: "100%",
    height: "100%",
  },
});
const Editor = ({ selectedNote, selectedNoteIndex, notes, noteUpdate }) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    setText(selectedNote.body);
    setTitle(selectedNote.title);
    setId(selectedNote.id);
  }, [selectedNote]);

  const updateBody = async (val) => {
    await setText(val);

    update();
  };

  // const update = useRef(
  //   debounce(() => {
  //     console.log("updating database!");
  //     try {
  //       noteUpdate(id, title, text);
  //     } catch (error) {
  //       console.log("this is the error", error);
  //     }
  //   }, 1500)
  // ).current;

  // const update = debounce(() => {
  //   // comeback later
  //   console.log("updating database!");

  //   noteUpdate(id, title, text);
  // }, 1500);
  const update = () => {
    // comeback later
    console.log("updating database!");
    try {
      noteUpdate(id, title, text);
    } catch (error) {
      console.log("this is the error", error);
    }
  };

  return (
    <div className={classes.editorContainer}>
      <ReactQuill value={text} onChange={updateBody}></ReactQuill>
    </div>
  );
};
export default Editor;
