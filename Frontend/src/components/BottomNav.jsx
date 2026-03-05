import React from "react";
import { useNavigate, useLocation } from "react-router";
import { Home, Bookmark } from "lucide-react";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bottom-nav">
      <button
        className={`bottom-nav-btn ${isActive("/") ? "active" : ""}`}
        onClick={() => navigate("/")}
      >
        <Home size={20} />
        <span className="bottom-nav-label">Home</span>
      </button>

      <button
        className={`bottom-nav-btn ${isActive("/saved") ? "active" : ""}`}
        onClick={() => navigate("/saved")}
      >
        <Bookmark size={20} />
        <span className="bottom-nav-label">Bookmark</span>
      </button>
    </div>
  );
};

export default BottomNav;
