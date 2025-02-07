function Button({
  label = "Click Me",
  onClick = () => {},
  className = "",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`!bg-blue-600 font-bold !text-black px-4 py-2 rounded-lg hover:!bg-blue-700 transition ${className}`}
    >
      {label}
    </button>
  );
}

export default Button;
