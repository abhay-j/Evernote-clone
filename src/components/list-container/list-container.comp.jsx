import React from "react";
import ListItemCustom from "../list-item/list-item.comp";
const ListContainer = ({ todos }) => {
  return (
    <div
      className="todoItemsContainer"
      style={{
        width: "30%",
      }}
    >
      {todos.map((todoItem) => {
        return (
          // <p style={{ textAlign: "left" }} key={todoItem.id}>
          //   {todoItem.todo}
          // </p>
          <ListItemCustom key={todoItem.id} todoItem={todoItem} />
        );
      })}
    </div>
  );
};
export default ListContainer;
