import Promise from './promise';

function formatTime(time) {
    if (typeof time !== 'number' || time < 0) {
        return time
    }

    var hour = parseInt(time / 3600)
    time = time % 3600
    var minute = parseInt(time / 60)
    time = time % 60
    var second = time

    return ([hour, minute, second]).map(function(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    }).join(':')
}

function formatLocation(longitude, latitude) {
    if (typeof longitude === 'string' && typeof latitude === 'string') {
        longitude = parseFloat(longitude)
        latitude = parseFloat(latitude)
    }

    longitude = longitude.toFixed(2)
    latitude = latitude.toFixed(2)

    return {
        longitude: longitude.toString().split('.'),
        latitude: latitude.toString().split('.')
    }
}

//弹窗
const toast = (content, toastText, isToastShow, that) => {
    that.setData({
        [toastText]: content,
        isToastShow: true,
    });
    setTimeout(() => {
        closeToast(toastText, isToastShow, that);
    }, 2000)
}
const closeToast = (toastText, isToastShow, that) => {
    that.setData({
        [toastText]: "",
        isToastShow: false,
    });
}
/**
 * 将小程序的API封装成支持Promise的API
 * @params fn {Function} 小程序原始API，如wx.login
 */
 function wxPromisify(fn) {
   return function (obj = {}) {
     return new Promise((resolve, reject) => {
       obj.success = function (res) {
         //成功
         resolve(res)
       }
       obj.fail = function (res) {
         //失败
         reject(res)
       }
       fn(obj)
     })
   }
 }
 //无论promise对象最后状态如何都会执行
 Promise.prototype.finally = function (callback) {
   let P = this.constructor;
   return this.then(
     value => P.resolve(callback()).then(() => value),
     reason => P.resolve(callback()).then(() => { throw reason })
   );
 };

module.exports = {
    formatTime: formatTime,
    formatLocation: formatLocation,
    toast: toast,
    wxPromisify: wxPromisify
}
