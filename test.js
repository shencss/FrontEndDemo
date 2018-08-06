function getUrlParam(sUrl, sKey) {
    var obj = {};
    if (sUrl.indexOf('?') == -1) {
        if (sKey) {
            return '';
        } else {
            return obj;
        }
    }
    var param = sUrl.split('#')[0].split('?')[1];
    var paramArray = param.split('&');
    for (var i = 0, len = paramArray.length; i < len; i++) {
        var keyValue = paramArray[i].split('=');
        var key = keyValue[0], value = keyValue[1];
        if (obj.hasOwnProperty(key)) {
            if (Array.isArray(obj[key])) {
                obj[key].push(value);
            } else {
                obj[key] = [obj[key],value];
            }
        } else {
            obj[key] = value;
        }
    }
    if (sKey) {
        return obj[sKey] ? obj[sKey] : '';
    } else { 
        return obj;
    }
}

console.log(getUrlParam('http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe'));