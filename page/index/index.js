const domain = getApp().globalData.domain;
const utilData = getApp().globalData.utilData;
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
        gender: "",
        unLock: true,
        hidden: true,
    },
    onShow: function() {
        let isRegist=wx.getStorageSync('isRegist');
        if(isRegist){
            this.setData({
                memberList: []
            });
            this.getMemberList();
            wx.setStorageSync('isRegist', false);
        }
    },
    onLoad:function(){
        this.setData({
            memberList: []
        });
        this.getMemberList();
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
            this.setData({
                hidden: false
            });
            wx.request({
                url: domain + '/recommendation',
                method: 'POST',
                data: dataObj,
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
                    this.setData({
                        hidden: true
                    });
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
    viewAll: function(e) {
        let n=e.currentTarget.dataset.n;
        let viewAllJump = function() {
            wx.navigateTo({
                url: '../viewAll/viewAll?name='+n
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
        if (!wx.getStorageSync('isMember')) {
            this.setData({
                modalHidden: false
            })
        } else {
            fn();
        }
    }
}
Page(pageObject)
