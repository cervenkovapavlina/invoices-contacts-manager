import React, { useState, useEffect } from 'react';
import RestClient from "utils/RestClient";
import IssuedInvoiceModel from "components/issued-invoices/IssuedInvoiceModel";

function IssuedInvoiceList(){
  const [invoices, setInvoice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function generateTestData(){
    let invoices = [];
    for(let i=1; i<10; i++){
        let item = new IssuedInvoiceModel(i, "2025000" + i, "11111111", new Date(), "Customer - " + i)
        invoices.push(item)
    }
    return invoices
  }

//  useEffect(() => {
//        console.log("1");
//        fetch('http://localhost:8000/report')
//            .then(response => response.json())
//            .then(data=> {
//                console.log("2")
//                setNumbers(data);;
//                setLoading(false);
//            })
//            .catch(error=>setError(error));
//  }, []);
//  if (loading) return <div>Loading numbers...</div>;
//  if (error) return <div>Error loading numbers: {error}</div>;
//    let client = new RestClient()
//    client.get()
    let data = generateTestData()
    console.log(data)
    let item = data[0]
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
                <tr>
                    <td>{item.id}</td>
                    <td>{item.invoiceNumber}</td>
                    <td>{item.variableSymbol}</td>
                    <td>{item.issuedDate}</td>
                    <td>{item.customer}</td>
                </tr>
                </tbody>
        </table>
    </div>
  );
};
export default IssuedInvoiceList;


//            {data.map(item=>(
//                <tr>
//                    <td>{item.id}</td>
//                    <td>{item.invoiceNumber}</td>
//                    <td>{item.variableSymbol}</td>
//                    <td>{item.issuedDate}</td>
//                    <td>{item.customer}</td>
//                </tr>
//            ))
//            }