import { checkPropTypes } from "prop-types";

export default function Button({
  children,
  type = "primary",
  icon,
  style,
  className,
  buttonStyle,
  onClick,
  submit,
}) {
  return (
    <button
      onClick={onClick}
      className={`button button-${type} ${className}`}
      style={{ ...style }}
      type={submit ? "submit" : "button"}
    >
      {icon && (
        <img
          src={`/assets/${icon}`}
          style={{ ...buttonStyle }}
          className="button-icon"
        />
      )}
      {children}
    </button>
  );
}
