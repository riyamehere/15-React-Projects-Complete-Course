import React from "react";
import { useGlobalContext } from "./context";
import { FaTimes } from "react-icons/fa";
const Modal = () => {
  const { isModalOpen, closeModal } = useGlobalContext();
  //importing useGlobalConetx form ./context
  return (
    <div
      //check if modalisopen
      className={`${
        isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container">
        <h3>modal content</h3>
        {/* modal close btn */}
        <button className="close-modal-btn" onClick={closeModal}>
          <FaTimes></FaTimes>
        </button>
      </div>
    </div>
  );
};

export default Modal;
