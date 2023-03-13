import { FC, InputHTMLAttributes } from "react";
import {
  FieldValues,
  RegisterOptions,
  useForm,
  UseFormRegister,
} from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  register: UseFormRegister<FieldValues>;
}
const Input: FC<InputProps> = ({ name, label, register }) => {
  return (
    <div className="input-wrapper flex w-full flex-col items-center gap-2 border-b-2 border-[#B4B4B4]">
      <label htmlFor={name} className="text-center lg:w-[700px]">
        {label}
      </label>
      <input
        id={name}
        className="text-center outline-none"
        {...register(name)}
        required
      />
    </div>
  );
};

export default Input;
