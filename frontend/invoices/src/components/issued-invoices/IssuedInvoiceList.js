import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import DjangoClient from 'utils/DjangoClient';

const IssuedInvoiceList = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [selectedInvoice, setSelectedInvoice] = useState(null)


    const loadData = () => {
        let client = new DjangoClient();
        client.get('number_rows', (data)=>{
            setInvoices(data);
            setLoading(false)
        }, (error)=>{setErrorMessage(error)})
    }

    useEffect(()=>{
        loadData()
    }, [])

    if (loading) {
        return <div>Loading invoices...</div>;
    }

    if (invoices.length === 0) {
        return <p>No invoices found.</p>;
    }

    return (
        <div className="issued-invoice-list">
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((item) => (
                        <tr key={item.pk}>
                            <td><Link to={`/issued-invoice-detail/${item.pk}`}>{item.pk}</Link></td>
                            <td>{item.fields.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IssuedInvoiceList;