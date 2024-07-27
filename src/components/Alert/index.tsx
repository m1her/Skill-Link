import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck as success,
  faExclamationCircle as error,
  faInfoCircle as info,
  faWarning as warning,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface AlertTypes {
  message: string;
  type: "success" | "error" | "warning" | "info";
  onClose: () => void;
}

const iconMap: { [key in AlertTypes["type"]]: IconProp } = {
  success,
  error,
  warning,
  info,
};

export const Alert = ({ message, type = "info", onClose }: AlertTypes) => {
  let alertClass;

  switch (type) {
    case "success":
      alertClass = "bg-green-200 text-green-600";
      break;
    case "error":
      alertClass = "bg-red-100 text-red-500";
      break;
    case "warning":
      alertClass = "bg-yellow-100 text-yellow-500";
      break;
    default:
      alertClass = "bg-blue-100 text-blue-500";
  }
  const icon = iconMap[type];

  return (
    <div
      className={`text-sm p-4 rounded-sm ${alertClass} fixed z-50 top-4 right-4 flex items-center gap-x-2 w-fit`}
    >
      <FontAwesomeIcon icon={icon} className="w-3.5 h-3.5" />
      <span>{message}</span>
      <button onClick={onClose} className="flex items-center justify-center">
        <FontAwesomeIcon icon={faX} className="w-3 h-3 ml-4" />
      </button>
    </div>
  );
};
