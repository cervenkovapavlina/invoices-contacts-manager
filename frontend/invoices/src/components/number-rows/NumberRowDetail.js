import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DjangoClient from 'utils/DjangoClient';
import DataComponentUtil from 'utils/DataComponentUtil';
import NumberRowModel from "components/number-rows/NumberRowModel";

const NumberRowDetail = () => {
    const { id } = useParams()
    const [numberRow, setNumberRow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const mapDataToModel = (data) => {
        let fields = data.fields;
        let model = new NumberRowModel(
            data.pk,
            fields.createdAt,
            fields.deletedAt,
            fields.prefix,
            fields.name,
            fields.received);
        setNumberRow(model);
    }

    useEffect(() => {
        DataComponentUtil.loadData('number_rows/' + id, mapDataToModel, setLoading, setErrorMessage);
    }, [])

    const generateNumberRowDetail = () => {
        return (
            <div className="number-row-detail">
                <h2 className="display-6">
                    Číselná řada: {numberRow.name}
                </h2>
                <form>
                  <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label" >Název číselné řady:</label>
                    <input type="text" value={numberRow.name} disabled className="form-control" id="name" name="name"/>
                  </div>
                  <div className="mb-3 mt-3">
                    <label htmlFor="prefix" className="form-label" >Prefix:</label>
                    <input type="text" value={numberRow.prefix} disabled className="form-control" id="prefix" name="prefix"/>
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
                            checked={numberRow.received === true}
                            disabled
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
                            checked={numberRow.received === false}
                            disabled
                          />
                          <label className="form-check-label" htmlFor="issued">
                            Vydané
                          </label>
                        </div>
                      </div>
                    </div>
                </form>
            </div>
        );
    }

    return DataComponentUtil.output(loading, errorMessage, generateNumberRowDetail)

}

export default NumberRowDetail;