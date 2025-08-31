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

    static async getAuthenticationToken(){
        return await SessionHelper.getToken(SessionHelper.AUTHENTICATION_TOKEN)
    }

    static async getCsrfToken(){
        return await SessionHelper.getToken(SessionHelper.CSRF_TOKEN)
    }

    static async loadSession() {
      try {
        let sessionId = SessionHelper.getSessionId();
        const client = new DjangoClient();
        const response = await client.get("sessions/" + encodeURI(sessionId), false);
        sessionStorage.setItem(SessionHelper.AUTHENTICATION_TOKEN, response.authentication_token);
        sessionStorage.setItem(SessionHelper.CSRF_TOKEN, response.csrf_token);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    static async getToken(tokenTypeKey) {
        let token = sessionStorage.getItem(tokenTypeKey);
        if(!token){
            await SessionHelper.loadSession();
            token = sessionStorage.getItem(tokenTypeKey);
        }
        return token
    }
}

export default SessionHelper;