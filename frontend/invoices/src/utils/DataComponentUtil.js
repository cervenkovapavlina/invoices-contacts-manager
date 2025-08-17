import DjangoClient from "utils/DjangoClient";


class DataComponentUtil{

    static async loadData(endpoint, setData, setLoading, setErrorMessage){
        let client = new DjangoClient();
        try {
            const data = await client.get(endpoint);
            setData(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setErrorMessage(error);
        }
    }

    static async sendData(endpoint, body, navigate, redirectUrl, setLoading, setErrorMessage){
        let client = new DjangoClient();
        try {
            const data = await client.post(endpoint, body);
            setLoading(false);
            navigate(`/${redirectUrl}/${data.id}`);
        } catch (error) {
            setLoading(false);
            setErrorMessage(error);
        }
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