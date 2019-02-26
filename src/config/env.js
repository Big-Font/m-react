/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
let baseUrl = '';
let routerMode = '';
let baseImgPath;

if (process.env.REACT_APP_SECRET_API === 'development') {
    // 开发环境  npm run build:dev
    // baseUrl = 'http://10.0.79.145:5000/api';
    baseUrl = 'http://127.0.0.1:5000/api';
    // baseUrl = 'https://qingruiserver.wangshen.top/api';
    baseImgPath = '';
} else if (process.env.REACT_APP_SECRET_API === 'test') {
    // 测试环境  npm run build:test
    baseUrl = 'https://qingruiserver.wangshen.top/api';
    baseImgPath = '';
} else if (process.env.REACT_APP_SECRET_API === 'product') {
    // 生产环境  npm run build:prod
    baseUrl = 'https://qingruiserver.wangshen.top/api';
    baseImgPath = '';
}

export {
    baseUrl,
    routerMode,
    baseImgPath
}
