import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DjangoClient from 'utils/DjangoClient';
import DataComponentUtil from 'utils/DataComponentUtil';

function NumberRowDetail() {
    const { id } = useParams()
    const [numberRow, setNumberRow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

//    function loadData(){
//        let client = new DjangoClient();
//        client.get('number_rows/' + id, (data)=>{
//            setNumberRow(data);
//            setLoading(false);
//        }, (error)=>{
//            setLoading(false);
//            setErrorMessage(error);
//        })
//    }



    useEffect(()=>{
        DataComponentUtil.loadData('number_rows/' + id, setNumberRow, setLoading, setErrorMessage);
    }, [])

    function generateNumberRowDetail(){
        return (
            <div className="number-row-detail">
                <h2 className="display-6">
                    Číselná řada: {numberRow.fields.name}
                </h2>
                <form>
                  <div class="mb-3 mt-3">
                    <label for="name" class="form-label" >Název číselné řady:</label>
                    <input type="text" value={numberRow.fields.name} disabled className="form-control" id="name" name="name"/>
                  </div>
                  <div class="mb-3 mt-3">
                    <label for="prefix" class="form-label" >Prefix:</label>
                    <input type="text" value={numberRow.fields.prefix} disabled className="form-control" id="prefix" name="prefix"/>
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
                            checked={numberRow.fields.received === true}
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
                            checked={numberRow.fields.received === false}
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

//    if (loading) {
//        return <div>Loading number row detail...</div>;
//    }
//
//    if (errorMessage) {
//        return <div>Error: {errorMessage}</div>;
//    }


}

export default NumberRowDetail;