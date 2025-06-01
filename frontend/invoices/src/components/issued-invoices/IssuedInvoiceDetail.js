import React, { useState, useEffect } from 'react';

function IssuedInvoiceDetail({ invoiceId }) {
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setInvoice(invoiceId);
        setLoading(false);
    }, [invoiceId]);

    if (loading) return <div>Loading invoices...</div>;

    return (
        <div className="invoice-detail">
            <h2>
                Issued invoice: {invoice}
            </h2>
        </div>
    );
}

export default IssuedInvoiceDetail;
