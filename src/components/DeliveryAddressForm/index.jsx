import React, { useState, useEffect } from "react";

// TODO: to add debounce

export const DeliveryAddressForm = ({
  ymaps,
}) => {
  const [suggest, setSuggest] = useState(null);

  useEffect(() => {
    ymaps.load((mapInstance) => {
      setSuggest(new mapInstance.SuggestView("suggest"));
    });
  }, [ymaps]);

  const [values, setValues] = useState({ address: "Начните вводить адрес" });

  const onChangeInput = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setValues({ ...values, [name]: value });
  };
  
  return (
    <div>
      <div>Адрес доставки *</div>
      <input
        id={"suggest"}
        name={"address"}
        type="text"
        value={values.address}
        onChange={onChangeInput}
      />
    </div>
  );
};
