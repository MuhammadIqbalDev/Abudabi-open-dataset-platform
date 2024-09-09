import axios from "axios";

let request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

const client = {
    get: (url, options = {}) => request.get(url, { ...options }),
    post: (url, data, options = {}) => request.post(url, data, { ...options }),
    put: (url, data, options = {}) => request.put(url, data, { ...options }),
    delete: (url, options = {}) => request.delete(url, { ...options })
};

export { client };
