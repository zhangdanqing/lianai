const util = require('./util/util.js');
App({
    onLaunch: function() {
        console.log('App Launch')
        wx.login({
            success:(res)=>{
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
                        success: (res)=>{
                            console.log(res.data.openid)
                            wx.setStorageSync('openId', res.data.openid);
                            this.getUser(res.data.openid);
                        }
                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });
        wx.getUserInfo({
            success: function(res) {
                wx.setStorageSync('userName',res.userInfo.nickName);
                wx.setStorageSync('avatarUrl',res.userInfo.avatarUrl);
            }
        })
    },
    getUser:function(openId){
        wx.request({
            url: this.globalData.domain + '/getinfo_by_openid',
            method: 'POST',
            data: {
                open_id: openId
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                if (res.data && res.data.code === 0) {
                    if (res.data.data) {
                        wx.setStorageSync('gender',res.data.data.gender);
                    }
                } else if(res.data.code === -1){
                    wx.setStorageSync('gender',"");
                }
            },
            fail: () => {
            }
        })
    },
    globalData: {
        hasLogin: false,
        domain: "https://www.lianaii.top/sofaindb/ailian",
        utilData: util,
    }
})
