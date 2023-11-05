import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
const Question = ({ title, info }) => {
  //creating state namely showinfo
  const [showInfo, setShowInfo] = useState(false);
  return (
    <article className="question">
      <header>
        <h4>{title}</h4>
        {/* on clicking hte btn, set dhowinfo state as opposite of the prevstate i.e false if it was already true */}
        <button className="btn" onClick={() => setShowInfo(!showInfo)}>
          {/* if showinfo state is true then show minus icon,else plus icon */}
          {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </header>
      {/* if showinfo state is true, then only show the info */}
      {showInfo && <p>{info}</p>}
    </article>
  );
};

export default Question;
