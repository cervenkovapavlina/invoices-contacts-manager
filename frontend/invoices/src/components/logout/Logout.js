import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import SessionHelper from 'utils/SessionHelper';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(()=>{
    onLogout();
    SessionHelper.close();
    navigate('/login');
  }, [navigate, onLogout]);

  return (
    <Link className="nav-link" to="/login">Přihlásit se</Link>
  );
};

export default Logout;