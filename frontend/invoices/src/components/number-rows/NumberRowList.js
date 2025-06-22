import React, { useState, useEffect } from "react";
import DjangoClient from "utils/DjangoClient";
import { Link } from "react-router-dom";

function NumberRowList(){
    const [numberRows, setNumberRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    function loadData(){
        let client = new DjangoClient();
        client.get("number_rows", (data)=>{
            setNumberRows(data);
            setLoading(false);
        }, (error) => {
            setLoading(false);
            setErrorMessage(error);
        })
    }

    function getInvoiceType(received){
        return received ? "Přijaté" : "Vydané";
    }

    useEffect(()=>{
        loadData();
    }, [])

    if (loading) {
        return <div>Loading number rows...</div>;
    }

    if (errorMessage) {
        return <div>Error: {errorMessage}</div>;
    }

    return (
        <div className="number-row-list">
            <h2 className="display-6">Číselné řady</h2>
            <div className="d-flex justify-content-center mb-3">
                <button className="btn btn-primary">Přidat číselnou řadu</button>
            </div>
            {!numberRows || numberRows.length === 0 ? (
                <p>No number rows found.</p>
                ) : (
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Název číselné řady</th>
                            <th>Prefix</th>
                            <th>Typ faktur</th>
                        </tr>
                    </thead>
                    <tbody>
                        {numberRows.map((row)=>(
                            <tr key={row.pk}>
                                <td><Link to={`/number-row-detail/${row.pk}`}>{row.fields.name}</Link></td>
                                <td>{row.fields.prefix}</td>
                                <td>{getInvoiceType(row.fields.received)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default NumberRowList;