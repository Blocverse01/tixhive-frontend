import { useState } from "react";

export default function OptionModal({ toggle, options }) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <button onClick={() => setVisible(!visible)}>{toggle}</button>
      <div
        onMouseLeave={() => setVisible(false)}
        className={`absolute mt-8 right-0 grid grid-cols-1 z-50 divide-y divide-white option-modal transition-all ease-in-out overflow-y-hidden ${
          visible ? "h-auto" : "h-0 hidden"
        }`}
      >
        {options}
      </div>
    </div>
  );
}
