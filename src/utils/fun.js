/**
公共方法
 */

var fun = {
	//数组分级===================================
	//this.fun.chunk(json.data.category,8);
	chunk: function (arr, n) {
		var result = [];
		for (var i = 0, len = arr.length; i < len; i += n) {
			result.push(arr.slice(i, i + n));
		};
		return result;
	},

	//判断是否是空
	isTextEmpty: function (str) {
		if ((str == null) || (str == "") || (str == undefined)) {
			return true;
		} else {
			return false;
		}
	},
  getSiteRootAdmin: function () {
    return document.location.protocol + '//' + window.location.host + '/admin.html';
  },
  getSiteRoot: function () {
    return document.location.protocol + '//' + window.location.host;
  },
	getKey: function (name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
	},

	getKeyByMicroShopId: function () {
		return this.getKey('shop_id');
	},
	getToken: function () {
		return this.getKey('token');
	},
	getType: function () {
		var ua = window.navigator.userAgent.toLowerCase();
		if (window.isMiniprogram || this.getToken()) {
			// 小程序
			return "2";
		}
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			// 微信浏览器
			return "1";
		} else if (this.isApp()) {
			return "7";
		} else if (this.isAlipay()) {
			return "8";
		} else {
			return "5";
		}
	},

  getUrl: function (name, params, query) {
    return {
      name,
      params,
      query
    }
  },

	getRealUrl: function (url, params) {
		let type = this.getType();
		let shop_id = this.getKeyByMicroShopId();
		let baseUrl = '';
		baseUrl = '/addons/yun_shop/api.php?type=' + type + '&shop_id=' + shop_id + '&route=';

		if (params) {
			let paramsArray = [];
			Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
			url += '&' + paramsArray.join('&');
			url = baseUrl + url;
		} else {
			url = baseUrl + url;
		}

		return url;
	},
  //设置标题
  setTitle: function (title) {
    document.title = title;
  },
  setIcon: function(icon){
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = icon;
    document.getElementsByTagName('head')[0].appendChild(link);
  },
	//如果为空
	isNonEmpty: function (value, errorMsg) {
		return value === '' ?
			errorMsg : void 0
	},
	//最小长度
	minLength: function (value, length, errorMsg) {
		return value.length < length ?
			errorMsg : void 0
	},
	//是否手机
	isMoblie: function (value) {
		//return !/^1(3|5|7|8|9)[0-9]{9}$/.test(value);
		return !/^1\d{10}$/.test(value);
	},
	//是否Email
	isEmail: function (value, errorMsg) {
		return !/^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) ?
			errorMsg : void 0
	},
	//是否为URL链接
	isUrl: function () {
		return !/^((https|http):\/\/).+$/g.test(value) ?
			errorMsg : void 0
	},

	changeUrlArg: function (url, arg, val) {
		var pattern = arg + '=([^&]*)';
		var replaceText = arg + '=' + val;
		return url.match(pattern) ? url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url + '&' + replaceText : url + '?' + replaceText);
	},

	delQueStr: function (url, ref) //删除参数值
	{
		var str = "";
		if (url.indexOf('#') != -1) {
			console.log("aaaa", url.indexOf('#'));
			str = url.substr(url.indexOf('#') + 1);
			console.log("urlTga", str);
		} else {
			return url;
		}

		var arr = "";
		var returnurl = "";
		var setparam = "";
		if (str.indexOf('&') != -1) {
			arr = str.split('&');
			console.log("arr", arr);


			for (let i = 0; i < arr.length; i++) {
				console.log("arr==i", arr[i]);
				if (arr[i].split('=')[0] != ref) {
					returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
				}
			}
			console.log("returnurl", returnurl);
			return url.substr(0, url.indexOf('?')) + "?#" + returnurl.substr(0, returnurl.length - 1);
		} else {
			arr = str.split('=');
			if (arr[0] == ref)
				return url.substr(0, url.indexOf('?'));
			else
				return url;
		}

	},
	//判断URL链接中是否有shop_id如果有
	isShopId: function (url, val) {
		if (url.indexOf("shop_id=") >= 0) {
			return this.changeUrlArg(url, 'shop_id', val);
		} else {
			let burl = this.delQueStr(url, 'shop_id');
			return this.changeUrlArg(burl, 'shop_id', val);
		}

	},
	//获取时间戳
	getTimestamp(vales) {
		var timestamp = Date.parse(new Date(vales));

		return timestamp / 1000;
	},

	// 判断是否为金额
	isPriceNumber: function (obj) {
		var isNum = /^\d+(\.\d+)?$/;
		if (!isNum.test(obj)) {
			return false;
		} else {
			return true;
		}
	},


	funHrefFilters(url) {
		if ((url == null) || (url == "") || (url == undefined)) {
			return "javascript:;";
		}
		let host = document.location.host
		//let mid=decodeURIComponent((new RegExp('[?|&]' + "mid" + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
		let mid = window.localStorage.getItem('uid');
		if (url.indexOf(host) >= 0) {
			return url + "&mid=" + mid;
		} else {
			return url;
		}
	},

	funHrefFilters1(url) {
		if ((url == null) || (url == "") || (url == undefined)) {
			return "javascript:;";
		}
		let mid = window.localStorage.getItem('uid');

		return url + "&mid=" + mid;
	},

	//替换url中的值
	changeURLArg(url, arg, arg_val) {
		var pattern = arg + '=([^&]*)';
		var replaceText = arg + '=' + arg_val;
		if (url.match(pattern)) {
			var tmp = '/(' + arg + '=)([^&]*)/gi';
			tmp = url.replace(eval(tmp), replaceText);
			return tmp;
		} else {
			if (url.match('[\?]')) {
				return url + '&' + replaceText;
			} else {
				return url + '?' + replaceText;
			}
		}
		return url + '\n' + arg + '\n' + arg_val;
	},

	//判断当前web环境 5代表pc浏览器环境 2代表小程序环境 1代表微信公众号网页环境
	//判断是否是小程序----res.miniprogram为true代表在小程序里,false代表在公众号里
	getWebEnv() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			wx.miniProgram.getEnv(function (res) {
				if (res.miniprogram) {
					return "2"
				} else {
					return "1"
				}
			})
		} else {
			return "5"
		}
	},

	//判断微信下ios和安卓 ios为1 安卓为2 其他3
	getPhoneEnv() {
		var u = navigator.userAgent, app = navigator.appVersion;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
		var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if (isAndroid) {
			return "2";
		} else if (isIOS) {
			return "1";
		} else {
			return "3";
		}
	},









}
export default fun;
