const Input = ({ label, register, rules }) => (
  <>
    <label>{label}</label>
    <input {...register(label, rules)} />
  </>
);

export default Input;
