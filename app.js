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
                            appid: 'wx5a2a47bdd9497335',
                            secret: 'c5d1fbf42338492343f5e8c8a3e2cacf',
                            js_code: res.code
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function(res) {
                            console.log(res.data)
                            wx.setStorageSync('openId', res.data.openid);
                        }
                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });
        wx.getUserInfo({
            success: function(res) {
                // var userInfo = res.userInfo
                // var nickName = userInfo.nickName
                // var avatarUrl = userInfo.avatarUrl
                // var gender = userInfo.gender //性别 0：未知、1：男、2：女
                // var province = userInfo.province
                // var city = userInfo.city
                // var country = userInfo.country
                //console.log(1111,res.userInfo);
                wx.setStorageSync('userName',res.userInfo.nickName);
                wx.setStorageSync('avatarUrl',res.userInfo.avatarUrl);
            }
        })
    },
    onShow: function() {
        console.log('App Show')
    },
    onHide: function() {
        console.log('App Hide')
    },
    globalData: {
        hasLogin: false,
        domain: "https://www.lianaii.top:9147/sofaindb/ailian",
        utilData: util,
    }
})
