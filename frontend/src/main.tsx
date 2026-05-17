import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./pages/HomePage.tsx";
import Navbar from "./components/Navbar.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./landingPage";
import Login from "./pages/Login.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import AssignmentDistribute from "./pages/AssignmentDistribute.tsx";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import StudentPage from "./pages/StudentPage.tsx";
import Footer from "./components/Footer.tsx";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme} defaultMode="light">
      <CssBaseline />

      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/upload" element={<HomePage />} />
            <Route path="/me/assignments" element={<StudentPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/file/:id" element={<AssignmentDistribute />} />
          </Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
