import React, { useState, useEffect } from "react";
import DjangoClient from "utils/DjangoClient";
import { Link } from "react-router-dom";
import NumberRowModel from "components/number-rows/NumberRowModel";
import DataComponentUtil from 'utils/DataComponentUtil';

function NumberRowList(){
    const [numberRows, setNumberRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

//    function loadData(){
//        let client = new DjangoClient();
//        client.get("number_rows", (data)=>{
//            let newNumberRowList = [];
//            for(let i = 0; i < data.length; i++){
//                let fields = data[i].fields
//                let model = new NumberRowModel(
//                    data[i].pk,
//                    fields.createdAt,
//                    fields.deletedAt,
//                    fields.prefix,
//                    fields.name,
//                    fields.received);
//                newNumberRowList.push(model);
//            }
//            setNumberRows(newNumberRowList);
//            setLoading(false);
//        }, (error) => {
//            setLoading(false);
//            setErrorMessage(error);
//        })
//    }

    function mapDataToModel(data){
        let newNumberRowList = [];
        for(let i = 0; i < data.length; i++){
            let fields = data[i].fields
            let model = new NumberRowModel(
                data[i].pk,
                fields.createdAt,
                fields.deletedAt,
                fields.prefix,
                fields.name,
                fields.received);
            newNumberRowList.push(model);
        }
        setNumberRows(newNumberRowList);
    }



    function getInvoiceType(received){
        return received ? "Přijaté" : "Vydané";
    }

    useEffect(()=>{
        DataComponentUtil.loadData("number_rows", mapDataToModel, setLoading, setErrorMessage);
    }, [])


//    if (loading) {
//        return <div>Loading data...</div>;
//    }
//
//    if (errorMessage) {
//        return <div>Error: {errorMessage}</div>;
//    }

    function generateNumberRowList(){
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
                                <tr key={row.id}>
                                    <td><Link to={`/number-row-detail/${row.id}`}>{row.name}</Link></td>
                                    <td>{row.prefix}</td>
                                    <td>{getInvoiceType(row.received)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        )
    }

    return DataComponentUtil.output(loading, errorMessage, generateNumberRowList)


}

export default NumberRowList;