const util = require('./util/util.js');
App({
    onLaunch: function() {
        console.log('App Launch')
        wx.login({
            success: function(res) {
                if (res.code) {
                    wx.request({
                        url: 'https://api.weixin.qq.com/sns/jscode2session',
                        data: {
							appid:'wx5a2a47bdd9497335',
							secret:'c5d1fbf42338492343f5e8c8a3e2cacf',
                            js_code: res.code
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function(res) {
                            console.log(res.data)
                        }
                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });
    },
    onShow: function() {
        console.log('App Show')
    },
    onHide: function() {
        console.log('App Hide')
    },
    globalData: {
        hasLogin: false,
        openid: null
    }
})
