import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NumberRowModel from "components/number-rows/NumberRowModel";
import DataComponentUtil from 'utils/DataComponentUtil';
import PaginatedItems from "components/shared/PaginatedItems";

const NumberRowList = () => {
    const [numberRows, setNumberRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

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

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    useEffect(() => {
        const page = currentPage + 1;
        DataComponentUtil.loadData("number_rows?page=" + page, mapDataToModel, setLoading, setErrorMessage, setPageCount);
    }, [currentPage])

    const generateNumberRowList = () => {
        return (
            <PaginatedItems handlePageClick={handlePageClick} pageCount={pageCount} currentPage={currentPage}>
                <div className="number-row-list">
                    <div className="row">
                        <div className="col-lg-3"></div>
                        <div className="col-lg-6">
                            <h1>Číselné řady faktur</h1>
                        </div>
                        <div className="col-lg-3 my-2">
                            <button className="btn btn-primary" onClick={handleClick}>Přidat číselnou řadu</button>
                        </div>
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
            </PaginatedItems>
        )
    }

    return DataComponentUtil.output(loading, errorMessage, generateNumberRowList)

}

export default NumberRowList;