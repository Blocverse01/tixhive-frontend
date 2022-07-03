import React from "react";
import Label from "./Label";
import ValidationError from "./ValidationError";
import useWatchHandleChange from "hooks/useWatchHandleChange";

export default function InputField({
  label,
  name,
  placeholder,
  type,
  error,
  register,
  rules,
  value,
  onChange,
  watch,
}) {
  useWatchHandleChange(name, watch, onChange);
  return (
    <div className="text-[15px] md:text-[18px] font-[400] text-white leading-[30px]">
      {label && <Label value={label} htmlFor={name} />}{" "}
      {register ? (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          {...register(name, rules)}
          className="w-full pt-2 pb-1 text-white bg-transparent input focus:outline-none focus:border-gray-500"
          placeholder={placeholder}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full pt-2 pb-1 text-white bg-transparent input focus:outline-none focus:border-gray-500"
          placeholder={placeholder}
        />
      )}
      {error && <ValidationError message={error.message} />}
    </div>
  );
}
