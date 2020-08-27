function ajax(method, url, params, boolean) {
    var xhr;
    var receivedData;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest(); //创建 XMLHttpRequest 对象
    }
    else {
        xhr = new ActiveXObject("Microsoft XMLHTTP");
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // console.log(xhr.responseText);
            showContent("robot", xhr.responseText);   //获取数据后，调用显示函数
        }
    }

    if (method == "GET") {
        xhr.open(method, `${url}?${params}`, boolean);  //设置请求类型、URL、是否异步
        xhr.send();     //将请求发送到服务器
    }
    else if (method == "POST") {
        xhr.open(method, url, boolean);     //设置请求类型、URL、是否异步
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");  //向请求添加 HTTP 头
        xhr.send(params);   //将请求发送到服务器
    }
}


