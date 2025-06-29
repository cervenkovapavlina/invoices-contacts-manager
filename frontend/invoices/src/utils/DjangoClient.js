
class DjangoClient {
    static BASE_URL = 'http://localhost:8000'
    static DEBUG = true;

    debug = function(value) {
      if (DjangoClient.DEBUG) {
        console.log('DjangoClient: ', value);
      }
    }

    getCookie = function(name) {
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

    get = function(endpoint, okCallback, errorCallback) {
        let url = DjangoClient.BASE_URL + '/' + endpoint;
        this.debug(url)
        fetch(url, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                throw data.message
            } else {
                this.debug(data);
                okCallback(data);
            }
        })
        .catch(error => errorCallback(error));
    }

    post = function (endpoint, okCallback, errorCallback, body){
        let url = DjangoClient.BASE_URL + '/' + endpoint;
        this.debug(url)
        fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': this.getCookie('csrftoken'),
          },
          body: JSON.stringify(body),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                throw data.message
            } else {
                this.debug(data);
                okCallback(data);
            }
        })
        .catch(error => errorCallback(error));
    };
}

export default DjangoClient;