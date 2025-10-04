import SessionHelper from 'utils/SessionHelper';

class DjangoClient {
    static BASE_URL = 'http://localhost:8000'
    static DEBUG = true;

    debug = (value) => {
      if (DjangoClient.DEBUG) {
        console.log('DjangoClient: ', value);
      }
    }

    get = async (endpoint, addAuthenticationHeaders=true) => {
        let url = DjangoClient.BASE_URL + '/' + endpoint;
        this.debug(`GET ${url}`);
        let headers = {
            'Content-Type': 'application/json',
        };
        if (addAuthenticationHeaders) {
            headers['Authentication-Token'] = await SessionHelper.getAuthenticationToken();
        }
        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
          headers: headers,
        });
        if (!response.ok) {
            console.error(`GET ${url} failed.`);
        }
        return response.json()
    }

    post = async (endpoint, body, addAuthenticationHeaders=true) => {
        let url = DjangoClient.BASE_URL + '/' + endpoint;
        this.debug(`POST ${url}`);
        let headers = {'Content-Type': 'application/json'};
        if (addAuthenticationHeaders){
            headers['X-CSRFToken'] = await SessionHelper.getCsrfToken();
            headers['Authentication-Token'] = await SessionHelper.getAuthenticationToken();
        }
        const response = await fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: headers,
          body: JSON.stringify(body),
        });
        if (!response.ok) {
            console.error(`POST ${url} failed.`);
        }
        return response.json()
    }
}

export default DjangoClient;