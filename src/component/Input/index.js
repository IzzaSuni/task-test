import { useState } from "react";
import Text from "../Text";

export default function Input({
  label = "",
  type = "text",
  className = "",
  placeholder = "",
  onChange,
  width = "auto",
  style,
  min,
  max,
  name,
  value,
  shadow,
}) {
  const [isFocus, Focus] = useState(false);
  return (
    <>
      {label && (
        <Text size={"small"} style={{ marginTop: "16px" }} bold>
          {label}
        </Text>
      )}
      <div style={{ display: "flex" }}>
        <input
          style={{ width: width, ...style }}
          className={`input ${className}`}
          placeholder={placeholder}
          onChange={onChange}
          type={type}
          min={min}
          max={max}
          name={name}
          value={value}
          onFocus={() => Focus(true)}
          onBlur={() => Focus(false)}
          on
        />
        {shadow && (
          <Text
            color={isFocus ? "black" : " hsla(0, 0%, 25%, 0.5) "}
            className="shadow-text"
          >
            {!value ? "0" : value}%
          </Text>
        )}
      </div>
    </>
  );
}
