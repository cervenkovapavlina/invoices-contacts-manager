class SessionHelper {
    static SESSION_FLAG = "";
    static AUTHENTICATION_TOKEN = "authenticationToken";
    static CSRF_TOKEN = "csrfToken";

    static generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    static open(authenticationToken, csrfToken){
        SessionHelper.close();
        SessionHelper.SESSION_FLAG = SessionHelper.generateRandomString(16);
        sessionStorage.setItem(SessionHelper.SESSION_FLAG, true);
        sessionStorage.setItem(SessionHelper.AUTHENTICATION_TOKEN, authenticationToken);
        sessionStorage.setItem(SessionHelper.CSRF_TOKEN, csrfToken);
    }

    static close(){
        sessionStorage.setItem(SessionHelper.SESSION_FLAG, false);
        sessionStorage.clear();
    }

    static isOpen(){
        let flag = sessionStorage.getItem(SessionHelper.SESSION_FLAG);
        console.log(SessionHelper.SESSION_FLAG)
        return flag && flag.toLowerCase() === "true"
    }

    static getAuthenticationToken(){
        return sessionStorage.getItem(SessionHelper.AUTHENTICATION_TOKEN)
    }

    static getCsrfToken(){
        return sessionStorage.getItem(SessionHelper.CSRF_TOKEN)
    }

}

export default SessionHelper;