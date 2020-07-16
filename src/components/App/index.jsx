import React, { useState } from "react";

import { Modal } from "../Modal";
import { DeliveryAddressForm } from "../DeliveryAddressForm";

import "../Modal";

function App() {
  const [isAddress, setAddress] = useState(false);

  const [isModal, setIsModal] = useState(false);

  const content = (isAddress) =>
    isAddress ? (
      <input type={'text'}/>
    ) : (
      <button
        autoFocus
        onClick={() => {
          setIsModal(true);
        }}
      >
        Добавить адрес
      </button>
    );

  const modal = (isModal) =>
    isModal && (
      <Modal
        onClose={() => setIsModal(false)}
      >
        <DeliveryAddressForm />
      </Modal>
    );

  return (
    <div className="app">
      <div className="content">{content(isAddress)}</div>
      <div className="modal">{modal(isModal)}</div>
    </div>
  );
}

export default App;
