import "./App.css";
import React from "react";
import firebase from "./firebase";
import Sidebar from "./components/sidebar/sidebar.comp";
import Editor from "./components/editor/editor.comp";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: [],
    };
  }
  render() {
    return (
      <div className="app-container">
        <Sidebar
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
        />
        <Editor />
      </div>
    );
  }
  componentDidMount() {
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
        this.setState({ notes: notes });
      });
  }
}

export default App;
