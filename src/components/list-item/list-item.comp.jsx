import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import "./list-item.css";
import firebase from "../../firebase";
const ListItemCustom = ({ todoItem }) => {
  const toggleInprogress = () => {
    firebase.firestore().collection("ToDoLists").doc(todoItem.id).update({
      inprogress: !todoItem.inProgress,
    });
  };
  const deleteTodo = () => {
    firebase.firestore().collection("ToDoLists").doc(todoItem.id).delete();
  };
  return (
    // <p style={{ textAlign: "left" }} key={todoItem.id}>
    //   {todoItem.todo}
    // </p>
    <ListItem>
      <ListItemText
        primary={todoItem.todo}
        secondary={`deadline : ${todoItem.deadline}`}
      ></ListItemText>
      <Button onClick={toggleInprogress}>
        {todoItem.inProgress ? "done" : "✔"}
      </Button>
      <Button onClick={deleteTodo}>X</Button>
    </ListItem>
  );
};
export default ListItemCustom;
