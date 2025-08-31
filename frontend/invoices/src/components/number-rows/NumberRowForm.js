import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataComponentUtil from 'utils/DataComponentUtil';
import FormSingleRow from 'components/shared/FormSingleRow';
import NarrowContent from 'components/shared/NarrowContent';

const NumberRowForm = () => {
    const [name, setName] = useState('');
    const [prefix, setPrefix] = useState('');
    const [received, setReceived] = useState(null);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        DataComponentUtil.sendData(
            "number_rows/create",
            { name, prefix, received },
            navigate,
            "number-row-detail",
            setLoading,
            setErrorMessage);
    };

    if (errorMessage) {
        return <div>Error: {errorMessage}</div>
    }

    return (
        <div className="number-row-form">
            <NarrowContent>
                <h1>Nová číselná řada</h1>
                <form onSubmit={handleSubmit} >
                    <FormSingleRow
                        label="Název číselné řady"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <FormSingleRow
                        label="Prefix"
                        id="prefix"
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value)}
                    />
                      <div className="row my-3">
                          <label className="col-sm-4 col-form-label text-sm-end">Typ faktur</label>
                          <div className="col-sm-8 my-2">
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
            </NarrowContent>
        </div>
    )
}

export default NumberRowForm;