import React, { useState } from "react";

const ListInput = ({ onAdd }) => {
  const [itemText, setItemText] = useState("");
  const [deadline, setDeadline] = useState("");
  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "text") {
      setItemText(value);
    } else if (name === "deadline") {
      setDeadline(value);
    }
  };

  const addItem = (e) => {
    e.preventDefault();
    if (itemText && deadline) {
      onAdd(itemText, deadline);
      setItemText("");
      setDeadline("");
    }
  };

  return (
    <div>
      <h2>{`your title ${itemText} your deadline ${deadline}`}</h2>
      <form>
        <label>Add Item</label>
        <input
          name="text"
          value={itemText}
          type="text"
          onChange={handleChange}
          placeholder="add new Todo item..."
        />
        <label>Set Deadline</label>
        <input
          name="deadline"
          value={deadline}
          onChange={handleChange}
          type="text"
          placeholder="DD/MM/YY"
        />
        <button onClick={addItem}>Add</button>
      </form>
    </div>
  );
};
export default ListInput;
