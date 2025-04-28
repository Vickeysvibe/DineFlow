const AddButton = ({ onClick, isInCart }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        isInCart ? "bg-[#e5202025] border-[1px] border-accent" : "bg-accent"
      } p-[6px_14px] sm:p-[8px_18px] rounded-[8px] flex items-center justify-center`}
    >
      <h1
        className="text-white font-semibold"
        style={{ fontSize: "var(--text-sm)" }}
      >
        {isInCart ? "Added" : "Add"}
      </h1>
    </button>
  );
};

export default AddButton;
