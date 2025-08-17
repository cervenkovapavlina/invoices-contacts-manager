import SessionHelper from 'utils/SessionHelper';

class DjangoClient {
    static BASE_URL = 'http://localhost:8000'
    static DEBUG = true;

    debug = (value) => {
      if (DjangoClient.DEBUG) {
        console.log('DjangoClient: ', value);
      }
    }

    getCookie = (name) => {
      let cookieValue = null;

      if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');

        for (let cookie of cookies) {
          cookie = cookie.trim();

          if (cookie.startsWith(name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }

      this.debug(cookieValue);
      return cookieValue;
    }

    get = async (endpoint, addAuthenticationHeaders=true) => {
        let url = DjangoClient.BASE_URL + '/' + endpoint;
        console.log(`GET ${url}`);
        let headers = {
            'Content-Type': 'application/json',
        };
        if (addAuthenticationHeaders) {
            headers['Authentication-Token'] = await SessionHelper.getAuthenticationToken();
        }
        this.debug(`GET ${url}`)
        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
          headers: headers,
        });
        if (response.ok){
            return response.json()
        } else {
            console.error(`GET ${url} failed. `);
            throw new Error(response.message);
        }
    }

    post = async (endpoint, body, addAuthenticationHeaders=true) => {
        let url = DjangoClient.BASE_URL + '/' + endpoint;
        this.debug(url);
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
        if (response.ok){
            return response.json()
        } else {
            console.error(`POST ${url} failed. `);
            return response.json()
        }
    }
}

export default DjangoClient;