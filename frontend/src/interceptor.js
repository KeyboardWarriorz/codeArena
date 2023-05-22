import axios from 'axios';

// 요청 전 처리
const api = axios.create({

    baseURL: "http://localhost:8080",
    headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
    },
    withCredentials: true,
});

api.interceptors.request.use(
    function (config) {
        // 요청 전에 원하는 동작을 수행할 수 있습니다.
        // 예: 헤더에 토큰을 추가하는 등
        console.log("interceptor called");
        const access_token = window.localStorage.getItem("accessToken");
        const refresh_token = window.localStorage.getItem("refreshToken");
        if (access_token) {
            config.headers.access_token = access_token;
            config.headers.refresh_token = refresh_token;
            console.log(config)
            return config
        }
        console.log(config)
        return config
    },
    function (error) {
        return Promise.reject(error);
    }
);

// 응답 후 처리
api.interceptors.response.use(
    function (response) {
        // 응답 후에 원하는 동작을 수행할 수 있습니다.
        // 예: 응답 데이터 가공 등
        const responseValue = response.headers["refreshToken"];
        console.log(responseValue)
        if (responseValue) {
            window.localStorage.setItem("refreshToken", responseValue);
        }
        return response;
    },
    function (error) {
        if (error.response && error.response.status === 401) {
            // 410 Unauthorized 에러 처리
            // 예: 로그아웃, 세션 만료 등의 동작 수행
            window.alert('세션이 만료되었습니다');
            // 원하는 동작 수행
            window.localStorage.clear();
        }
    }
);


export default api;