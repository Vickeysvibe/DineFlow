import { memo } from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import useAppStore from "../store/useAppStore";

export const QuantitySelector = ({ quantity = 1, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center gap-2">
      {/* Decrease Button */}
      <button
        onClick={onDecrease}
        className="w-8 h-8 bg-[#414141] rounded-xl flex items-center justify-center"
      >
        <div className="w-4 h-[2px] bg-white"></div>
      </button>

      {/* Quantity Number */}
      <div className="text-white font-semibold text-base">{quantity}</div>

      {/* Increase Button */}
      <button
        onClick={onIncrease}
        className="w-8 h-8 bg-[#414141] rounded-xl flex items-center justify-center relative"
      >
        <div className="w-4 h-4 relative">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white transform -translate-y-1/2"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white transform -translate-x-1/2"></div>
        </div>
      </button>
    </div>
  );
};

const CartList = memo(
  ({
    name,
    price,
    pic,
    qty,
    prepTime,
    nos,
    selectedAddons: addons,
    compType,
  }) => {
    const removeFromCart = useAppStore((state) => state.removeFromCart);
    const update = useAppStore((state) => state.updateCart);

    const remove = () => removeFromCart(name);

    return (
      <div className="flex w-full bg-secondary rounded-2xl overflow-hidden shadow-md">
        {/* Image */}
        <div className="w-32 h-36 flex-shrink-0 relative">
          <img
            src={pic}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 justify-between">
          {/* Top */}
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-md font-semibold truncate pr-2">{name}</h1>
              {compType !== "order" && (
                <button onClick={remove}>
                  <ClearRoundedIcon
                    fontSize="small"
                    className="text-gray-400"
                  />
                </button>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {qty} | {prepTime}
            </p>
          </div>

          {/* Bottom */}
          <div className="flex justify-between items-center">
            {compType !== "order" ? (
              <QuantitySelector
                quantity={nos}
                onDecrease={() => update(name, nos - 1)}
                onIncrease={() => update(name, nos + 1)}
              />
            ) : (
              <div />
            )}
            <span className="text-white font-bold text-md">
              ${(price * nos).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

CartList.displayName = "CartList";
export default CartList;
