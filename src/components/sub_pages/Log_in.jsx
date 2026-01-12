import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Log_in() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://gearpro-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Login Successful ✅");
        // Save token
        localStorage.setItem("token", data.token);
        // ✅ Save user name too
        if (data.user && data.user.name && data.user.email) {
          localStorage.setItem("userName", data.user.name);
          localStorage.setItem("userEmail", data.user.email);
          localStorage.setItem("userCreatedAt",data.user.createdAt);
        }

        navigate("/home");
      } else {
        alert(data.message || "Invalid Credentials ❌");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Logo */}
      <div className="mb-6">
        <img className="h-20" src="new_logo_2.svg" alt="Logo" />
      </div>

      {/* Card */}
      <div className="w-[90%] max-w-md p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Login
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Welcome Back!</p>
        </div>

        {/* Inputs */}
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center mt-6 space-y-3"
        >
          <input
            className="w-full h-11 px-3 rounded-lg text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            required
            placeholder="Enter Your Username"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            className="w-full h-11 px-3 rounded-lg text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            required
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center w-full mt-2 text-xs">
            <label className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <input className="w-4 h-4" type="checkbox" />
              <span>Remember Me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full h-11 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition mt-4"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          <span className="px-3 text-xs text-gray-500 dark:text-gray-400">
            or, login with
          </span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        {/* Social Logins */}
        <div className="flex justify-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
            <img className="w-5" src="google.svg" alt="Google" />
            <span className="text-sm dark:text-white">Google</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
            <img className="w-5" src="facebook.svg" alt="Facebook" />
            <span className="text-sm dark:text-white">Facebook</span>
          </button>
        </div>

        {/* Register Link */}
        <div className="text-center mt-5 text-xs text-gray-600 dark:text-gray-400">
          Not Registered yet?{" "}
          <Link to="/Sign_up" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Log_in;
