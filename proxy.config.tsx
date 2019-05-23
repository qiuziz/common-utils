const PROXY_CONFIG = {
	"proxy": {
		// "/(v6_1|api)/": {
		// 	// "target": "http://172.16.10.11:8082", //WZQ
		// 	"target": "https://test.chengniu.com",
		// 	"secure": false
		// },
		// "/activity": {
		// 	"target": "http://172.16.10.14:8084", //LP
		// 	"secure": false
		// },
		"/activity": {
      		"target": "https://test.chengniu.com",
			// "target": "http://172.16.10.11:8082", //WZQ
			// "target": "http://47.99.164.211:9104",
			"secure": false
		}
	}
}
module.exports = PROXY_CONFIG;