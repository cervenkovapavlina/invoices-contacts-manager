import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function IssuedInvoiceDetail() {
    const { id } = useParams()
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setInvoice(id);
        setLoading(false);
    }, [id]);

    if (loading) {
        return <div>Loading invoices...</div>;
    }

    return (
        <div className="invoice-detail">
            <h2>
                Issued invoice: {invoice}
            </h2>
        </div>
    );
}

export default IssuedInvoiceDetail;
