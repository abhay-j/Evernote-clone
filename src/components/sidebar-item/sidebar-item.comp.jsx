import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../../helpers";
import { List } from "@material-ui/core";

class SidebarItem extends React.Component {
  render() {
    const { _note, classes, _index, selectedNoteIndex } = this.props;
    return (
      <div key={_index}>
        <ListItem
          className={classes.listItem}
          selected={selectedNoteIndex === _index}
          alignItems="flex-start"
        >
          <div
            className={classes.textSection}
            onClick={() => this.selectNote(_note, _index)}
          >
            <ListItemText
              primary={_note.title}
              secondary={removeHTMLTags(_note.body.substring(0, 30)) + "..."}
            ></ListItemText>
          </div>
          <DeleteIcon
            className={classes.deleteIcon}
            onClick={() => this.deleteNote(_note)}
          ></DeleteIcon>
        </ListItem>
      </div>
    );
  }
  selectNote = (n, i) => {
    this.props.selectNote(n, i);
  };
  deleteNote = (n) => {
    if (
      window.confirm(`Are you sure you want to delete ${n.title} from database`)
    ) {
      this.props.deleteNote(n);
    } else {
      return;
    }
  };
}

export default withStyles(styles)(SidebarItem);
