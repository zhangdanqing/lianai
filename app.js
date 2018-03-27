const util = require('./util/util.js');
App({
    onLaunch: function() {
        console.log('App Launch')
        wx.setStorageSync('isMember', true);
        wx.setStorageSync('isRegist', false);
        this.wxLogin();
        wx.getUserInfo({
            success: function(res) {
                //wx.setStorageSync('userName', res.userInfo.nickName);
                //wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl);
            }
        })
    },
    globalData: {
        hasLogin: false,
        domain: "https://lianai.situdata.com/sofaindb/ailian",
        domain2: "https://www.lianaii.top/sofaindb/ailian",
        utilData: util,
        userInfo: {}
    },
    isMemberRequest: function() {
        let dataObj = {
            open_id: wx.getStorageSync('openId')
        }
        wx.request({
            url: this.globalData.domain + '/is_member',
            method: 'POST',
            data: dataObj,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                if (res.data && res.data.code === 0) {
                    if (res.data.data) {
                        wx.setStorageSync('isMember', res.data.data.isMember);
                        if (res.data.data.isMember) {
                            this.getUser();
                        }
                    }
                }
            },
            fail: () => {}
        })
    },
    getUser: function() {
        let dataObj = {
            open_id: wx.getStorageSync('openId')
        }
        wx.request({
            url: this.globalData.domain + '/getinfo_by_openid',
            method: 'POST',
            data: dataObj,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                if (res.data && res.data.code === 0) {
                    if (res.data.data) {
                        wx.setStorageSync('gender', res.data.data.gender);
                        wx.setStorageSync('name', res.data.data.name);
                        this.globalData.userInfo = res.data.data;
                    }
                } else if (res.data.code === -1) {
                    wx.setStorageSync('gender', -1);
                }
            },
            fail: () => {}
        })
    },
    wxLogin:function(){
        wx.login({
            success: (res) => {
                if (res.code) {
                    let dataObj={
                        js_code: res.code
                    }
                    wx.request({
                        url: this.globalData.domain + '/get_open_id',
                        method: 'POST',
                        data: dataObj,
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: (res) => {
                            wx.setStorageSync('openId', res.data.openid);
                            this.isMemberRequest();
                        }
                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });
    }
})
