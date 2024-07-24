import React from "react";
import { Spinner } from "../Spinner";

export const Button = ({
  label,
  loading,
  type = "submit",
}: {
  label: string;
  loading?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
}) => {
  return (
    <button
      className="w-full flex items-center justify-center py-2 px-4 bg-[#0652e9] text-white font-semibold rounded cursor-pointer hover:bg-[#0447cd] transition-colors duration-300"
      type={type}
    >
      {loading ? <Spinner /> : label}
    </button>
  );
};
