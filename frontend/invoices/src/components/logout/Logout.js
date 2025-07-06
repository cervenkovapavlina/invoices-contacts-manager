import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function Logout({ onLogout }) {
  const navigate = useNavigate();

  onLogout();
  sessionStorage.setItem("isAuthenticated", false); // TODO Bezpecnostni riziko, jde obejit nastavenim primo v konzoli
  navigate('/login');

  return (
    <Link className="nav-link" to="/login">Login</Link>
  );
}

export default Logout;

