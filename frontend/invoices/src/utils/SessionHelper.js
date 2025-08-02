import DjangoClient from 'utils/DjangoClient';

class SessionHelper {
    static SESSION_ID = "sessionId";
    static AUTHENTICATION_TOKEN = "authenticationToken";
    static CSRF_TOKEN = "csrfToken";

    static open(sessionId, authenticationToken, csrfToken){
        SessionHelper.close();
        localStorage.setItem(SessionHelper.SESSION_ID, sessionId);
        sessionStorage.setItem(SessionHelper.AUTHENTICATION_TOKEN, authenticationToken);
        sessionStorage.setItem(SessionHelper.CSRF_TOKEN, csrfToken);
    }

    static close(){
        localStorage.setItem(SessionHelper.SESSION_ID, null);
        localStorage.clear();
        sessionStorage.clear();
    }

    static isOpen(){
        let flag = localStorage.getItem(SessionHelper.SESSION_ID);
        return flag !== null
    }

    static getSessionId(){
        return localStorage.getItem(SessionHelper.SESSION_ID)
    }

    static getAuthenticationToken(){
        return SessionHelper.getToken(SessionHelper.AUTHENTICATION_TOKEN)
    }

    static getCsrfToken(){
        return SessionHelper.getToken(SessionHelper.CSRF_TOKEN)
    }

    static getToken(tokenTypeKey){
        let token = sessionStorage.getItem(tokenTypeKey);
        if(!token){
            SessionHelper.loadSession();
            token = sessionStorage.getItem(tokenTypeKey);
        }
        return token
    }

    static loadSession(){
        let sessionId = SessionHelper.getSessionId();
        let client = new DjangoClient();
        let response = client.blockedGet("sessions/" + sessionId);
        sessionStorage.setItem(SessionHelper.AUTHENTICATION_TOKEN, response.authentication_token);
        sessionStorage.setItem(SessionHelper.CSRF_TOKEN, response.csrf_token);
    }

}

export default SessionHelper;