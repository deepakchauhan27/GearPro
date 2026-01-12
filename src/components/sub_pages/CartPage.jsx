import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header_class from "../MainPages/Header_class";

function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Shoes",
      price: 2500,
      quantity: 2,
      image: "product Picture/Shoes1.jpg",
    },
    {
      id: 2,
      name: "Bat",
      price: 850,
      quantity: 1,
      image: "product Picture/Plastic_bat1.jpg",
    },
    {
      id: 3,
      name: "Volleyball",
      price: 1500,
      quantity: 1,
      image: "product Picture/Volleyball1.png",
    },
  ]);

  const navigate = useNavigate();

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    }
  };

  const handleQuantityChange = (id, delta) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    navigate("/BillingPage", {
      state: { cartItems, totalAmount: getTotalPrice() },
    });
  };

  return (
    <div className="container mx-auto  p-5">
      <h1 className="text-3xl font-bold mb-5">Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div key={item.id} className="border p-5 rounded-lg shadow-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 object-cover mb-3"
                />
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p>Price: ₹{item.price}</p>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="text-white bg-gray-500 hover:bg-gray-700 px-3 py-1 rounded"
                  >
                    -
                  </button>
                  <p className="mx-3">{item.quantity}</p>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="text-white bg-gray-500 hover:bg-gray-700 px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="mt-3 text-white bg-red-500 hover:bg-red-700 px-3 py-2 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 text-right">
            <p className="text-2xl font-bold">Total: ₹{getTotalPrice()}</p>
            <button
              onClick={handleCheckout}
              className="mt-3 px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-black"
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <div className="text-center mt-20">
          <p className="text-xl">Your cart is empty!</p>
          <Link
            to="/"
            className="mt-5 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-black"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}

export default CartPage;
