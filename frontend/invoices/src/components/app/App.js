import './App.css';
import Layout from 'components/layout/Layout';
import Home from 'components/home/Home';
import Login from 'components/login/Login';
import NumberRowList from 'components/number-rows/NumberRowList';
import NumberRowDetail from 'components/number-rows/NumberRowDetail';
import IssuedInvoiceList from 'components/issued-invoices/IssuedInvoiceList';
import IssuedInvoiceDetail from 'components/issued-invoices/IssuedInvoiceDetail';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
         <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="home" element={<Home />} />
                <Route path="number-rows" element={<NumberRowList />} />
                <Route path="number-row-detail/:id" element={<NumberRowDetail />} />
                <Route path="issued-invoices" element={<IssuedInvoiceList />} />
                <Route path="issued-invoice-detail/:id" element={<IssuedInvoiceDetail />} />
                <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
