import { memo } from "react";
import AddButton from "./AddButton";
import useAppStore from "../store/useAppStore";
import veg from "../assets/veg.svg";
import nonveg from "../assets/nonveg.svg";

const Items = memo(({ name, price, pic, qty, prepTime, type, openPopup }) => {
  const cart = useAppStore((state) => state.cart);
  const alreadyInCart = cart.some((item) => item.name === name);

  const removeFromCart = useAppStore((state) => state.removeFromCart);

  const handleAddButtonClick = () => {
    if (alreadyInCart) {
      removeFromCart(name);
    } else {
      openPopup({ name, price, pic, qty, prepTime });
    }
  };

  return (
    <div className="w-full bg-secondary rounded-2xl overflow-hidden mb-3 shadow-sm transition-all duration-300">
      {/* Main Item */}
      <div className="flex h-[100px] sm:h-[120px] md:h-[130px]">
        {/* Image */}
        <div className="w-24 sm:w-28 md:w-32 h-full flex-shrink-0 relative">
          <img
            src={pic}
            alt={name}
            className="w-full h-full object-cover rounded-l-2xl"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex-grow p-3 pl-4 sm:p-4 flex flex-col overflow-hidden">
          {/* Top Row */}
          <div className="flex justify-between items-center">
            <h1
              className="truncate pr-2"
              style={{ fontSize: "var(--text-md)", fontWeight: 600 }}
            >
              {name}
            </h1>
            <img
              src={type === "veg" ? veg : nonveg}
              alt="veg"
              className="w-6 h-6 mr-2"
            />
          </div>

          {/* Qty and PrepTime */}
          <div
            className="mt-0.5"
            style={{ fontSize: "var(--text-xs)", color: "#b0b0b0" }}
          >
            {qty} | {prepTime}
          </div>

          {/* Price and Add Button */}
          <div className="flex justify-between items-center mt-auto">
            <span style={{ fontSize: "var(--text-md)", fontWeight: 600 }}>
              ₹ {price.toFixed(2)}
            </span>
            <AddButton
              onClick={handleAddButtonClick}
              isInCart={alreadyInCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

Items.displayName = "Items";
export default Items;
