class Auth {
    constructor() {
        this.authenticated = false;
    }

    login(callBack) {
        // debugger
        this.authenticated = true;
        // callBack;
    }

    logout(callBack) {
        this.authenticated = false;
        localStorage.removeItem('token');
        // console.log("Logged out, authentication is now: ", this.isAuthenticated());
    }

    isAuthenticated(callBack) {
        return this.authenticated
    }
    
}

export default new Auth();