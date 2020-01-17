var CallAPPFunction = {
    init: function () {
        this.InBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]'; // 当前页面是否在浏览器中
        this.UA = this.InBrowser && window.navigator.userAgent.toLowerCase(); // navigator-浏览器相关信息；-userAgent-浏览器的user-agent信息
        this.IsAndroid = this.UA && this.UA.indexOf('android') > -1; // 是否是android机
        this.IsIOS = this.UA && /(iphone|ipad|ipod|ios)/i.test(this.UA); // 是否是ios机
	},
    //调用苹果方法
    CallIOSFunction: function (action, param) {
        var returnData = "";
        try {
            switch (action) {
                case "pay":
                    window.webkit.messageHandlers.pay.postMessage(param);
                    break;
                case "card":
                    window.webkit.messageHandlers.card.postMessage(param);
                    break;
                default:
                    console.log("对此方法未进行处理");
            }
        } catch (e) {
            console.log("调用APP方法失败");
        }
        return returnData;
    },
    //调用安卓方法
    CallAndroidFunction: function (action, param) {
        try {
            switch (action) {
                case "pay":
                    window.android.card(JSON.stringify(param).replace(/&amp;/g, "&"));
                    break;
                case "card":
                    window.android.pay();
                    break;
                default:
                    console.log("对此方法未进行处理");
            }
        } catch (e) {
            console.log("调用APP方法失败");
        }
    },
    //app支付
    pay: function (query) {
        if (this.IsIOS) {
            this.CallIOSFunction("pay", query);
        } else if(this.IsAndroid) {
            this.CallAndroidFunction("pay", query);
        }
    }
};
CallAPPFunction.init();