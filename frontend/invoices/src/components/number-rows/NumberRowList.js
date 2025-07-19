import React, { useState, useEffect, useRef } from "react";
import DjangoClient from "utils/DjangoClient";
import { Link, useNavigate } from "react-router-dom";
import NumberRowModel from "components/number-rows/NumberRowModel";
import DataComponentUtil from 'utils/DataComponentUtil';

const NumberRowList = () => {
    const [numberRows, setNumberRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const loadedRef = useRef(false);

    const mapDataToModel = (data) => {
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

    const getInvoiceType = (received) => {
        return received ? "Přijaté" : "Vydané";
    }

    const handleClick = () => {
        navigate("/number-row-create");
    };

    useEffect(() => {
        if (loadedRef.current === false){
            loadedRef.current = true;
            DataComponentUtil.loadData("number_rows", mapDataToModel, setLoading, setErrorMessage);
        }
    }, [])

    const generateNumberRowList = () => {
        return (
            <div className="number-row-list">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="display-6 mb-0">Číselné řady faktur</h2>
                    <button className="btn btn-primary" onClick={handleClick}>Přidat číselnou řadu</button>
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