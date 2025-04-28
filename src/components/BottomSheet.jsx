import { useEffect, useState } from "react";
import { QuantitySelector } from "./CartList";

const BottomSheet = ({ onClose, onSubmit, basePrice, name }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsOpen(true), 50);
  }, []);

  const toggleAddon = (addonName) => {
    setSelectedAddons((prev) =>
      prev.includes(addonName)
        ? prev.filter((item) => item !== addonName)
        : [...prev, addonName]
    );
  };

  const handleSubmit = () => {
    onSubmit({ quantity, selectedAddons });
  };

  const totalAddonPrice = selectedAddons.length * 20;
  const totalPrice = (basePrice + totalAddonPrice) * quantity;

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.7)] z-40 flex justify-center items-end"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full bg-primary rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto transform transition-all duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{name}</h2>
          <button onClick={handleClose} className="text-4xl">
            &times;
          </button>
        </div>

        {/* Addons */}
        <div className="mb-6">
          <h3 className="text-md font-medium mb-2">Choose Add-ons</h3>
          <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
            {["Extra Cheese", "Extra Mayo", "Paneer Burst"].map(
              (addon, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleAddon(addon)}
                  className={`flex justify-between items-center text-sm font-normal px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                    selectedAddons.includes(addon)
                      ? "bg-accent border-primary"
                      : "bg-secondary border-gray-700"
                  }`}
                >
                  <span>{addon}</span>
                  <span>+ ₹20</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Quantity and Add Button */}
        <div className="flex items-center justify-between mt-6">
          <QuantitySelector
            quantity={quantity}
            onDecrease={() => setQuantity((prev) => prev - 1)}
            onIncrease={() => setQuantity((prev) => prev + 1)}
          />

          <button
            onClick={handleSubmit}
            className="bg-accent text-white text-md px-6 py-3 rounded-2xl font-semibold"
          >
            Add Item | ₹ {totalPrice}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
