const domain = getApp().globalData.domain;
const utilData = getApp().globalData.utilData;
let pageObject = {
    data: {
        memberList:[],
        imgUrls: [
            '../../img/slide1.png',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 500
    },
    onShow: function() {
        this.isMemberRequest();
        this.getMemberList();
    },
    isMemberRequest:function(){
        wx.request({
            url: domain + '/isMember',
            method: 'POST',
            data: {
                openId: wx.setStorageSync('openId')
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                if (res.data && res.data.code === 0) {
                    if (res.data.data) {
                        if (!res.data.dataisMember) {
                            wx.redirectTo({
                                url: '../regist/regist'
                            })
                        }
                    }
                } else {
                    this.toast(res.data.msg);
                }
            },
            fail: function(err) {
                this.toast('网络异常，请稍后再试');
            }
        })
    },
    getMemberList:function(){
        wx.request({
            url: domain + '/index',
            method: 'POST',
            data: {
                //openId: wx.setStorageSync('openId')
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                if (res.data && res.data.code === 0) {
                    this.setData({
                        memberList: res.data.data
                    })
                } else {
                    this.toast(res.data.msg);
                }
            },
            fail: function(err) {
                this.toast('网络异常，请稍后再试');
            }
        })
    },
    searchJump: function() {
        wx.navigateTo({
            url: '../search/search'
        })
    },
    viewAll: function() {
        wx.navigateTo({
            url: '../viewAll/viewAll'
        })
    },
    toast: function(content) {
        utilData.toast(content, 'toastData.toastMsg', 'isToastShow', this);
    }
}
Page(pageObject)
