function initData() {
    // 初始化页面数据
}

function addEvent() {
    $('#payBtn').on('click', function(){
        CallAPPFunction.pay({}); // 调用APP方法
    });
}


Zepto(function($){
    this.initData(); // 初始化数据
    this.addEvent(); // 绑定事件
});