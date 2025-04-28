const CustomButton = ({ title, onClick, style = {}, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full h-14 rounded-2xl bg-accent text-white font-semibold text-md tracking-wide active:scale-95 transition-transform ${className}`}
      style={style}
    >
      {title}
    </button>
  );
};

export default CustomButton;
