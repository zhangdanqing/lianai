const util = require('./util/util.js');
App({
    onLaunch: function() {
        console.log('App Launch')
        wx.setStorageSync('isMember', true);
        wx.setStorageSync('gender', -1);
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
        userInfo: {},
        bChangeI:false,
        bChangeM:false
    },
})
