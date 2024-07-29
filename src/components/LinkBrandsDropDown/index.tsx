"use client";
import React, { ChangeEvent } from "react";

const options = [
  { value: "YouTube", label: "YouTube" },
  { value: "Discord", label: "Discord" },
  { value: "Zoom", label: "Zoom" },
  { value: "Google Meets", label: "Google Meets" },
];

const LinkBrandsDropDown = ({
  changeHandler,
  value,
}: {
  changeHandler: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}) => {
  return (
    <div className="w-full flex flex-col">
      <label className="text-sm" htmlFor="platform">
        Choose Platform
      </label>
      <select
        id="platform"
        value={value}
        name="linkBrand"
        onChange={changeHandler}
        className="w-full text-sm bg-white border border-gray-400 hover:border-gray-500 px-4 py-[9px] rounded shadow focus:outline-none focus:shadow-outline"
      >
        {options.map((option, idx) => (
          <option
            className="font-mono"
            key={idx}
            value={option.value}
            defaultValue={options[idx].value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LinkBrandsDropDown;
