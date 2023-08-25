import axios from "axios";

function login(credentials) {
    return axios.post('http://127.0.0.1:8000/api/login_check', credentials)
        .then(response => response.data.token)
        .then(token => {
            window.localStorage.setItem('authToken', token.toString());
            axios.defaults.headers['Authorization'] = "Bearer " + token;

            return true;
        });
}

function logout() {
    window.localStorage.removeItem('authToken');
    delete axios.defaults.headers['Authorization'];
}

function setUp() {
    const token = window.localStorage.getItem('authToken');
    if (token) {
        if (token.exp < (new Date()).getTime()) {
            logout();
        } else {
            axios.defaults.headers['Authorization'] = 'Bearer ' + token;
        }
    } else {
        logout();
    }
}

export default {
    login,
    logout,
    setUp
}