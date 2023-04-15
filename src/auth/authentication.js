import axios from "axios"
class Authentication {
    logIn(data){
        return axios.post('http://157.230.231.198/api/v1/admin/login',data)
    }

    logOut(){
        localStorage.removeItem('token');
    }

    isAuthinticated(){
        return localStorage.getItem('token');
    }
}

export default new Authentication()