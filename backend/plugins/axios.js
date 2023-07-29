const axios = require("axios").default;

const instance = axios.create({
    baseURL: "https://api.fifa.com/api/v3",
    headers: {
        'Accept': '*/*',
        'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
        'Content-Type': 'application/json',
    }
});

instance.defaults.withCredentials = true;
instance.defaults.headers.common['responseEncoding'] = 'gzip';
instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

instance.interceptors.response.use(
    // Tout code d'état qui se situe dans la plage de 2xx provoque le déclenchement de cette fonction
    function (response) {
        return response;
    },

    // Tout code d'état qui sort de la plage de 2xx provoque le déclenchement de cette fonction
    function (error) {
        if (error.response) {
            // The request was made but an response was received
            if (error.response.status == 401) {
                // If authentication is required and the user is not authenticated
                console.log("ATHENTICATION ERROR");
            } else {
                return Promise.reject({
                    serverResponse: true,
                    code: error.code,
                    message: error.message,
                    responseData: error.response.data,
                });
            }
        } else if (error.request) {
            // The request was made but no response was received
            return Promise.reject({
                serverResponse: false,
                code: error.code,
                message: error.message
            })
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Development Error', error.message);
        }
    }
);

module.exports = instance;
