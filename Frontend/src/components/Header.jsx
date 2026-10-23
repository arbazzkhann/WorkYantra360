import React from "react";
import "../css/Header.css";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="app-header">
        <nav className="navbar navbar-dark custom-navbar">
            <div className="container-fluid header-content">
            <div
                className="navbar-brand workyantra-brand"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate("/");
                }
                }}
            >
                <div className="brand-logo">
                    <i className="bi bi-people-fill"></i>
                </div>

                <div onClick={() => navigate("/")} className="brand-text">
                    <span className="brand-work">WorkYantra</span>
                    <span className="brand-number">360</span>
                    <small>EMPLOYEE MANAGEMENT</small>
                </div>
                <ThemeToggle />  {/*THEME TOGGLE BUTTON COMPONENT*/}
            </div>

            <div className="header-right">
                <span className="header-status">
                <span className="status-dot"></span>
                Management Portal
                </span>

                <button
                type="button"
                className="header-home-btn"
                onClick={() => navigate("/")}
                aria-label="Go to home"
                >
                <i className="bi bi-house-door"></i>
                <span onClick={() => navigate("/")}>Home</span>
                </button>
            </div>
            </div>
        </nav>
    </header>
  );
};

export default Header;
