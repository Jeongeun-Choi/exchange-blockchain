import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { navRoutes } from "./router/NavRouter";
import { Layout } from "./components/Layout";
import { useEffect } from "react";

const coinList = [
  { coinName: "BnB", id: 1, coinImg: "", coinCount: 1000 },
  { coinName: "Solana", id: 2, coinImg: "", coinCount: 1000 },
  { coinName: "Ethereum", id: 3, coinImg: "", coinCount: 1000 },
];

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
