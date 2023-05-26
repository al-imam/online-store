"use client";

import type { FunctionComponent, InputHTMLAttributes } from "react";

interface InputProps {
  text: string;
  setValue: (value: string) => void;
}

const Input: FunctionComponent<
  InputProps & Omit<InputHTMLAttributes<HTMLInputElement>, "className">
> = ({ text, setValue, ...rest }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1"> {text} </label>
      <input
        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
        {...rest}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Input;
