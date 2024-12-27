import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import "./styles.css";

export default function HeaderComponent() {
  useEffect(() => {}, []);
  return (
    <header className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
      <div className="ml-3 fw-bold appName">Simplify App</div>
      <span className="userIcon fw-bold"><i className="bi bi-person"></i></span>
    </header>
  );
}
