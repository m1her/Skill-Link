import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const NotificationItem = () => {
  return (
    <div className="w-full flex-shrink-0 h-16 bg-white border border-gray-200 rounded p-2 flex items-center gap-x-2">
      <div className="w-12 aspect-square bg-gray-300 rounded-full flex items-center justify-center">
        <FontAwesomeIcon icon={faBell} className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
};
