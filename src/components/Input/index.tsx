import { useState, ChangeEvent, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";

interface TextInputTypes {
  id?: string;
  name?: string;
  type?: string;
  label?: string;
  labelStyle?: string;
  inputBoxStyle?: string;
  placeholder?: string;
  value?: string | number | readonly string[];
  defaultValue?: string;
  error?: boolean | string;
  errorMsg?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  maxLength?: number;
  tagBackgroundColor?: string;
}

export const TextInput = ({
  id,
  name = "textInput",
  type = "text",
  label = "Text label",
  labelStyle = "",
  inputBoxStyle = "",
  value = "",
  placeholder = "Enter value",
  error,
  errorMsg,
  onChange = () => {},
  autoFocus,
  disabled = false,
  defaultValue,
  maxLength,
  tagBackgroundColor,
}: TextInputTypes) => {
  const [hide, setHide] = useState(false);
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className={`text-sm ${labelStyle}`}>
        {label}
      </label>
      <div
        className={`input-text-container ${inputBoxStyle}`}
      >

        {type === "password" && (
          <>
            <FontAwesomeIcon
              onClick={() => setHide(!hide)}
              className={`cursor-pointer absolute rtl:left-5 rtl:right-auto right-5 top-3 w-4 ${
                error ? "text-failure-color opacity-100" : ""
              }${!hide ? "opacity-30" : ""}`}
              icon={hide ? faEye : faEyeSlash}
            />
          </>
        )}

        <input
          autoFocus={autoFocus}
          autoComplete="off"
          id={id}
          name={name}
          type={!hide ? type : "text"}
          value={value}
          className="input-tag"
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          defaultValue={defaultValue}
          maxLength={maxLength}
        />
        {error && (
          <div className="input-error-msg">
            <FontAwesomeIcon icon={faCircleXmark} />
            <span className="text-[0.8rem] font-normal">{errorMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
};
