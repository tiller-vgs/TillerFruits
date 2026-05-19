import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./pages/HomePage.tsx";
import Navbar from "./components/Navbar.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage.tsx";
import Login from "./pages/Login.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import StudentPage from "./pages/StudentPage.tsx";
import Footer from "./components/Footer.tsx";
import AssignmentDistribute from "./pages/AssignmentDistribute.tsx";
import AssignmentPage from "./pages/AssignmentPage.tsx";
import MySubmissionPage from "./pages/MySubmissionPage.tsx";
import OtherSubmissionPage from "./pages/OtherSubmissionPage.tsx";
import TOS from "./pages/TOS.tsx";

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
          <Route path="/tos" element={<TOS />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/upload" element={<HomePage />} />
            <Route path="/me/schoolwork" element={<StudentPage />} />
            <Route path="/me/assignments/:id/upload" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/assignment/create-new" element={<AssignmentDistribute />} />
            <Route path="/me/assignments/:assignmentId" element={<AssignmentPage />} />
            <Route path="/me/submissions/my-submissions/:submissionID" element={<MySubmissionPage />} />
            <Route path="/me/submissions/other-submissions/:submissionID" element={<OtherSubmissionPage />} />
          </Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
