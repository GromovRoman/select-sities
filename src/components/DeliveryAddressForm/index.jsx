import React from "react";
import { useState } from "react";

// TODO: to add debounce

export const DeliveryAddressForm = () => {
  const [values, setValues] = useState({address: "Начните вводить адрес",});

  const onChangeInput = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setValues({...values, [name]: value});
  }

  return (
    <div>
      <div>Адрес доставки *</div>
      <input name={"address"} type="text" value={values.address} onChange={onChangeInput}/>
    </div>
  );
};
