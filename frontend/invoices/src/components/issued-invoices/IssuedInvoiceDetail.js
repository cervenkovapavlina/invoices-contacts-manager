import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DjangoClient from 'utils/DjangoClient';

const IssuedInvoiceDetail = () => {
    const { id } = useParams()
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const loadData = async () => {
        let client = new DjangoClient();
        const data = await client.get('number_rows/' + id);
        setInvoice(data);
        setLoading(false)
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