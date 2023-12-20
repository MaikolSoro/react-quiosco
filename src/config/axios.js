import axios from "axios";

const clientAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept' : 'application/json',
        'X-Request-With': 'XMLHttpRequest'
    },
    withCredentials:true

})

export default clientAxios