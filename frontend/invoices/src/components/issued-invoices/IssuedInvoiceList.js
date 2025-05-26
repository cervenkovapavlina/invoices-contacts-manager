import React, { useState, useEffect } from 'react';
import RestClient from "utils/RestClient";
import IssuedInvoiceModel from "components/issued-invoices/IssuedInvoiceModel";

function IssuedInvoiceList(){
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function generateTestData(){
    let invoices = [];
    for(let i=1; i<10; i++){
        let item = new IssuedInvoiceModel(i, "2025000" + i, "11111111", new Date(), "Customer - " + i);
        invoices.push(item);
    }
    return invoices;
  }

  useEffect(()=>{
        let data = generateTestData();
        setInvoices(data);
        setLoading(false);
  }, [])

  if (loading) return <div>Loading invoices...</div>;

  if (invoices.length === 0) return <p>No invoices found.</p>;

  return (
    <div className="issued-invoice-list">
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>invoiceNumber</th>
                    <th>variableSymbol</th>
                    <th>issuedDate</th>
                    <th>customer</th>
                </tr>
            </thead>
            <tbody>
                {invoices.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.invoiceNumber}</td>
                        <td>{item.variableSymbol}</td>
                        <td>{item.issuedDate.toLocaleDateString()}</td>
                        <td>{item.customer}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};
export default IssuedInvoiceList;

