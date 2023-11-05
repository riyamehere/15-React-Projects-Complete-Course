import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

//refering the API
const url = "https://course-api.com/react-tours-project";

function App() {
  //states
  //by default loading will be true
  const [loading, setLoading] = useState(true);
  //tours states
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  //fetching the tours
  const fetchTours = async () => {
    setLoading(true);
    try {
      //passing the API url
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTours();
  }, []); //making sure useeffect runs only once
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  //if tours state array is empty
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    //passing props in Tours component
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
