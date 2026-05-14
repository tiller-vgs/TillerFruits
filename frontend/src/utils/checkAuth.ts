import type { NavigateFunction } from "react-router-dom";

async function checkAuth(navigate: NavigateFunction) {
  try {
    const response = await fetch("http://localhost:5000/api/v1/auth/session", {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 401) {
      navigate("/login");
      return null;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    navigate("/login");
    return null;
  }
}

export default checkAuth;
