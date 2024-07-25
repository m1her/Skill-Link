"use client";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useState } from "react";

export const Search = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  return (
    <div className="flex justify-center w-full mt-12">
      <div className="md:w-2/3 w-2/3 bg-white/10 flex items-center justify-between md:px-4 px-3 md:py-2 py-1 border border-white/80 rounded-full">
        <input
          className="w-full text-white md:text-[15px] text-sm py-1 bg-transparent placeholder:text-white/80 focus:outline-none focus:ring-0 caret-white"
          id="search"
          name="seach"
          type="text"
          value={searchValue}
          placeholder="Search..."
          onChange={changeHandler}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white/80 md:w-4 w-3.5 md:h-4 h-3.5 cursor-pointer" />
      </div>
    </div>
  );
};
