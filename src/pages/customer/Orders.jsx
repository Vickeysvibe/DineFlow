import { motion } from "framer-motion";
import useAppStore from "../../store/useAppStore";
import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";
import CartList from "../../components/CartList";
import chef from "../../assets/chef.gif";
import chefs from "../../assets/chefs.gif";
import serve from "../../assets/serve.gif";
import empty from "../../assets/empty.gif";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const cart = useAppStore((state) => state.cart);
  const cartF = useAppStore((state) => state.getCartTotal);
  const cartTotal = cartF();

  const navigate = useNavigate();

  return (
    <div className="relative min-h-[100dvh] w-full bg-primary overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2 } }}
      >
        <div className="bg-[url('/src/assets/bg.png')] h-full w-full bg-cover bg-center flex flex-col">
          <Header title="Orders" />

          {/* Cart Items */}
          <div className="flex-1 bg-primary rounded-t-4xl p-4">
            <div
              className={`${
                cart.length > 0 ? "h-[60dvh]" : "h-full"
              } overflow-y-auto space-y-4 pr-1 no-scrollbar rounded-3xl`}
            >
              {cart?.length > 0 ? (
                cart.map((item, index) => (
                  <CartList
                    key={`${item.name}-${index}`}
                    {...item}
                    compType="order"
                  />
                ))
              ) : (
                <div className="text-white text-center mt-20 text-lg font-semibold">
                  <h1>You have'nt ordered anything yet 😔</h1>
                  <img src={empty} alt="something" className="my-20 w-full" />
                  <CustomButton
                    title="Order now"
                    style={{ width: "80%" }}
                    onClick={() => {
                      navigate("/");
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Checkout */}
          {cart.length > 0 && (
            <div className="bg-primary p-4 space-y-4 h-[40dvh] flex flex-col justify-between">
              <div className="flex justify-between items-center px-3">
                <div className="space-y-3 text-white text-md w-3/5">
                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span>Sub-Total</span>
                    <span>$ {cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span>GST</span>
                    <span>$ 10</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>$ {(cartTotal + 10).toFixed(2)}</span>
                  </div>
                </div>
                <div className="w-2/5 h-full flex items-center justify-end">
                  <img src={chef} alt="chef" className="h-36 object-cover" />
                </div>
              </div>

              <div className="flex gap-4">
                <CustomButton
                  title="Order more"
                  style={{ backgroundColor: "#292929" }}
                  onClick={() => navigate("/")}
                />
                <CustomButton title="Bill up" onClick={() => navigate("/")} />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Orders;
