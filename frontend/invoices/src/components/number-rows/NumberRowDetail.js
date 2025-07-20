import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import DataComponentUtil from 'utils/DataComponentUtil';
import NumberRowModel from "components/number-rows/NumberRowModel";
import FormSingleRow from 'components/shared/FormSingleRow';
import NarrowContent from 'components/shared/NarrowContent';

const NumberRowDetail = () => {
    const { id } = useParams();
    const [numberRow, setNumberRow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const loadedRef = useRef(false);

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
        if (loadedRef.current === false){
            loadedRef.current = true;
            DataComponentUtil.loadData('number_rows/' + id, mapDataToModel, setLoading, setErrorMessage);
        }
    }, [id])

    const generateNumberRowDetail = () => {
        return (
            <div className="number-row-detail">
                <NarrowContent>
                    <h1>Číselná řada: {numberRow.name}</h1>
                    <form>
                        <FormSingleRow
                            label="Název číselné řady"
                            id="name"
                            value={numberRow.name}
                            disabled
                        />
                        <FormSingleRow
                            label="Prefix"
                            id="prefix"
                            value={numberRow.prefix}
                            disabled
                        />
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
                </NarrowContent>
            </div>
        );
    }

    return DataComponentUtil.output(loading, errorMessage, generateNumberRowDetail)

}

export default NumberRowDetail;