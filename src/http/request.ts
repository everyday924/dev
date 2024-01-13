// http 配置

import axios from 'axios';
import qs from 'qs';
import { ElMessage } from 'element-plus'

const instance = axios.create({
    baseURL: 'https://api.it120.cc/api/',
    timeout: 5000,
    headers: {
      'Access-Control-Allow-Origin' : '*', 
      'Content-Type' : 'application/json;charset=UTF-8'
    }
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers['token'] = ''
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return qs.parse(response);
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    ElMessage.error(error)
    return Promise.reject(error);
  });

export default instance;
