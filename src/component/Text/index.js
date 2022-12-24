import PropTypes, { bool } from "prop-types"; // ES6

export default function Text({
  size,
  color,
  children,
  className = "",
  bold,
  style,
}) {
  return (
    <p
      className={`task-text task-text-${size} ${className}`}
      style={{ color: color, fontWeight: bold ? "bold" : "normal", ...style }}
    >
      {children}
    </p>
  );
}
