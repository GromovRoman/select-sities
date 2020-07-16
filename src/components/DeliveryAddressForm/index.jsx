import React, { useState, useMemo } from "react";
import { YMaps, withYMaps } from "react-yandex-maps";

// TODO: to add debounce

export const DeliveryAddressForm = () => {
  const [values, setValues] = useState({ address: "Начните вводить адрес" });

  const onChangeInput = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setValues({ ...values, [name]: value });
  };

  const content = useMemo(() => {
    return ({ ymaps }) => {
      let suggest = null;

      ymaps.load((mapInstance) => {
        suggest = new mapInstance.SuggestView("suggest");
      });
      return (
        <div>
          <div>Адрес доставки *</div>
          <input
            id={"suggest"}
            //name={"address"}
            type="text"
            //value={values.address}
            //onChange={onChangeInput}
          />
        </div>
      );
    };
  }, []);

  const Connected = useMemo(() => {
    return withYMaps(content, true);
  }, [content]);

  return (
    <YMaps>
      <Connected />
    </YMaps>
  );
};
