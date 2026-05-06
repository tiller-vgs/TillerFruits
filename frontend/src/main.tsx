import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./HomePage.tsx";
import Login from "./pages/Login.tsx";
import Navbar from "./components/Navbar.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./landingPage";
import LoginCard from "./components/LoginCard";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginCard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
