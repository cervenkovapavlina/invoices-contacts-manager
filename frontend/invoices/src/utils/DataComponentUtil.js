import DjangoClient from "utils/DjangoClient";
const ITEMS_PER_PAGE = 10;

class DataComponentUtil{
    static async loadData(endpoint, setData, setLoading, setErrorMessage, setPageCount = null) {
        let client = new DjangoClient();
        const response = await client.get(endpoint);
        setLoading(false);
        if (response.message) {
            setErrorMessage(response.message);
        } else {
            setData(response.data);
            if (setPageCount && response.count) {
                setPageCount(response.count / ITEMS_PER_PAGE);
            }
        }
    }

    static async sendData(endpoint, body, navigate, redirectUrl, setLoading, setErrorMessage) {
        let client = new DjangoClient();
        const response = await client.post(endpoint, body);
        setLoading(false);
        if (response.message) {
            setErrorMessage(response.message);
        } else {
            navigate(`/${redirectUrl}/${response.id}`);
        }
    }

    static output(loading, errorMessage, generateSpecificOutput) {
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