import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DjangoClient from 'utils/DjangoClient';

const IssuedInvoiceDetail = () => {
    const { id } = useParams()
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const loadData = () => {
        let client = new DjangoClient();
        client.get('number_rows/' + id, (data)=>{
            setInvoice(data);
            setLoading(false)
        }, (error)=>{
            setLoading(false)
            setErrorMessage(error)
        })
    }

    useEffect(()=>{
        loadData();
    }, [])

    if (loading) {
        return <div>Loading invoices...</div>;
    }

    if (errorMessage) {
        return <div>Error: {errorMessage}</div>;
    }

    return (
        <div className="invoice-detail">
            <h2>
                Issued invoice: {invoice.pk}
            </h2>
            <p>{invoice.fields.name}</p>
        </div>
    );
};

export default IssuedInvoiceDetail;