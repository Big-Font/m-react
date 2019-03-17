配置eslint：
npm i babel-eslint  eslint-config-airbnb eslint-config-standard eslint-loader eslint-plugin-import eslint-plugin-jsx-a11y  eslint-plugin-node  eslint-plugin-promise  eslint-plugin-react  eslint-plugin-standard -D


eslint 不检测这行代码 // eslint-disable-line

eslint 不检测这个文件，在开头 /* eslint-disable */在文件结尾/* eslint-enable */

安装 npm i husky -D

然后在 package.json scripts中增加git 钩子,会在执行git commit之前会调用这个命令

?
1
2
"lint": "eslint --ext .js --ext .jsx src/",
"precommit": "npm run lint"
git commit 强制执行 eslint 通过的代码

#### 主题

```
"theme": {
    "primary-color": "#25dd85",
    "link-color": "#41c95b",
    "brand-primary": "#25dd85",
    "color-text-base": "#3c4041",
    "color-link": "#25dd85"
  },
```
