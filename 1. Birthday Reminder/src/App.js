import React, { useState } from "react";
import data from "./data";
import List from "./List";
function App() {
  //create react state
  //passing the data as the value to states
  const [people, setPeople] = useState(data);
  return (
    <main>
      <section className="container">
        {/* counting the length of people array */}
        <h3>{people.length} birthdays today</h3>
        {/* passing people array state as the prop to List component */}
        <List people={people} />
        {/* after clicking clear all button, setting the people array as empty */}
        <button onClick={() => setPeople([])}>clear all</button>
      </section>
    </main>
  );
}

export default App;
