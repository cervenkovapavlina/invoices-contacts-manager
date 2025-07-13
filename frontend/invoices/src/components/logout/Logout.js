import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import SessionHelper from 'utils/SessionHelper';

function Logout({ onLogout }) {
  const navigate = useNavigate();

  onLogout();
  SessionHelper.close();
  navigate('/login');

  return (
    <Link className="nav-link" to="/login">Login</Link>
  );
}

export default Logout;

