/*
 此函数为登录注册静态资源
*/
let regAndLoginErrorMes = {
    phoneErroMes:"手机号错误",
    codeErrorMes:"验证码为4位数字或大小写字母组成",
    pwErrorMes:"密码长度为4-24位",
    oldPwErrorMes:"密码长度为4-24位",
    surePwErrorMes:"两次输入的密码不一致",
    nameErrorMes:"姓名仅可使用中文、英文大小写字母、数字、部分特殊符号（空格、下划线、英文括号）",
    nameErrorMes1:"姓名不能以数字或特殊字符开始",
    nameErrorMes2:"姓名长度为1-12位",
    loginNameErrorMes:"用户名仅可使用英文大小写字母、数字、下划线",
    loginNameErrorMes1:"用户名长度为1-12位",
    loginNameErrorMes2:"用户名不能以数字或特殊字符开始",
    telephoneNumber:"请输入手机号",
    codeNav:"请输入验证码",
    passwordNav:"请输入密码",
    personName:"请输入姓名",
    loginName:"请输入用户名",
    passwordOldNav:"请输入旧密码"
}
//手机号国际归属地
let countryNameArr = [
    {number:"+86","name":"中国",key:1,},
    {number:"+44","name":"英国",key:2,},
    {number:"+353","name":"法国",key:3,},
    {number:"+1","name":"美国",key:4,},
    {number:"+242","name":"巴拿马",key:5,},
    {number:"+971","name":"阿联酋",key:6,},
    {number:"+2","name":"埃及",key:7,},
];
//alert 弹窗信息
let alertMsg = {
    regOk:{
        alertImportNav:"注册成功，请等待审核",
        alertNav:"用户通过审核方可使用全部功能，可联系管理员加快审核速度"
    },
    loginNo:{
        alertImportNav:"管理员正在审核",
        alertNav:"用户通过审核方可使用全部功能，可联系管理员加快审核速度"
    },
    changePw:{
        alertImportNav:"修改成功",
        alertNav:"用户密码修改成功，请重新登录"
    }
}
//登录注册基本信息
let regAndLoginBaseMes = {
    regName:"注册您的管理账号",
    loginName:"登录",
    forgetPw:"忘记密码？",
    msgLoginName:"验证码登录",
    pwGoLogin:"密码登录",
    goReg:"注册账号",
    findBackPw:"找回密码"
    
}
//输入框的正则
let RegExpArr = {
    telReg : /^1[34578]\d{9}$/g,
    mypasswordReg : /^([0-9a-zA-Z]|[!@#$%^&*]){4,24}$/g,
    mypasswordRegs : /^([0-9a-zA-Z]|[!@#$%^&*]){4,24}$/g,
    mypasswordRegOld : /^([0-9a-zA-Z]|[!@#$%^&*]){4,24}$/g,
    codeReg : /^[0-9a-zA-Z]{4}$/g,
    nameReg : /^([\u4e00-\u9fa5a-zA-Z0-9_\(\)\s]){1,12}$/g,
    loginNameReg : /^[a-zA-Z0-9_]{1,12}$/,
}
export {regAndLoginErrorMes,countryNameArr,alertMsg,regAndLoginBaseMes,RegExpArr};