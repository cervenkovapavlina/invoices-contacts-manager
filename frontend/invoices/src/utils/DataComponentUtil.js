import DjangoClient from "utils/DjangoClient";
const ITEMS_PER_PAGE = 2;

class DataComponentUtil{
    static async loadData(endpoint, setData, setLoading, setErrorMessage, setPageCount = null) {
        let client = new DjangoClient();
        const data = await client.get(endpoint);
        setLoading(false);
        if (data.message) {
            setErrorMessage(data.message);
        } else {
            setData(data.data);
            if (setPageCount && data.count) {
                setPageCount(data.count / ITEMS_PER_PAGE);
            }
        }
    }

    static async sendData(endpoint, body, navigate, redirectUrl, setLoading, setErrorMessage) {
        let client = new DjangoClient();
        const data = await client.post(endpoint, body);
        setLoading(false);
        if (data.message) {
            setErrorMessage(data.message);
        } else {
            navigate(`/${redirectUrl}/${data.id}`);
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