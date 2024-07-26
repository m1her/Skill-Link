import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Footer = () => {
  return (
    <div className="px-16 py-8 bg-[#04389e]">
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-x-2 text-white text-xs md:ml-0 -ml-6">
            <FontAwesomeIcon icon={faCopyright} className="w-3 aspect-square" />
            <div>2024 SKILL LINK</div>
          </div>
          <div className="flex items-start text-sm text-white">
            Built by{" "}
            <span className="font-semibold text-[#62e1e9] ml-1">Maher.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
