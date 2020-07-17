import React, { useRef }  from "react";
import { createPortal, findDOMNode } from "react-dom";

import styles from "./index.module.scss";

const modalRoot = document.getElementById("modal");

export const Modal = ({ onClose, children }) => {
  const ref = useRef();

  const handleClickOutside = (event) =>  {
    const domNode = findDOMNode(ref.current);

    if ((!domNode || !domNode.contains(event.target))) {
      onClose();
    }
  }
  const content = () => (
    <div  className={styles.modal} >
      <div  className={styles.content} onClick={handleClickOutside}>
        <div className={styles.close}>
          X
        </div>
        <div ref={ref}>
          {children}
        </div>
      </div>
    </div>
  );
  return createPortal(content(), modalRoot);
};
