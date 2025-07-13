import './App.css';
import Layout from 'components/layout/Layout';
import Home from 'components/home/Home';
import Login from 'components/login/Login';
import Logout from 'components/logout/Logout';
import SessionHelper from 'utils/SessionHelper';
import Data from 'components/data/Data';
import PrivateRoute from 'components/private-route/PrivateRoute';
import IssuedInvoiceList from 'components/issued-invoices/IssuedInvoiceList';
import IssuedInvoiceDetail from 'components/issued-invoices/IssuedInvoiceDetail';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(SessionHelper.isOpen()); // TODO Do produkce zmenit na false
  // const [isAuthenticated, setIsAuthenticated] = useState(true); // Do produkce zmenit na false

  return (
    <div className="App">
         <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout isAuthenticated={isAuthenticated}/>}>
                <Route
                  path="/home"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/data"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <Data />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/issued-invoices"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <IssuedInvoiceList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/issued-invoice-detail/:id"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <IssuedInvoiceDetail />
                    </PrivateRoute>
                  }
                />
                <Route path="/logout" element={<Logout onLogout={() => setIsAuthenticated(false)} />} />
                <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
