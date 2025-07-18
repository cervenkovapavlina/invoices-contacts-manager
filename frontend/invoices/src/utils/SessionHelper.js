const SESSION_FLAG = "isAuthenticated";
const TOKEN = "token";

class SessionHelper {
    static open(){
        sessionStorage.setItem(SESSION_FLAG, true); // TODO Bezpecnostni riziko, jde obejit nastavenim primo v konzoli
    }

    static close(){
        sessionStorage.setItem(SESSION_FLAG, false); // TODO Bezpecnostni riziko, jde obejit nastavenim primo v konzoli
    }

    static isOpen(){
        let flag = sessionStorage.getItem(SESSION_FLAG);
        return flag && flag.toLowerCase() === "true"
    }

    static setToken(token){
        sessionStorage.setItem(TOKEN, token);
    }

    static getToken(){
        return sessionStorage.getItem(TOKEN)
    }
}

export default SessionHelper;