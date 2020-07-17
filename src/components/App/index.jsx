import React, { useState } from "react";
import { YMaps, withYMaps } from "react-yandex-maps";

import { Modal } from "../Modal";
import { DeliveryAddressForm } from "../DeliveryAddressForm";

import styles from './index.scss';

function App() {
  const [isAddress, setAddress] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const hocWithYMaps = withYMaps(DeliveryAddressForm, true);

  return (
    <div className={styles.app}>
      <div className="content">
        {isAddress ? (
          <input type={"text"} />
        ) : (
          <button
            autoFocus
            onClick={() => {
              setIsModal(true);
            }}
          >
            Добавить адрес
          </button>
        )}
      </div>
      <div className="modal">
        {isModal && (
          <Modal onClose={() => setIsModal(false)}>
            <YMaps>
              {hocWithYMaps()}
            </YMaps>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default App;
