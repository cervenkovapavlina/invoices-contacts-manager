import './App.css';
import Layout from 'components/layout/Layout';
import Home from 'components/home/Home';
import Login from 'components/login/Login';
import Data from 'components/data/Data';
import PrivateRoute from 'components/private-route/PrivateRoute';
import IssuedInvoiceList from 'components/issued-invoices/IssuedInvoiceList';
import IssuedInvoiceDetail from 'components/issued-invoices/IssuedInvoiceDetail';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, createContext, useContext } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
         <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="home" element={<Home />} />
                <Route
                  path="/data"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <Data />
                    </PrivateRoute>
                  }
                />
                <Route path="issued-invoices" element={<IssuedInvoiceList />} />
                <Route path="issued-invoice-detail/:id" element={<IssuedInvoiceDetail />} />
                <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
