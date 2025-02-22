import axios from "axios";


axios.defaults.baseURL = 'http://localhost:8000/admin/';
axios.defaults.headers.post["Accept"] = "application/json";
axios.interceptors.request.use(function (config) {
    if (localStorage.getItem('admin_token')) {
        config.headers.Authorization = `${localStorage.getItem('admin_token') ?? ''}`;
    }
    return config;
});

//check user login or not
axios.interceptors.response.use((response) => {
    if (response?.data?.message == 'jwt must be provided') {
        router.push('/login');
    }
    return response;
}, (error) => {
    if (error.response.status === 401) {
        // localStorage.removeItem('token');
        // localStorage.removeItem('user');
        console.log('ok');
    }
    return error;
});


window.axios = axios;

