import './App.css';
import Layout from 'components/layout/Layout';
import Home from 'components/home/Home';
import Login from 'components/login/Login';
import Logout from 'components/logout/Logout';
import SessionHelper from 'utils/SessionHelper';
import PrivateRoute from 'components/private-route/PrivateRoute';
import NumberRowList from 'components/number-rows/NumberRowList';
import NumberRowDetail from 'components/number-rows/NumberRowDetail';
import NumberRowForm from 'components/number-rows/NumberRowForm';
import IssuedInvoiceList from 'components/issued-invoices/IssuedInvoiceList';
import IssuedInvoiceDetail from 'components/issued-invoices/IssuedInvoiceDetail';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(SessionHelper.isOpen());

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
                  path="/number-rows"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <NumberRowList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/number-row-detail/:id"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <NumberRowDetail />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/number-row-create"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <NumberRowForm />
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
};

export default App;