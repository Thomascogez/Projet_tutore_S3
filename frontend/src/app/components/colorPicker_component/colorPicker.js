import React, { useState, useEffect } from "react";
import InputColor from "react-input-color";

export default function ColorPicker({initColor}) {
  const [color, setColor] = useState({});
  useEffect(() => {
     console.log(color);
     
  }, [color])
  
  return (
    <div>
      <InputColor
        initialHexColor={initColor}
        onChange={setColor}
        placement="right"
      />
      
    </div>
  );
}
