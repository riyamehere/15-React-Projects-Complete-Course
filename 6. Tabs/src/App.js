import React, { useState, useEffect } from "react";
//importing the react icons
import { FaAngleDoubleRight } from "react-icons/fa";
// getting the api from url
const url = "https://course-api.com/react-tabs-project";
function App() {
  //laoding state
  const [loading, setLoading] = useState(true);
  //jobs array as empty array
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  //fetching jobs
  const fetchJobs = async () => {
    //fetching the APi
    const reponse = await fetch(url);
    const newJobs = await reponse.json();
    //setting the jobs array to newjobs
    setJobs(newJobs);
    //setloading as false as soon as the jobs are fetched
    setLoading(false);
  };
  useEffect(() => {
    fetchJobs();
  }, []); //just run this one time
  if (loading) {
    //if loading is true
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    );
  }
  //taking th values from the api
  const { company, dates, duties, title } = jobs[value];
  return (
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* btn container */}
        {/* iterate over jobs and for every jobs display a specific button */}
        <div className="btn-container">
          {jobs.map((item, index) => {
            return (
              <button
                key={item.id}
                onClick={() => setValue(index)}
                // means the contents will change on the click of the that particular company
                //if the index of the button matches the current state value then adding the active-btn class
                className={`job-btn ${index === value && "active-btn"}`}
              >
                {item.company}
              </button>
            );
          })}
        </div>
        {/* job info */}
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {/* iterating over duties */}
          {duties.map((duty, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </div>
      <button type="button" className="btn">
        more info
      </button>
    </section>
  );
}

export default App;
