# 🍽️ DineFlow

> _Where great meals meet effortless service._

DineFlow is a modern and intuitive table and order management system designed for restaurants, cafés, and hospitality businesses.  
It helps streamline dining operations — from managing tables and menus to creating smooth ordering experiences — all in a beautiful, responsive interface.

---

## 🚀 Features

- **Beautiful Dashboard**: Elegant UI for easy navigation.
- **Smooth Table Management**: Manage tables, reservations, and seatings effortlessly.
- **Order Handling**: Add, update, and customize orders with toppings, combos, and more.
- **Cart System**: View and adjust customer orders in a clean cart interface.
- **Quantity Management**: Intuitive plus/minus controls for order quantities.
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop.
- **Modern Animations**: Framer-motion powered transitions for a fluid user experience.
- **Custom Add-ons**: Customers can personalize their orders with selected toppings and extras.
- **Checkout Summary**: Clear breakdown of subtotal, taxes, and final total.

---

## 📦 Tech Stack

- **Frontend**: React.js + Tailwind CSS
- **State Management**: Zustand
- **Animation**: Framer Motion
- **Routing**: React Router
- **Icons**: Material-UI Icons
- **Design**: Tailored with responsive, mobile-first UI principles

---

## 📸 Screens Overview

| Screen        | Description                                          |
| :------------ | :--------------------------------------------------- |
| **Home**      | Browse categories like Starters, Combos, Desserts    |
| **Item List** | View menu items and add them to cart                 |
| **Cart**      | Modify order quantities, remove items, view subtotal |
| **Checkout**  | Final total with tax and checkout button             |

---

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/dineflow.git
   cd dineflow
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   npm run dev
   ```
   The app should now be running at [http://localhost:5173](http://localhost:5173)

---

## 🧩 Folder Structure

```
src/
├── assets/          # Images and background assets
├── components/      # Reusable UI components (Header, Filter, CartList, etc.)
├── pages/           # Screens like Home, Cart, Checkout
├── store/           # Zustand store for app-wide state
├── App.jsx          # Main app component
├── main.jsx         # Entry point
└── routes.jsx       # Route configurations
```

---

## ✨ Customization

- **Theme**: Modify colors and backgrounds easily in Tailwind config or directly in component classes.
- **Menu Items**: Add or modify menu categories and items dynamically in the Items component or through an API connection.
- **Toppings**: Customize toppings list by adjusting `selectedAddons` logic in the CartList component.

---

## ⚡ Upcoming Improvements

- Admin panel for menu management
- Real-time table occupancy tracking
- Customer feedback integration
- Light/Dark theme support
- API connection for live order syncing

---

## 🙌 Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you would like to change.

---

## ❤️ Made with love for restaurants and food lovers by Vibe

---
