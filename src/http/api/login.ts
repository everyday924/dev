// 接口使用网络免费接口
// https://api.it120.cc/doc.html#/

import instance from '../request'

// 获取图形验证码
export const getPic = (data: Object) => {
    return instance({
        url: '/verification/pic/get',
        method: 'GET',
        params: data
    })
}

// 校验图片验证码是否正确
export const checkPic = (data: Object) => {
    return instance({
        url: '/verification/pic/check',
        method: 'POST',
        data: data
    })
}
 
// 用户登录[用户名]
export const userLogin = (data: Object) => {
    return instance({
        url: '/user/username/login',
        method: 'POST',
        data: data
    })
}