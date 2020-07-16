import React from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

export const Modal = ({ onClose, children }) => {
  const content = () => (
    <div className={'modal'}>
      <div onClick={onClose}>X</div>
      {children}
    </div>
  );

  return createPortal(content(), modalRoot);
};
