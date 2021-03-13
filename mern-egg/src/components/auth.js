class Auth {
    constructor() {
        this.authenticated = false
    }
    
    login(cb) {
        this.authenticated = true
        cb()
    }

    logout(cb) {
        this.authenticated = false
        cb()   
    }

    isAuthenticated() {
        return this.authenticated
    }
}

export default new Auth()

// Credit for the auth class comes from https://www.youtube.com/watch?v=Y0-qdp-XBJg&ab_channel=freeCodeCamp.org