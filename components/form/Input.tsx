import type { FunctionComponent, InputHTMLAttributes } from "react";

interface InputProps {
  text: string;
}

const Input: FunctionComponent<
  InputProps & Omit<InputHTMLAttributes<HTMLInputElement>, "className">
> = ({ text, ...rest }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1"> {text} </label>
      <input
        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
        {...rest}
      />
    </div>
  );
};

export default Input;
