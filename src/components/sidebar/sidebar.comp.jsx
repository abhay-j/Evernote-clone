import React, { useState } from "react";

import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Drawer from "@material-ui/core/Drawer";
import ListSubheader from "@material-ui/core/ListSubheader";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import ExpandLess from "@material-ui/icons/ExpandLess";
import NotesIcon from "@material-ui/icons/Notes";
import ExpandMore from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import SidebarItem from "../sidebar-item/sidebar-item.comp";
const drawerWidth = 240;
const useStyles = makeStyles({
  sidebarWrapper: {
    // width: "20%",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  addNoteBtn: {
    borderRadius: 0,
    width: "100%",
  },
  root: {
    width: "100%",
    maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: "20px",
  },
  inputField: {
    width: "100%",
  },
});
// import SidebarItemComponent from '../sidebaritem/sidebarItem';
const Sidebar = ({
  notes,
  selectedNote,
  selectedNoteIndex,
  onSelect,
  onDelete,
  addNote,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [addingNotes, setAddingNotes] = useState(false);
  const [title, setTitle] = useState(null);
  // event handler for drop down from material ui
  const handleClick = () => {
    setOpen(!open);
  };
  //////////////////////////////
  const selectNote = (n, i) => {
    console.log("select Note");
    onSelect(n, i);
  };
  const deleteNote = (n) => {
    console.log("delete Note", n);
    onDelete(n);
  };
  const newNote = () => {
    console.log(title);
    addNote(title);
    setTitle(null);
    setAddingNotes(false);
  };
  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Nested List Items
            </ListSubheader>
          }
          className={classes.root}
        >
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <NotesIcon />
            </ListItemIcon>
            <ListItemText primary="Notes" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                onClick={() => {
                  setAddingNotes(!addingNotes);
                  setTitle(null);
                }}
                button
                className={classes.nested}
              >
                <ListItemIcon>
                  <AddCircleOutlineRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={addingNotes ? "Cancle" : "Add Note"} />
              </ListItem>
              {addingNotes ? (
                <div>
                  <TextField
                    className={classes.inputField}
                    id="standard-basic"
                    label=" Add title"
                    // placeholder="Add title"
                    onKeyUp={(e) => {
                      setTitle(e.target.value);
                    }}
                  />

                  <Button
                    className={classes.addNoteBtn}
                    variant="contained"
                    disableElevation
                    onClick={newNote}
                  >
                    Submit
                  </Button>
                </div>
              ) : null}
              {/* list items  */}
              {notes.map((_note, _index) => {
                return (
                  <ListItem key={_index} button className={classes.nested}>
                    <SidebarItem
                      _note={_note}
                      _index={_index}
                      selectedNoteIndex={selectedNoteIndex}
                      selectNote={selectNote}
                      deleteNote={deleteNote}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
        </List>

        {/* <Button
          className={classes.addNoteBtn}
          variant="contained"
          color="primary"
        >
          Add note
        </Button> */}
      </Drawer>
    </div>
  );
};
export default Sidebar;
