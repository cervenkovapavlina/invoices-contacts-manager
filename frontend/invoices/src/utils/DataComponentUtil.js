import DjangoClient from "utils/DjangoClient";


class DataComponentUtil{

    static loadData(endpoint, setData, setLoading, setErrorMessage){
        let client = new DjangoClient();
        client.get(endpoint, (data)=>{
            setData(data);
            setLoading(false);
        }, (error)=>{
            setLoading(false);
            setErrorMessage(error);
        })
    }

    static output(loading, errorMessage, generateSpecificOutput){
        if (loading) {
            return <div>Loading data...</div>;
        }

        if (errorMessage) {
            return <div>Error: {errorMessage}</div>;
        }

        return generateSpecificOutput()
    }

}

export default DataComponentUtil;