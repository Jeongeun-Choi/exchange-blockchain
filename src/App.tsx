import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { navRoutes } from "./router/NavRouter";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/exchanging");
    }
  }, [location.pathname, navigate]);

  return (
    <Routes>
      {navRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default App;
