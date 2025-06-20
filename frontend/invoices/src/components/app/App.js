import './App.css';
import Layout from 'components/layout/Layout';
import Home from 'components/home/Home';
import Login from 'components/login/Login';
import Data from 'components/data/Data';
import Data2 from 'components/data/Data2';
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
                <Route path="data" element={<Data />} />
                <Route path="data2" element={<Data2 />} />
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
