import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionHelper from 'utils/SessionHelper';
import DjangoClient from 'utils/DjangoClient';
import FormSingleRow from 'components/shared/FormSingleRow';
import NarrowContent from 'components/shared/NarrowContent';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = {"user_name": username, "password": password};
    let client = new DjangoClient();
    const data = await client.post("sessions/create", body, false);
    if(data.message){
        alert("Neplatné přihlašovací údaje.")
        console.error(data.message)
    } else {
        onLogin();
        SessionHelper.open(data.session_id, data.authentication_token, data.csrf_token);
        navigate('/home');
    }
  };

  return (
    <div className="login-form">
        <NarrowContent>
            <h1>Přihlášení</h1>
            <form onSubmit={handleSubmit}>
                <FormSingleRow
                    label="Uživatelské jméno"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <FormSingleRow
                    label="Heslo"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Přihlásit se</button>
            </form>
        </NarrowContent>
    </div>
  );
};

export default Login;