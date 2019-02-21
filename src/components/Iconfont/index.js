/* ========================================================
    jason
    2019/2/20
    iconfont组件
    @使用：
      1.在页面中引入 import IconFont from '@/components/Iconfont';
      2.选择图标类名并设置图标大小  <IconFont type='icon-mendoor13' style={{fontSize: '1rem',color: 'red'}} />
          ps: 图标大小为 font-size属性，图标颜色为 color属性
    @更新图标
      icontfont中选择 symbol 矢量图， 点击生成生成在线连接，并复制链接地址来替换 scriptUrl
  ====================================================== */


import { Icon } from 'antd';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_952516_mq2dn8agwd.js'
});

export default IconFont;
