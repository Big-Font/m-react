/* ========================================================

    李雪魁
    2018/12/31
    数据状态

    ** 全局Store **
    直接实例化，在 ./index.js 通过 Provider 渗透。
    在模块内用 @inject('Store')，将 Store 注入到 props 上。
    哪里用，哪里 @inject('Store')。

    注意：无论是全局 Store，还是局部 store，必须 @inject('xxx')注入到 props 上才能获取，保证结构的一致性。
   ====================================================== */

// 总状态管理页面
import commonState from './common';
const stores = {
	commonState,
};//合成数据暴露在全局
export default  stores;
