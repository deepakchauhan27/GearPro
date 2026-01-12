import { useEffect, useState } from "react";
import Header_class from "../MainPages/Header_class";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBoxOpen,
  faChevronDown,
  faChevronUp,
  faHome,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

function Profilepage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [openOrder, setOpenOrder] = useState(null);
  const [selectedTab, setSelectedTab] = useState("orders"); // ✅ Tabs: orders | addresses
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    // ✅ Get stored user info
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    const createdAt = localStorage.getItem("userCreatedAt");

    if (storedName && storedEmail) {
      setUser({
        name: storedName,
        email: storedEmail,
        createdAt: createdAt,
      });
    }

    // ✅ Dummy orders for now
    setOrders([
      {
        _id: "1",
        item: "Dumbbell Set",
        date: new Date(),
        status: "Delivered",
        price: 2999,
        address: "Mumbai, India",
        paymentMethod: "UPI",
      },
      {
        _id: "2",
        item: "Yoga Mat",
        date: new Date(),
        status: "Shipped",
        price: 999,
        address: "Delhi, India",
        paymentMethod: "Cash on Delivery",
      },
    ]);

    // ✅ Fetch addresses (dummy now, replace with backend later)
    setAddresses(["Mumbai, India", "Delhi, India"]);
  }, []);

  const toggleOrder = (id) => {
    setOpenOrder(openOrder === id ? null : id);
  };

  // ✅ Save Address (Later replace with API call to database)
  const handleSaveAddress = () => {
    if (newAddress.trim() !== "") {
      setAddresses([...addresses, newAddress]);
      setNewAddress("");
      // Example API POST
      // await axios.post("/api/address", { userId: user.id, address: newAddress });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar: User Info + Menu */}
        <div className="col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          {user ? (
            <div>
              {/* User Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-blue-500 text-white rounded-full">
                  <FontAwesomeIcon icon={faUser} size="lg" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    {user.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                  {user.createdAt && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Joined: {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              {/* Sidebar Menu */}
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedTab("orders")}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${
                    selectedTab === "orders"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  <FontAwesomeIcon icon={faBoxOpen} /> My Orders
                </button>

                <button
                  onClick={() => setSelectedTab("addresses")}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${
                    selectedTab === "addresses"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  <FontAwesomeIcon icon={faHome} /> Saved Addresses
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Loading user...</p>
          )}
        </div>

        {/* Right Side Content */}
        <div className="col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          {/* Orders Tab */}
          {selectedTab === "orders" && (
            <>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faBoxOpen} /> My Orders
              </h2>
              {orders.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No orders yet.</p>
              ) : (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {orders.map((order) => (
                    <li key={order._id} className="py-4">
                      {/* Order Summary */}
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleOrder(order._id)}
                      >
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-100">
                            {order.item}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(order.date).toLocaleDateString()} | {order.status}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-800 dark:text-gray-200 font-semibold">
                            ₹{order.price}
                          </span>
                          <FontAwesomeIcon
                            icon={openOrder === order._id ? faChevronUp : faChevronDown}
                            className="text-gray-500"
                          />
                        </div>
                      </div>

                      {/* Expanded Order Details */}
                      {openOrder === order._id && (
                        <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-sm text-gray-700 dark:text-gray-200">
                            <strong>Order ID:</strong> {order._id}
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-200">
                            <strong>Delivery Address:</strong> {order.address}
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-200">
                            <strong>Payment Method:</strong> {order.paymentMethod}
                          </p>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* Addresses Tab */}
          {selectedTab === "addresses" && (
            <>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faHome} /> Saved Addresses
              </h2>

              <ul className="space-y-2 mb-4">
                {addresses.map((addr, idx) => (
                  <li
                    key={idx}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200"
                  >
                    {addr}
                  </li>
                ))}
              </ul>

              {/* Add Address */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="Enter new address"
                  className="flex-1 p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                />
                <button
                  onClick={handleSaveAddress}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-1"
                >
                  <FontAwesomeIcon icon={faPlus} /> Add
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profilepage;
