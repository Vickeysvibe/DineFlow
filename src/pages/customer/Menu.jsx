import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "../../components/SplashScreen";
import Header from "../../components/Header";
import Items from "../../components/Items";
import BelowArea from "../../components/BelowArea";
import Filter from "../../components/Filter";
import { motion, useAnimation } from "framer-motion";
import useAppStore from "../../store/useAppStore";

const Menu = () => {
  const [isReady, setIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [filter, setFilter] = useState("All");
  const fakeFoodData = useAppStore((state) => state.fakeFoodData);
  const cart = useAppStore((state) => state.cart);

  const [filteredData, setFilteredData] = useState(fakeFoodData);

  useEffect(() => {
    const lastVisit = localStorage.getItem("lastVisitTime");
    const now = new Date().getTime();

    const cooldownTime = 1 * 60 * 60 * 1000; // 1 hour cooldown (in milliseconds)
    // if you want 24 hours cooldown, use: 24 * 60 * 60 * 1000

    if (!lastVisit || now - parseInt(lastVisit) > cooldownTime) {
      setShowSplash(true); // Show splash if it has been more than cooldown time or first time
    } else {
      setShowSplash(false); // Don't show splash if within cooldown
    }
  }, []); // Runs only once on page load

  useEffect(() => {
    if (!fakeFoodData || fakeFoodData.length === 0) return;

    const preloadAssets = async () => {
      // Preload food images
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

      // Preload background images
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
  }, [fakeFoodData]); // <-- 🔁 rerun when data becomes available

  useEffect(() => {
    setFilteredData(
      filter === "All"
        ? fakeFoodData
        : fakeFoodData.filter((item) => item.category === filter)
    );
  }, [filter, fakeFoodData]); // <-- ✅ Add this

  const handleSplashComplete = () => {
    setShowSplash(false);
    localStorage.setItem("lastVisitTime", new Date().getTime().toString()); // Save the current time
  };
  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      {/* Splash Screen - rendered simultaneously with menu */}
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={handleSplashComplete} isReady={isReady} />
        )}
      </AnimatePresence>

      {/* Menu Content - always rendered but hidden initially */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: showSplash ? 0 : 1,
          transition: { delay: 0.2 }, // Slight delay for smoother transition
        }}
      >
        <div className="bg-[url('/src/assets/bg.png')] h-full w-full bg-contain bg-center flex flex-col">
          <Header title={"Menu"} back={false} />
          <div className="bg-primary flex-1 rounded-t-4xl w-full p-3.5 overflow-hidden drop-shadow-2xl drop-shadow-black">
            <Filter filter={filter} change={setFilter} />
            <div className="h-full overflow-y-scroll rounded-t-4xl">
              {filteredData?.map((item, index) => (
                <Items key={`${item.name}-${index}`} {...item} />
              ))}
              <div className={`${cart.length > 0 ? "h-32" : "h-15"}`} />
            </div>
          </div>
          {cart.length > 0 && <BelowArea items={cart.length} />}
        </div>
      </motion.div>
    </div>
  );
};

export default Menu;
