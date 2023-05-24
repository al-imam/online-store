"use client";

import type { FunctionComponent, InputHTMLAttributes } from "react";
import useSingup from "@/store/useSingup";

interface InputProps {
  text: string;
  name: "name" | "password" | "email";
}

const Input: FunctionComponent<
  InputProps & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "name">
> = ({ text, name, ...rest }) => {
  const value = useSingup((store) => store[name]);
  const setValue = useSingup((store) => store[`${name}Set`]);

  return (
    <div className="mb-4">
      <label className="block mb-1"> {text} </label>
      <input
        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
        {...rest}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Input;
