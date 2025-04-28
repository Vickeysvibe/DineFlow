import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "../../components/SplashScreen";
import Header from "../../components/Header";
import Items from "../../components/Items";
import BelowArea from "../../components/BelowArea";
import Filter from "../../components/Filter";
import { motion } from "framer-motion";
import useAppStore from "../../store/useAppStore";
import BottomSheet from "../../components/BottomSheet";

const Menu = () => {
  const [isReady, setIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [filter, setFilter] = useState("All");
  const [popupItem, setPopupItem] = useState(null);

  const fakeFoodData = useAppStore((state) => state.fakeFoodData);
  const cart = useAppStore((state) => state.cart);
  const addToCart = useAppStore((state) => state.addToCart);

  const [filteredData, setFilteredData] = useState(fakeFoodData);

  useEffect(() => {
    const lastVisit = localStorage.getItem("lastVisitTime");
    const now = new Date().getTime();
    const cooldownTime = 1 * 60 * 60 * 1000; // 1 hour cooldown

    if (!lastVisit || now - parseInt(lastVisit) > cooldownTime) {
      setShowSplash(true);
    } else {
      setShowSplash(false);
    }
  }, []);

  useEffect(() => {
    if (!fakeFoodData || fakeFoodData.length === 0) return;

    const preloadAssets = async () => {
      await Promise.all(
        fakeFoodData.map((item) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = item.pic;
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      );

      await Promise.all(
        ["/src/assets/bg.png", "/src/assets/backlight.png"].map((src) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      );

      setIsReady(true);
    };

    preloadAssets();
  }, [fakeFoodData]);

  useEffect(() => {
    setFilteredData(
      filter === "All"
        ? fakeFoodData
        : fakeFoodData.filter((item) => item.category === filter)
    );
  }, [filter, fakeFoodData]);

  const handleSplashComplete = () => {
    setShowSplash(false);
    localStorage.setItem("lastVisitTime", new Date().getTime().toString());
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={handleSplashComplete} isReady={isReady} />
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: showSplash ? 0 : 1,
          transition: { delay: 0.2 },
        }}
      >
        <div className="bg-[url('/src/assets/bg.png')] h-full w-full bg-contain bg-center flex flex-col">
          <Header title={"Menu"} back={false} />
          <div className="bg-primary flex-1 rounded-t-4xl w-full p-3.5 overflow-hidden drop-shadow-2xl drop-shadow-black">
            <Filter filter={filter} change={setFilter} />
            <div className="h-full overflow-y-scroll rounded-t-4xl">
              {filteredData?.map((item, index) => (
                <Items
                  key={`${item.name}-${index}`}
                  {...item}
                  openPopup={setPopupItem}
                />
              ))}
              <div className={`${cart.length > 0 ? "h-32" : "h-15"}`} />
            </div>
          </div>

          {/* BelowArea stays always below */}
          {cart.length > 0 && <BelowArea items={cart.length} />}

          {/* Global BottomSheet above BelowArea */}
          {popupItem && (
            <BottomSheet
              onClose={() => setPopupItem(null)}
              onSubmit={(data) => {
                addToCart({
                  name: popupItem.name,
                  price: popupItem.price,
                  pic: popupItem.pic,
                  qty: popupItem.qty,
                  prepTime: popupItem.prepTime,
                  nos: data.quantity,
                  selectedAddons: data.selectedAddons,
                });
                setPopupItem(null);
              }}
              basePrice={popupItem.price}
              name={popupItem.name}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Menu;
