const domain = getApp().globalData.domain;
const utilData = getApp().globalData.utilData;
import tempObj from '../../template/courseList';
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
        this.wxLogin();
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
    },
    isMemberRequest: function() {
        let dataObj = {
            open_id: wx.getStorageSync('openId')
        }
        wx.request({
            url: domain + '/is_member',
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
            url: domain + '/getinfo_by_openid',
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
                        getApp().globalData.userInfo = res.data.data;
                    }
                } else if (res.data.code === -1) {
                    wx.setStorageSync('gender', -1);
                }
                this.getMemberList();
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
                        url: domain + '/get_open_id',
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
}
for(let name in tempObj)
{
    pageObject[name] = tempObj[name]
}
Page(pageObject)
