import './App.css';
import Layout from 'components/layout/Layout';
import Data from 'components/data/Data';
import Data2 from 'components/data/Data2';
import IssuedInvoiceList from 'components/issued-invoices/IssuedInvoiceList';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
         <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
            <Route path="data" element={<Data />} />
            <Route path="data2" element={<Data2 />} />
            <Route path="issued-invoices" element={<IssuedInvoiceList />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
