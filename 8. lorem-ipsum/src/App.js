import React, { useState } from "react";
import data from "./data";
function App() {
  //count state for how many paragraphs i want to generate
  const [count, setCount] = useState(0);
  //text state for the array of those paragraphs
  const [text, setText] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //coverting string to int
    let amount = parseInt(count);
    if (count <= 0) {
      amount = 1;
    }
    //becz our data has max. 8 para
    if (count > 8) {
      amount = 8;
    }
    //setting the text state using settext function with the data from data.js (0,input given by user)
    setText(data.slice(0, amount));
  };
  return (
    <section className="section-center">
      <h3>tired of boring lorem ipsum?</h3>
      <form className="lorem-form" onSubmit={handleSubmit}>
        <label htmlFor="amount">paragraphs:</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={count}
          // changing the state of count and setting up as the input recieved
          onChange={(e) => setCount(e.target.value)}
        />
        <button className="btn">generate</button>
      </form>
      <article className="lorem-text">
        {/* iterate over the text array */}
        {text.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </article>
    </section>
  );
}

export default App;
