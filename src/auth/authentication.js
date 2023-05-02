import axios from "axios"
class Authentication {
    logIn(data){
        return axios.post('https://nisbaty.com/api/v1/admin/login',data)
    }

    logOut(){
        localStorage.removeItem('token');
    }

    isAuthinticated(){
        return localStorage.getItem('token');
    }
}

export default new Authentication()