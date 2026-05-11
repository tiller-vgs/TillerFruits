import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./HomePage.tsx";
import Navbar from "./components/Navbar.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./landingPage";
import Login from "./pages/Login.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import AssignmentDistribute from "./pages/AssignmentDistribute.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/file/:id" element={<AssignmentDistribute />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
