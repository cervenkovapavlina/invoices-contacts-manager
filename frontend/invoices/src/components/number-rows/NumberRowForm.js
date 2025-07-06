import React, { useState, useEffect } from "react";
import DjangoClient from "utils/DjangoClient";
import { Link, useNavigate } from "react-router-dom";
import NumberRowModel from "components/number-rows/NumberRowModel";
import DataComponentUtil from 'utils/DataComponentUtil';



const NumberRowForm = () => {
    const [name, setName] = useState(null);
    const [prefix, setPrefix] = useState(null);
    const [received, setReceived] = useState(null);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        let client = new DjangoClient();
        let okCallback = (data) => {
            setLoading(false);
            navigate(`/number-row-detail/${data.id}`);
        };
        let errorCallback = (error) => {
            setLoading(false);
            setErrorMessage(error);
        };
        client.post("number_rows/create", okCallback, setErrorMessage, { name, prefix, received });
    };

    if (errorMessage) {
        return <div>Error: {errorMessage}</div>
    }

    return (
        <div className="number-row-form">
            <h2 className="display-6">
                Nová číselná řada
            </h2>
            <form onSubmit={handleSubmit} >
              <div className="mb-3 mt-3">
                <label htmlFor="name" className="form-label" >Název číselné řady:</label>
                <input type="text" onChange={e => setName(e.target.value)} className="form-control" id="name" name="name" required />
              </div>
              <div className="mb-3 mt-3">
                <label htmlFor="prefix" className="form-label" >Prefix:</label>
                <input type="text" onChange={e => setPrefix(e.target.value)} className="form-control" id="prefix" name="prefix"/>
              </div>
              <div className="mb-3 mt-3">
                  <label className="form-label">Typ faktur:</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="invoiceType"
                        id="received"
                        value="received"
                        checked={received === true}
                        onChange={() => setReceived(true)}
                        required
                      />
                      <label className="form-check-label" htmlFor="received">
                        Přijaté
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="invoiceType"
                        id="issued"
                        value="issued"
                        checked={received === false}
                        onChange={() => setReceived(false)}
                      />
                      <label className="form-check-label" htmlFor="issued">
                        Vydané
                      </label>
                    </div>
                  </div>
              </div>
              {loading ? (
                <button className="btn btn-primary" disabled>
                    <span className="spinner-border spinner-border-sm"></span>
                    Loading...
                </button>
              ) : (
                <button type="submit" className="btn btn-primary">Uložit</button>
              )}
            </form>
        </div>
    )



}



export default NumberRowForm;



