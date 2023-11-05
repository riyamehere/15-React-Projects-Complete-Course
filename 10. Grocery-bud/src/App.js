import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

//get item from localstorage
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  //list exits return the list else empty value
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};
function App() {
  //form name state
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage()); //initialize with the getlocalstorage function, bcz when we refresh the page, previous values of list should be retained
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  //object
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    //if empty values are inserted
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      //if there is some value of name and isediting is true
      //dealing with edit
      setList(
        list.map((item) => {
          //if the item id matches the edit id, then return all the previous values plus new edited value
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      //showing alert
      showAlert(true, "success", "item added to the list");
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  //setlist to empty
  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  //remove particular item
  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    //setlist to the new value
    //if it does not match the id, then it should be added to the new array i.e list.filter
    setList(list.filter((item) => item.id !== id));
  };

  //editing the item
  const editItem = (id) => {
    //if item id matches then pls return that element
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  //everytime the list changes we call the localstorage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {/* timeout func for alert */}
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {/* if is editing is true, then edit else submit */}
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {/* if length is > 0 only then show that grocery item */}
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
