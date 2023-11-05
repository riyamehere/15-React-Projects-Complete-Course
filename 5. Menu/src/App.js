import React, { useState } from "react";
import Menu from "./Menu";
import Categories from "./Categories";
import items from "./data";
//getting all the values that are there in category property in ou data.js
//using "Set" datastructure for getting only the unique category
//all categories include ["all",spread operator for all other unique categories form our data.js]
const allCategories = ["all", ...new Set(items.map((item) => item.category))];

function App() {
  //creating states for menu and categories
  const [menuItems, setMenuItems] = useState(items);
  //passing allCategories as the initial value for categories array
  const [categories, setCategories] = useState(allCategories);

  //looking for category string
  const filterItems = (category) => {
    if (category === "all") {
      //setting the menuitems to original items
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>our menu</h2>
          <div className="underline"></div>
        </div>
        <Categories categories={categories} filterItems={filterItems} />
        <Menu items={menuItems} />
      </section>
    </main>
  );
}

export default App;
