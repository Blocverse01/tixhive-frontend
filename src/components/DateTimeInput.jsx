import React from "react";
import Label from "./Label";
import ValidationError from "./ValidationError";
import useWatchHandleChange from "hooks/useWatchHandleChange";

export default function DateTimeInputField({
  label,
  name,
  type,
  error,
  register,
  rules,
  value,
  onChange,
  watch,
}) {
  useWatchHandleChange(name, watch, onChange);
  const inputClasses =
    "w-full create-event-gradient text-[12px] px-2 sm:text-[16px] text-white uppercase";
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
          className={inputClasses}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={inputClasses}
        />
      )}
      {error && <ValidationError message={error.message} />}
    </div>
  );
}
