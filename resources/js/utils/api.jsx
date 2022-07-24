import axios from "axios";

const api= axios.create({
    baseURL:'http://localhost:8000/api'
});

api.defaults.headers.common['Accept']='application/json';
api.defaults.withCredentials=true;

export default api;