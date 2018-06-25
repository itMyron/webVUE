import {ENV} from './constants.js';
//import eventBus from './bus.js';
const network = {
    ApiError: function (status, code, msg) {
        this.status = status;
        this.code = code;
        this.message = msg;
    },

    GetErrorMessage(error, genericMessage) {
        let message = genericMessage;
        if (error instanceof network.ApiError) {
            if (error.status === 200 || error.status === 400) {
                message = error.message;
            } else if (error.status === undefined && error.message !== '') {
                message = error.message;
            }
        } else if (error instanceof TypeError && !navigator.onLine) {
            message = '请检查您的网络链接。'
        }

        return message;
    },

    firstResponseHandler: (response) => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 403) {
            console.log('登录信息错误')
            localStorage.loginFlag = false;
            localStorage.cell = '';
        //    eventBus.$emit('goToHomepage')
            return response.text();
        } else {
            // return response.text();
            // response.text().then((msg) => {
            //     throw new network.ApiError(response.status, -1, msg);
            // });
            throw new network.ApiError(response.status, -1, response.statusText);
        }
    },

    secondResponseHandler: (okHandler,url,data) => {
        return (response) => {
            if (typeof response === 'string') {
                throw new network.ApiError(response.status, -1, response);
            }

            if (response.code === 0) {
                if (okHandler) {
                    okHandler(response);
                    let properties ={};
                    if(data){
                      if(data['password']){
                        delete data['password']
                      }
                      properties = Object.assign({url:url},data);
                    }else{
                      properties ={
                        url:url
                      }
                    }
                }
            } else {
                throw new network.ApiError(200, response.code, response.message);
            }
        }
    },

    catchHandler: (errHandler) => {
        return (err) => {
            if (errHandler) {
                errHandler(err);
            }
        }
    },

    PostCall: function (url, data, okHandler = null, errHandler = null) {
        let body = Object.keys(data).reduce(function (prev, key) {
            let value_str = "";
            if (data[key] != null && data[key] != undefined) {
                value_str = data[key].toString()
            }

            let segment = encodeURIComponent(key.toString()) + "=" + encodeURIComponent(value_str);
            if (prev.length === 0) {
                return segment;
            } else {
                return prev + "&" + segment;
            }

        }, "");

        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: body,
            credentials: 'include'
        }).then(network.firstResponseHandler).then(network.secondResponseHandler(okHandler,url,data)).catch(network.catchHandler(errHandler))
    },

    formDataCall: function (url, data, okHandler = null, errHandler = null) {
      // data.append('user_id',2);
        fetch(url, {
            method: 'POST',
            body: data,
            credentials: 'include'
        }).then(network.firstResponseHandler).then(network.secondResponseHandler(okHandler,url)).catch(network.catchHandler(errHandler))
    },

    GetCall: function (url, params, okHandler = null, errHandler = null) {
        // var params = Object.assign({
        //     user_id: 2
        // }, params);
        let query_param = Object.keys(params).reduce(function (prev, key) {
            let value_str = "";
            if (params[key] != undefined && params[key] != null) {
                value_str = params[key].toString()
            }
            let segment = encodeURIComponent(key.toString()) + "=" + encodeURIComponent(value_str);
            if (prev.length === 0) {
                return segment;
            } else {
                return prev + "&" + segment;
            }

        }, "");

        let queryUrl = url + "?" + query_param

        fetch(queryUrl, {
            method: 'GET',
            credentials: 'include'
        }).then(network.firstResponseHandler).then(network.secondResponseHandler(okHandler,url,params)).catch(network.catchHandler(errHandler))
    }
}

module.exports = network;
