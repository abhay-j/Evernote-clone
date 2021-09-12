import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
// import SidebarItemComponent from '../sidebaritem/sidebarItem';
import SidebarItem from "../sidebar-item/sidebar-item.comp";
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addingNote: false,
      title: null,
    };
  }
  render() {
    const { selectedNoteIndex, notes, classes } = this.props;
    return (
      <div className={classes.sidebarContainer}>
        <Button onClick={this.newNoteBtnClick} className={classes.newNoteBtn}>
          {this.state.addingNote ? "cancel" : "New Note"}
        </Button>
        {this.state.addingNote ? (
          <div>
            <input
              type="text"
              className={classes.newNoteInput}
              placeholder="Enter note title"
              onKeyUp={(e) => {
                this.updateTitle(e.target.value);
              }}
            />
            <Button className={classes.newNoteSubmitBtn} onClick={this.newNote}>
              Submit Note
            </Button>
          </div>
        ) : null}

        <List>
          {notes.map((_note, _index) => {
            return (
              <div key={_index}>
                <SidebarItem
                  _note={_note}
                  _index={_index}
                  selectedNoteIndex={selectedNoteIndex}
                  selectNote={this.selectNote}
                  deleteNote={this.deleteNote}
                />
                <Divider></Divider>
              </div>
            );
          })}
        </List>
      </div>
    );
  }
  newNoteBtnClick = () => {
    this.setState({ title: null, addingNote: !this.state.addingNote });
    console.log("NEW NOTES !");
  };
  updateTitle = (txt) => {
    this.setState({ title: txt });
  };
  newNote = () => {
    console.log(this.state);
  };
  selectNote = () => console.log("selectNote");
  deleteNote = () => console.log("deleteNote");
}
export default withStyles(styles)(Sidebar);
