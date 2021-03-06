import React, { useState, useEffect } from "react";
import { debounce } from 'lodash';

import styles from "./index.module.scss";

export const DeliveryAddressForm = ({ ymaps, onClose, onSetAddres }) => {
  const inputText = "Начните вводить адрес";
  const [inputValue, setInputValues] = useState(inputText);
  const [errorText, setErrorText] = useState(null);

  const onValidate = (value) => {
    const arrData = value.split(",");

    if (arrData < 4 || !/\d/.test(arrData[arrData.length - 1]))
      setErrorText(
        "введите адрс так, чтобы в нем были указаны: страна, город, улица, дом"
      );
    else setErrorText(null);
  };

  const onValidateDebounce = debounce(onValidate, 350);

  const onChangeInput = (event) => {
    const value = event?.originalEvent
      ? event.get("item").value
      : event?.target?.value;

    onValidateDebounce(value);

    setInputValues(value);
  };

  useEffect(() => {
    ymaps.load((mapInstance) => {
      const suggest = new mapInstance.SuggestView("suggest");
      suggest.events.add("select", onChangeInput);
    });
  }, [ymaps]);

  const showBtn = () =>
    inputValue !== inputText &&
    inputValue !== "" &&
    !errorText && <button onClick={() => onSave(inputValue)}>сохранить</button>;

  const getStorageDeliveryAddress = () => {
    return JSON.parse(localStorage.getItem("deliveryAddress")) || null;
  };

  const onSave = async (value) => {
    const arrData = value.split(",");
    const deliveryAddress = getStorageDeliveryAddress();

    if (
      !deliveryAddress ||
      !deliveryAddress.find((address) => address === value)
    )
      localStorage.setItem(
        "deliveryAddress",
        JSON.stringify(deliveryAddress ? [...deliveryAddress, value] : [value])
      );

    onClose();
    onSetAddres(value)

    const dataPattern = {
      value: value,
      lat: "",
      long: "",
      country: arrData[0],
      city: arrData[1],
      street: arrData[2],
      home: arrData[3],
    };

    let response = await fetch("/test", {
      method: "POST",
      body: JSON.stringify(dataPattern),
    });
  };

  const showAddresFromStorage = () => {
    const address = getStorageDeliveryAddress();
    if (!address?.length) return;

    return (
      <div>
        <p>Ранее используемые адреса:</p>
        <div>
          {address.map((address) => (
            <p
              key={address}
              onClick={() => setInputValues(address)}
              className={styles.prevAddress}
            >
              {address}
            </p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.content}>
      <div className={styles.title}>Адрес доставки *</div>
      <p className={styles.error}>{errorText}</p>
      <input
        className={styles.input}
        id={"suggest"}
        type="text"
        value={inputValue}
        onChange={onChangeInput}
        onClick={() => {
          if (inputValue === inputText) setInputValues("");
        }}
      />
      {inputValue === inputText && showAddresFromStorage()}
      {showBtn()}
    </div>
  );
};
