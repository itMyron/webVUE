import axios from "axios";
import qs from "qs";
import router from "../router";
//axios.defaults.timeout = 5000; 设置请求超时时间  
axios.defaults.baseURL = "";
let _this = this ;
//http request 拦截器
axios.interceptors.request.use(
  config => {
    //在发送请求之前做了什么
    let token = sessionStorage.getItem("myron");    //获取token值
    //config.data.token = token;
    config.data = qs.stringify(config.data);
    config.headers = { "Content-Type": "application/x-www-form-urlencoded" };
    if(token){
      config.params = {'token':token}
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  //对相应数据做点什么
  response => {
    let code = response.data.code ;
    if (code != null && code == "no_login") {
      router.push({
        path: "/login",
        querry: { redirect: router.currentRoute.fullPath } //从哪个页面跳转
      }); 
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url, data = {}) {
   return new Promise((resolve, reject) => {
     axios.post(url, data).then(response => {
         resolve(response.data);
       }, err => {
         reject(err);
       });
   });
 }

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      });
  });
}
