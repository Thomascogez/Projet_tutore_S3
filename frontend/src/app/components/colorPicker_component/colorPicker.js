import React, { useState, useEffect } from "react";
import InputColor from "react-input-color";

export default function ColorPicker() {
  const [color, setColor] = useState({});
  useEffect(() => {
     console.log(color);
     
  }, [color])
  
  return (
    <div>
      <InputColor
        initialHexColor="#5e72e4"
        onChange={setColor}
        placement="right"
      />
      <div
        style={{
          width: 50,
          height: 50,
          marginTop: 20,
          backgroundColor: color.hex
        }}
      />
    </div>
  );
}
