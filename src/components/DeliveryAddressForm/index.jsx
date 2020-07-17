import React, { useState, useEffect } from "react";

// TODO: to add debounce

export const DeliveryAddressForm = ({
  ymaps,
}) => {
  const [inputValue, setInputValues] = useState("Начните вводить адрес");

  const onChangeInput = (event) => {
    const value = event?.originalEvent?.item?.value || event?.target?.value;

    setInputValues(value);
  };
  useEffect(() => {
    ymaps.load((mapInstance) => {
      const suggest = new mapInstance.SuggestView("suggest");
      suggest.events.add('select', onChangeInput);
    });
  }, [ymaps]);

  return (
    <div>
      <div>Адрес доставки *</div>
      <input
        id={"suggest"}
        type="text"
        value={inputValue}
        onChange={onChangeInput}
      />
    </div>
  );
};
