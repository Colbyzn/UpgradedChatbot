
var deviceWidth = window.screen.availWidth;     //获取设备可用宽度
// var deviceHeight = window.screen.availHeight;   //获取设备可用高度
var deviceHeight = window.innerHeight;   //获取网页视口高度

var containerWidth = deviceWidth;
var containerHeight = deviceHeight;
var headerHeight = 0.15 * containerHeight;
var chatInterfacePadding = 0.03 * containerWidth;
var chatInterfaceWidth = containerWidth - 2 * chatInterfacePadding;
var chatInterfaceHeight = containerHeight - headerHeight - chatInterfacePadding;
var htmlFontSize = 0.022 * deviceWidth;

$(document).ready(function () {
    //自适应屏幕
    prepareForMobile();
    //监听事件
    listenForEvents();
    
});

function prepareForMobile() {
    if (deviceWidth > 650) {
        containerWidth = 650;
        containerHeight = 650;
        headerHeight = 100;
        chatInterfaceHeight = 500;
    }
    else {

        $(".container").css("width", deviceWidth);
        $(".container").css("height", deviceHeight);
        $(".header").css("height", headerHeight);
        $(".header").css("margin-top", "0");
        $("#chat-interface").css("padding-top", chatInterfacePadding);
        $("#chat-interface").css("padding-right", chatInterfacePadding);
        $("#chat-interface").css("padding-bottom", "0");
        // $("#chat-interface").css("padding-bottom", chatInterfacePadding);
        $("#chat-interface").css("padding-left", chatInterfacePadding);
        $("#chat-interface").css("width", chatInterfaceWidth);
        $("#chat-interface").css("height", chatInterfaceHeight);
        $("html").css("font-size", htmlFontSize);
    }
}

function listenForEvents() { 
    $(".input-box").keyup(function (event) {
        if (event.keyCode == 13) {
            $(".send-button").trigger("click");  //当按下回车键时，触发发送按钮的点击事件
        }
    });

    $(".send-button").click(function () {
        var inputBoxValue = $(".input-box").val();  //获取文本输入框的值
        if (inputBoxValue !== "") {
            showContent("user", inputBoxValue);     //将获取的数据显示到前端聊天界面
            $(".input-box").val("");                //发送数据后，清除输入框中的值
            requestResponseData(inputBoxValue);     //请求响应数据
        }
    })
}

/* 将数据显示到前端的聊天界面中 */
function showContent(who, value) {
    //当获取到的值是 JSON 数据格式的时候，将 JSON 数据解析成对象
    if (isJsonString(value)) {
        value = JSON.parse(value).text;
    }

    //使用 ES6 的字符串模板拼接字符串
    $(".chat-content").append(`
        <div class="${who}">
            <div class="${who}-avatar"></div>
            <div class="${who}-text">${value}</div>
        </div>
    `);

    // 使聊天界面的滚动条自动滚到最底部
    $('.chat-content').scrollTop($('.chat-content')[0].scrollHeight - $('.chat-content')[0].clientHeight);
}

/* 判断返回的响应数据是否为 JSON 数据格式 */
function isJsonString(str) {
    try {
        if (typeof JSON.parse(str) == "object") {
            return true;
        }
    } catch(e) {
    }
    return false;
}

/* 请求响应数据 */
function requestResponseData(value) {
    var url = "http://www.tuling123.com/openapi/api";
    var method = "GET";
    var params = "key=200d418a80b44487a243dbbace21cfd6&info=" + value;
    ajax(method, url, params, true);    //请求响应数据
}
