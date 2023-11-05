import React, { useState } from "react";
import SingleColor from "./SingleColor";
//importing the values.js library
import Values from "values.js";

function App() {
  const [color, setColor] = useState("");
  //if some kind of silly value is added, for that error state
  const [error, setError] = useState(false);
  //setting up default values after refreshing page
  const [list, setList] = useState(new Values("#f15025").all(10));

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      //.all() creates the 10 values tint and shades of the color divided by 10
      let colors = new Values(color).all(10);
      //updating the state value of List
      setList(colors);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <>
      <section className="container">
        <h3>color generator</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={color}
            //setting color according to the input
            onChange={(e) => setColor(e.target.value)}
            placeholder="#f15025"
            //if error is true ,add a class of error, to change the input box color to red
            className={`${error ? "error" : null}`}
          />
          <button className="btn" type="submit">
            submit
          </button>
        </form>
      </section>
      <section className="colors">
        {/* iterating over all the values in list */}
        {list.map((color, index) => {
          return (
            <SingleColor
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
            />
          );
        })}
      </section>
    </>
  );
}

export default App;
