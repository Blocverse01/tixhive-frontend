const Label = ({ value, htmlFor }) => (
  <label
    className="text-[15px] md:text-[16px] font-[400] text-white leading-[34px]"
    htmlFor={htmlFor}
  >
    {value}
  </label>
);

export default Label;
