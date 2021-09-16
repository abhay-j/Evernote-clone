import React from "react";
import { makeStyles } from "@material-ui/styles";
// import styles from "./styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../../helpers";
import { Note } from "@material-ui/icons";

const useStyles = makeStyles({
  listItem: {
    cursor: "pointer",
  },

  deleteIcon: {
    position: "absolute",
    right: "0",
    top: "5px",
    "&:hover": {
      color: "red",
    },
  },
  wrapper: {
    width: "100%",
  },
});

const SidebarItem = ({
  _note,
  _index,
  selectedNoteIndex,
  selectNote,
  deleteNote,
}) => {
  const classes = useStyles();
  const handleSelect = () => {
    selectNote(_note, _index);
  };
  const handleDelete = () => {
    if (window.confirm(`are you sure you want to delete`)) {
      deleteNote(_note);
    }
  };
  return (
    <div className={classes.wrapper} key={_index}>
      <ListItem
        className={classes.listItem}
        selected={selectedNoteIndex === _index}
      >
        <div onClick={handleSelect}>
          <ListItemText
            primary={_note.title}
            secondary={removeHTMLTags(_note.body.substring(0, 30)) + "..."}
          ></ListItemText>
        </div>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={handleDelete}
        ></DeleteIcon>
      </ListItem>
    </div>
  );
};
export default SidebarItem;
