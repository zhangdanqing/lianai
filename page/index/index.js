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
        let bChangeI=getApp().globalData.bChangeI;
        if(bChangeI){
            this.setData({
                memberList: []
            });
            this.getMemberList();
            getApp().globalData.bChangeI=false;
        }
    },
    onLoad:function(){
        this.wxLogin();
    },
    isMemberRequest: function(openId) {
        let dataObj = {
            open_id: openId
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
                            this.getUser(openId);
                        }else{
                            this.getMemberList(-1);
                        }
                    }else{
                        this.getMemberList(-1);
                    }
                }else{
                    this.getMemberList(-1);
                }
            },
            fail: () => {}
        })
    },
    getUser: function(openId) {
        let dataObj = {
            open_id: openId
        }
        wx.request({
            url:domain + '/getinfo_by_openid',
            method: 'POST',
            data: dataObj,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                if (res.data && res.data.code === 0) {
                    if (res.data.data) {
                        wx.setStorageSync('gender', res.data.data.gender);
                        getApp().globalData.userInfo = res.data.data;
                        this.getMemberList(res.data.data.gender);
                    }else{
                        this.getMemberList(-1);
                    }
                } else if (res.data.code === -1) {
                    this.getMemberList(-1);
                    wx.setStorageSync('gender', -1);
                }
            },
            fail: () => {}
        })
    },
    wxLogin:function(){
        this.loadingShow();
        wx.login({
            success: (res) => {
                if (res.code) {
                    let dataObj={
                        js_code: res.code
                    }
                    wx.request({
                        url:domain + '/get_open_id',
                        method: 'POST',
                        data: dataObj,
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: (res) => {
                            wx.setStorageSync('openId', res.data.openid);
                            this.isMemberRequest(res.data.openid);
                        }
                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });
    },
    getMemberList: function(gender) {
        if (!this.data.unLock) {
            return;
        }
        let dataObj = {
            gender: gender || wx.getStorageSync('gender'),
            sequence: page
        }
        if (bFlag) {
            bFlag = false;
            this.loadingShow();
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
                    this.loadingHide();
                    wx.stopPullDownRefresh();
                }
            })
        }
    },
    loadingShow:function(){
        this.setData({
            hidden: false
        });
    },
    loadingHide:function(){
        this.setData({
            hidden: true
        });
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
for(let name in tempObj)
{
    pageObject[name] = tempObj[name]
}
Page(pageObject)
