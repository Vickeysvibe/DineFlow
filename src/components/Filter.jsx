const Filter = ({ filter: current, change }) => {
  const filter = [
    {
      icon: "😋",
      name: "All",
    },
    {
      icon: "🍽️",
      name: "Starters",
    },
    {
      icon: "🍳",
      name: "Combos",
    },
    {
      icon: "🍨",
      name: "Deserts",
    },
  ];
  return (
    <div className="w-full flex mb-3.5 overflow-x-auto rounded-3xl">
      {filter.map((item, index) => (
        <div
          key={index}
          className={`${
            current === item.name ? "bg-accent" : "bg-secondary"
          } rounded-4xl flex p-[7px_15px] m-[0_5px]`}
          onClick={() => {
            change(item.name);
          }}
        >
          <h1 className="text-white text-sm font-bold ">{item.icon}</h1>
          <h1 className="text-white text-sm font-normal p-[0_5px]">
            {" "}
            {item.name}
          </h1>
        </div>
      ))}
    </div>
  );
};
export default Filter;
