import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
//import "./App.css";
import Home_page from "./components/MainPages/Home_page";
import Sign_up from "./components/sub_pages/Sign_up";
import Log_in from "./components/sub_pages/Log_in";
import CartPage from "./components/sub_pages/CartPage";
import BillingPage from "./components/sub_pages/BillingPage";
import OrderConfirmation from "./components/sub_pages/OrderConfirmation";
import MenCategoryPage from "./components/MainPages/MenCategoryPage";
import WomenCategoryPage from "./components/MainPages/WomenCategoryPage";
import ProductCategoryPage from "./components/MainPages/ProductCategoryPage";
import BrandsCategoryPage from "./components/MainPages/BrandCategoryPage";
import Profilepage from "./components/sub_pages/Profilepage";
import Layout from "./components/Layout/Layout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home_page />} />
      <Route path="Signup" element={<Sign_up />} />
      <Route path="Login" element={<Log_in />} />
      <Route path="CartPage" element={<CartPage />} />
      <Route path="BillingPage" element={<BillingPage />} />
      <Route path="OrderConfirmation" element={<OrderConfirmation />} />
      <Route path="MenCategoryPage" element={<MenCategoryPage />} />
      <Route path="WomenCategoryPage" element={<WomenCategoryPage />} />
      <Route path="ProductCategoryPage" element={<ProductCategoryPage />} />
      <Route path="BrandsCategoryPage" element={<BrandsCategoryPage />} />
      <Route path="Profilepage" element={<Profilepage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
