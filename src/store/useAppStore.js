import { create } from "zustand";

const useAppStore = create((set, get) => ({
  tableNumber: null,
  cart: [],
  fakeFoodData: [
    {
      name: "Margherita Pizza",
      pic: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&auto=format&fit=crop",
      price: 12.99,
      qty: "10 inch",
      category: "Combos",
      prepTime: "20-25 mins",
      description: "Classic pizza with tomato sauce, mozzarella, and basil",
      type: "veg",
    },
    {
      name: "Beef Burger Combo",
      pic: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop",
      price: 14.99,
      qty: "300g + fries",
      category: "Combos",
      prepTime: "15-20 mins",
      description: "Juicy beef patty with cheese, lettuce, and special sauce",
      type: "nonveg",
    },
    {
      name: "Chicken Tacos",
      pic: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&auto=format&fit=crop",
      price: 8.5,
      qty: "3 pieces",
      category: "Starters",
      prepTime: "10-15 mins",
      description: "Soft tortillas with grilled chicken and fresh toppings",
      type: "nonveg",
    },
    {
      name: "Caesar Salad",
      pic: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&auto=format&fit=crop",
      price: 7.95,
      qty: "350g",
      category: "Starters",
      prepTime: "8-10 mins",
      description: "Romaine lettuce, croutons, parmesan with Caesar dressing",
      type: "veg",
    },
    {
      name: "Sushi Platter",
      pic: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&auto=format&fit=crop",
      price: 18.75,
      qty: "12 pieces",
      category: "Combos",
      prepTime: "15 mins",
      description: "Assorted fresh sushi with wasabi and soy sauce",
      type: "nonveg",
    },
    {
      name: "Chocolate Brownie Sundae",
      pic: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&auto=format&fit=crop",
      price: 6.5,
      qty: "250g",
      category: "Desserts",
      prepTime: "5 mins",
      description: "Warm chocolate brownie with vanilla ice cream",
      type: "veg",
    },
    {
      name: "Garlic Bread Starter",
      pic: "https://images.unsplash.com/photo-1586816001966-79b736744398?w=400&auto=format&fit=crop",
      price: 4.95,
      qty: "6 pieces",
      category: "Starters",
      prepTime: "8 mins",
      description: "Toasted bread with garlic butter and herbs",
      type: "nonveg",
    },
    {
      name: "Pad Thai Combo",
      pic: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&auto=format&fit=crop",
      price: 13.5,
      qty: "400g + spring roll",
      category: "Combos",
      prepTime: "18-22 mins",
      description: "Stir-fried rice noodles with eggs, tofu and peanuts",
      type: "nonveg",
    },
    {
      name: "Tiramisu",
      pic: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&auto=format&fit=crop",
      price: 7.25,
      qty: "200g",
      category: "Desserts",
      prepTime: "5 mins",
      description: "Classic Italian dessert with coffee flavor",
      type: "nonveg",
    },
    {
      name: "Mozzarella Sticks",
      pic: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&auto=format&fit=crop",
      price: 6.75,
      qty: "8 pieces",
      category: "Starters",
      prepTime: "12 mins",
      description: "Breaded mozzarella cheese sticks with marinara sauce",
      type: "veg",
    },
    {
      name: "Chocolate Lava Cake",
      pic: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=400&auto=format&fit=crop",
      price: 6.95,
      qty: "180g",
      category: "Desserts",
      prepTime: "8 mins",
      description: "Warm chocolate cake with molten center and ice cream",
      type: "nonveg",
    },
    {
      name: "Chicken Wings Platter",
      pic: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&auto=format&fit=crop",
      price: 9.99,
      qty: "10 pieces",
      category: "Starters",
      prepTime: "15-18 mins",
      description: "Crispy fried wings with your choice of sauce",
      type: "veg",
    },
    {
      name: "Family Pizza Combo",
      pic: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=400&auto=format&fit=crop",
      price: 24.99,
      qty: "16 inch + 4 drinks",
      category: "Combos",
      prepTime: "25-30 mins",
      description: "Large pizza with 4 toppings of your choice",
      type: "nonveg",
    },
    {
      name: "Cheesecake Slice",
      pic: "https://images.unsplash.com/photo-1578775887804-699de7086ff9?w=400&auto=format&fit=crop",
      price: 5.5,
      qty: "150g",
      category: "Desserts",
      prepTime: "5 mins",
      description: "Creamy New York style cheesecake with berry compote",
      type: "veg",
    },
  ],

  // Setter for table number
  setTableNumber: (number) => set({ tableNumber: number }),

  // Cart management
  addToCart: (item) =>
    set((state) => ({
      cart: [...state.cart, item],
    })),

  isInCart: (name) => {
    return get().cart.some((item) => item.name === name);
  },

  removeFromCart: (name) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.name !== name),
    })),

  updateCart: (name, qty) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.name === name ? { ...item, nos: qty } : item
      ),
    })),

  getCartTotal: () =>
    get().cart.reduce((total, item) => total + item.price * item.nos, 0),

  clearCart: () => set({ cart: [] }),
}));

export default useAppStore;
