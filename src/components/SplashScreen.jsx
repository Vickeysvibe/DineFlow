import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import animate from "../assets/anime.gif";

const SplashScreen = ({ onComplete }) => {
  const [contentLoaded, setContentLoaded] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Preload all necessary assets
    const preloadAssets = async () => {
      try {
        const assets = [
          "/src/assets/bg.png",
          "/src/assets/backlight.png",
          animate,
          // Add other critical assets here
        ];

        await Promise.all(
          assets.map((asset) => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.src = asset;
              img.onload = resolve;
              img.onerror = resolve; // Continue even if some assets fail
            });
          })
        );

        setContentLoaded(true);
      } catch (error) {
        console.error("Error preloading assets:", error);
        setContentLoaded(true); // Continue anyway
      }
    };

    preloadAssets();
  }, []);

  useEffect(() => {
    if (contentLoaded) {
      // Start the exit animation sequence
      controls.start({
        opacity: [1, 1, 0],
        transition: {
          duration: 2.5,
          ease: "easeInOut",
          times: [0, 0.8, 1],
          onComplete: onComplete,
        },
      });
    }
  }, [contentLoaded, controls, onComplete]);

  return (
    <motion.div
      className="bg-primary flex flex-col h-[100dvh] w-full relative font-actual overflow-hidden"
      initial={{ opacity: 1 }}
      animate={controls}
      exit={{ opacity: 0 }}
    >
      {/* Background layers */}
      {/* <div className="absolute inset-0 bg-[url('/src/assets/bg.png')] bg-cover bg-center z-0" /> */}
      <div className="absolute inset-0 bg-[url('/src/assets/backlight.png')] bg-cover bg-center z-0 mb-80" />

      {/* Pan Image Animation */}
      <motion.img
        src={animate}
        alt="Animate"
        className="z-10 h-full object-cover drop-shadow-[10px_10px_4px_rgba(0,0,0,0.7)]"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 10,
          duration: 1.2,
        }}
      />

      {/* Text Animation */}
      <motion.div
        className="z-10 w-full h-full flex flex-col justify-center items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-xl font-bold text-white p-10">RestoBar</h1>
        <p className="text-lg font-normal text-white text-center">
          Where every meal feels <br /> like heaven
        </p>

        {/* Optional loading indicator */}
        {!contentLoaded && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
