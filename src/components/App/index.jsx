import React, { useState } from "react";
import { YMaps, withYMaps } from "react-yandex-maps";

import { Modal } from "../Modal";
import { DeliveryAddressForm } from "../DeliveryAddressForm";

import styles from './index.module.scss';
import { useEffect } from "react";

function App() {
  const [address, setAddress] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const hocWithYMaps = withYMaps(DeliveryAddressForm, true);
  
  return (
    <div className={styles.app}>
      <div className="content">
        {address ? (
          <input type={"text"} value={address}/>
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
      {isModal && (
        <Modal contentWidth={'700px'} onClose={() => setIsModal(false)}>
          <YMaps>
            {hocWithYMaps()}
          </YMaps>
        </Modal>
      )}
    </div>
  );
}

export default App;
