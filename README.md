# Common Utils

#### Usage

```
git clone https://github.com/qiuziz/common-utils.git

cd common-utils

yarn
# or
npm i

yarn start
# or
npm start
```

#### Build
```
# 测试环境
yarn build
# or
npm run build

# 正式环境
yarn prod
# or
npm run prod
```
 
#### 与APP交互

页面通过 pageType 来区分
数据统一用data来获取


js调用APP

```js
import { callAppRouter } from 'src/common/webViewJavascriptBridge';
  
  		...
  		
callAppRouter('setValue', {pageType: '1', data: {}}, (res: any) => {
	 // do sth
});
```

APP调用js

```js
import { registerRouter, unRegisterRouter } from 'src/common/webViewJavascriptBridge';

 		...

registerRouter('getValue', (res: any) => {
    if (res.pageType === '1') {
    	// do sth
    } else {
    	// do sth
    }
})
```

#### dev proxy

在项目下的`proxy.config.tsx`中配置本地代理
