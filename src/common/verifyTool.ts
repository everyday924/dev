// 正则校验

//用户名正则，4到16位（字母，数字，下划线，减号）
const userReg = /^[a-zA-Z0-9_-]{4,16}$/;

//密码至少包含 数字和英文，长度6-20
const passReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;

export {
    userReg,
    passReg
}