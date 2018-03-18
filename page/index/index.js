const domain = getApp().globalData.domain;
const utilData = getApp().globalData.utilData;
wx.setStorageSync('isMember', false);
let page = 0;
let bFlag = true;
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
        isMember: false,
        gender: "",
        unLock: true,
    },
    onShow: function() {
        this.setData({
            unLock: true
        });
        // this.getMemberList();
        // wx.requestPayment({
        //     'timeStamp': '1490840662',
        //     'nonceStr': '5K8264ILTKCH16CQ2502SI8ZNMTM67VS	',
        //     'package': 'prepay_id=wx2017033010242291fcfe0db70013231072',
        //     'signType': 'MD5',
        //     'paySign': 'MD5(appId=wxd678efh567hg6787&nonceStr=5K8264ILTKCH16CQ2502SI8ZNMTM67VS&package=prepay_id=wx2017033010242291fcfe0db70013231072&signType=MD5&timeStamp=1490840662&key=qazwsxedcrfvtgbyhnujmikolp111111) = 22D9B4E54AB1950F51E0649E8810ACD6',
        //     success: function(res) {
        //         console.log(res,1111);
        //     },
        //     fail: function(res) {
        //         console.log(res,2222);
        //     }
        // })
        this.isMemberRequest();
        this.getMemberList();
    },
    isMemberRequest: function() {
        wx.request({
            url: domain + '/isMember',
            method: 'POST',
            data: {
                openId: wx.getStorageSync('openId')
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                if (res.data && res.data.code === 0) {
                    if (res.data.data) {
                        this.setData({
                            isMember: res.data.data.isMember
                        })
                        wx.setStorageSync('isMember', res.data.data.isMember);
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
        if (!this.data.unLock) {
            return;
        }
        let dataObj = {
            gender: wx.getStorageSync('gender'),
            sequence: page
        }
        if (bFlag) {
            bFlag = false;
            wx.request({
                url: domain + '/recommendation',
                method: 'POST',
                data: JSON.stringify(dataObj),
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: (res) => {
                    if (res.data && res.data.code === 0) {
                        let list = this.data.memberList;
                        for (let i = 0; i < res.data.data.length; i++) {
                            list.push(res.data.data[i]);
                        }
                        this.setData({
                            memberList: list
                        });
                    } else if (res.data.code === -1) {
                        this.setData({
                            unLock: false
                        });
                    } else {
                        this.toast(res.data.msg);
                    }
                },
                fail: () => {
                    this.toast('网络异常，请稍后再试');
                },
                complete: () => {
                    bFlag = true;
                    wx.stopPullDownRefresh();
                }
            })
        }
    },
    onReachBottom: function() {
        page++;
        this.getMemberList();
    },
    searchJump: function() {
        let searchJump = function() {
            wx.navigateTo({
                url: '../search/search'
            })
        }
        this.jumpToRegist(searchJump);
    },
    viewAll: function() {
        let viewAllJump = function() {
            wx.navigateTo({
                url: '../viewAll/viewAll'
            })
        }
        this.jumpToRegist(viewAllJump);
    },
    toast: function(content) {
        utilData.toast(content, 'toastData.toastMsg', 'isToastShow', this);
    },
    modalBindconfirm: function() {
        wx.navigateTo({
            url: '../regist/regist'
        })
        this.setData({
            modalHidden: true
        })
    },
    jumpToRegist: function(fn) {
        if (!this.data.isMember) {
            this.setData({
                modalHidden: false
            })
        } else {
            fn();
        }
    }
}
Page(pageObject)
