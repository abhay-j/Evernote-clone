import "./Todos.css";
import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// import ListInput from "../../components/list-input/list-input.comp";
import ListContainer from "../../components/list-container/list-container.comp";
const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  useEffect(() => {
    getTodos();
  }, []);
  const handleChangeTask = (e) => {
    setTask(e.target.value);
  };
  const handleChangeDate = (e) => {
    setDeadline(e.target.value);
  };

  const getTodos = () => {
    firebase
      .firestore()
      .collection("ToDoLists")
      .onSnapshot((querySnapshot) => {
        setTodos(
          querySnapshot.docs.map((_doc) => {
            return {
              id: _doc.id,
              todo: _doc.data().todo,
              inProgress: _doc.data().inprogress,
              deadline: _doc.data().deadline,
            };
          })
        );
      });
  };

  const addTodoItem = (e) => {
    e.preventDefault();
    console.log(task, deadline);
    firebase.firestore().collection("ToDoLists").add({
      todo: task,
      inprogress: true,
      deadline: deadline,
    });
    setTask("");
    setDeadline("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "red",
      }}
    >
      <Typography style={{ textAlign: "center" }} variant="h4" component="h2">
        Add Todo Items and Dead lines
      </Typography>
      <Link to="/">Back to Notes</Link>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "30%",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <TextField
            value={task}
            id="standard-basic"
            label="add todo"
            variant="standard"
            onChange={handleChangeTask}
          />
          <TextField
            id="standard-basic"
            type="date"
            variant="standard"
            value={deadline}
            onChange={handleChangeDate}
          />
          <Button
            style={{ margin: "10px" }}
            variant="outlined"
            onClick={addTodoItem}
          >
            Submit
          </Button>
        </form>
      </div>
      <ListContainer todos={todos}></ListContainer>
    </div>
  );
};
export default TodosPage;
