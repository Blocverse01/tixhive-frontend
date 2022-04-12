import React from "react";
import Label from "./Label";

const InputField = ({ value, label, name, placeholder, type, onChange }) => (
  <div className="text-[18px] font-[400] text-white leading-[30px]">
    {label && <Label value={label} htmlFor={name} />}
    <input
      id={name}
      type={type}
      value={value}
      name={name}
      className="input pt-2 pb-1 focus:outline-none focus:border-gray-500 text-white w-full bg-transparent"
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

export default InputField;
