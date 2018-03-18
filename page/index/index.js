const domain = getApp().globalData.domain;
const utilData = getApp().globalData.utilData;
let pageObject = {
    data: {
        memberList: [],
        imgUrls: [
            '../../img/slide1.png',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 500,
        modalHidden: true,
        toastData: {
            toastMsg: "",
        },
        isToastShow: false,
    },
    onShow: function() {
        // this.isMemberRequest();
        // this.getMemberList();
        wx.requestPayment({
            'timeStamp': '1490840662',
            'nonceStr': '5K8264ILTKCH16CQ2502SI8ZNMTM67VS	',
            'package': 'prepay_id=wx2017033010242291fcfe0db70013231072',
            'signType': 'MD5',
            'paySign': 'MD5(appId=wxd678efh567hg6787&nonceStr=5K8264ILTKCH16CQ2502SI8ZNMTM67VS&package=prepay_id=wx2017033010242291fcfe0db70013231072&signType=MD5&timeStamp=1490840662&key=qazwsxedcrfvtgbyhnujmikolp111111) = 22D9B4E54AB1950F51E0649E8810ACD6',
            success: function(res) {
                console.log(res,1111);
            },
            fail: function(res) {
                console.log(res,2222);
            }
        })
    },
    isMemberRequest: function() {
        wx.request({
            url: domain + '/isMember',
            method: 'POST',
            data: {
                openId: wx.setStorageSync('openId')
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                if (res.data && res.data.code === 0) {
                    if (res.data.data) {
                        if (res.data.data.isMember) {
                            
                        }else{
                            this.setData({
                                modalHidden: false
                            })
                        }
                    }
                } else {
                    this.toast(res.data.msg);
                }
            },
            fail: () => {
                this.toast('网络异常，请稍后再试');
            }
        })
    },
    getMemberList: function() {
        wx.request({
            url: domain + '/index',
            method: 'POST',
            data: {
                //openId: wx.setStorageSync('openId')
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                if (res.data && res.data.code === 0) {
                    this.setData({
                        memberList: res.data.data
                    })
                } else {
                    this.toast(res.data.msg);
                }
            },
            fail: () => {
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
    },
    modalBindconfirm: function() {
        wx.redirectTo({
            url: '../regist/regist'
        })
        this.setData({
            modalHidden: true
        })
    }
}
Page(pageObject)
