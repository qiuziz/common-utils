/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-11-02 14:38:52
 * @Last Modified by: zhaoyani
 * @Last Modified time: 2019-01-24 17:06:03
 */

import 'whatwg-fetch';
import { HttpDES, SED, sign } from '../common//encrypt-des';
import { Toast } from 'antd-mobile';
import { ToastInfo, getUrlParams, LocalStorage } from 'src/common';

interface ConfigType {
	loadingDelay?: number;
	des?: boolean;
	isLogin?: boolean;
	[propName: string]: any;
}

const fetchMethod = (_url: string, _config: any) => {
	const timer = setTimeout(() => {
		Toast.loading('加载中', 0);
	}, (!_config.loadingDelay && _config.loadingDelay !== 0) ? 1500 : _config.loadingDelay);

	return fetch(_url, _config)
		.then(response => {
			clearTimeout(timer);
			if (!response.ok) {
				ToastInfo('网络异常请重试');
				throw Error(response.statusText);
			}
			return response.text().then(undefined, () => Promise.resolve(''));
		})
		.then((res: any) => {
			let result: any;
			try {
				result = _config.des ? JSON.parse(SED(res)) : JSON.parse(res);
			} catch (err) {
				result = _config.des ? JSON.parse(SED(res)) : JSON.parse(res);
			}
			console.log(_url, '接口返回', result);
			Toast.hide();
			if (result.resultCode !== '0000') {
				if (result.resultCode === '2001' || result.resultCode === '2004') {
					result.resultDesc = '系统出小差了~，请返回重试';
				}
				ToastInfo(result.resultDesc);
				// throw result.resultDesc;
			}
			return result;
		})
		.catch(err => {
			throw err;
		});
};

const matchUrlSearchParams = (url: string, urlSearchParams: object) => {
	if (!urlSearchParams) {
		return url.replace(/\/:[^?]+/g, '');
	}
	let u = new URLSearchParams();
	let _url = Object.keys(urlSearchParams).reduce((pre, next) => {
		if (pre.includes(':' + next)) {
			return pre.replace(':' + next, urlSearchParams[next]);
		} else {
			if (urlSearchParams[next] && urlSearchParams[next].constructor === Array) {
				urlSearchParams[next].forEach((value: any) => {
					u.append(next, value);
				})
			} else {
				u.append(next, urlSearchParams[next]);
			}
			return pre;
		}
	}, url);
	// let u = toQueryString(urlSearchParams);
	_url = _url.replace(/\/:[^?]+/g, '');
	return _url + (u.toString() === '' ? '' : '?' + u);
};

class FetchApi {

	headers = {};
	url = '';
	constructor(_url: string) {
		this.url = _url;
		this.headers["Content-Type"] = "application/json;charset=UTF-8";
	}

	get = (urlSearchParams: object, config = { headers: this.headers }) => {
		return fetchMethod(matchUrlSearchParams(this.url, urlSearchParams), config);
	};

	post = (urlSearchParams: object, bodyParams: any, config?: ConfigType) => {
		const postConfig = { des: true, ...config };
		let result = LocalStorage.getItem('systermInfo');
		try {
			result = JSON.parse(SED(result)); //解密
		} catch {
			result = {};
		}
		const systemCode = 'CPTPA', accessToken = result.accessToken || '',
    
      timestamp = new Date().getTime();

		const signature = sign({
			systemCode,
			...bodyParams,
			accessToken,
			timestamp,
		});
		const authParams = {
			signature,
			systemCode,
			...bodyParams,
			timestamp,
		};

		console.log(matchUrlSearchParams(this.url, urlSearchParams), '请求参数', authParams);
		const _bodyParams = postConfig.des
			? { body: HttpDES(JSON.stringify(authParams)) }
			: bodyParams;
		return fetchMethod(matchUrlSearchParams(this.url, urlSearchParams),
			Object.assign({ ...postConfig, headers: this.headers }, {
				method: 'POST',
				body: JSON.stringify(_bodyParams)
			})
		);
	};

	upload = (urlSearchParams: object, bodyParams: object) => {
		return fetchMethod(matchUrlSearchParams(this.url, urlSearchParams),
			{
				method: 'POST',
				body: bodyParams
			}
		);
	};

	delete = (urlSearchParams: object, config = { headers: this.headers }) => {
		return fetchMethod(matchUrlSearchParams(this.url, urlSearchParams),
			Object.assign(config, {
				method: 'DELETE'
			})
		);
	};

	put = (urlSearchParams: object, bodyParams: object, config = { headers: this.headers }) => {
		return fetchMethod(matchUrlSearchParams(this.url, urlSearchParams),
			Object.assign({ ...config, headers: this.headers }, {
				method: 'PUT',
				body: JSON.stringify(bodyParams)
			})
		);
	};

	patch = (urlSearchParams: object, bodyParams: object, config = { headers: this.headers }) => {
		return fetchMethod(matchUrlSearchParams(this.url, urlSearchParams),
			Object.assign(config, {
				method: 'PATCH',
				body: JSON.stringify(bodyParams)
			})
		);
	}
}

const fetchResource = (url: string) => {
	return new FetchApi(url);
};

export { fetchResource };
