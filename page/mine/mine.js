const domain = getApp().globalData.domain;
import tempObj from '../../template/courseList';
let pageObject = {
    data: {
        headPortrait:"",
        userName:"",
        modalHidden: true,
    },
    onShow: function() {
        if(wx.getStorageSync('isMember')===false){
            this.setData({
                modalHidden: false
            })
        }
        let bChangeM=getApp().globalData.bChangeM;
        if(bChangeM){
            this.getUser();
            getApp().globalData.bChangeM=false;
        }
    },
    onLoad:function(){
        let userInfo = getApp().globalData.userInfo;
        this.setData({
            headPortrait:userInfo.image,
            userName:userInfo.name
        })
    },
    modifyTap:function(){
        wx.navigateTo({
            url:'../modify/modify'
        })
    },
    modifyPhotoTap:function(){
        wx.navigateTo({
            url:'../modifyPhoto/modifyPhoto'
        })
    },
    inviteTap:function(){
        wx.navigateTo({
            url:'../invitationCode/invitationCode'
        })
    },
    modalBindconfirm: function() {
        wx.navigateTo({
            url: '../regist/regist'
        })
        this.setData({
            modalHidden: true
        })
    },
    previewImage: function(e) {
        let current = e.target.dataset.src;
        wx.previewImage({
            current: current,
            urls: [current],
            success: (res) => {
            }
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
                        getApp().globalData.userInfo = res.data.data;
                        let image = res.data.data.image;
                        let name = res.data.data.name;
                        if(image){
                            this.setData({
                                headPortrait: image
                            })
                        }
                        if(name){
                            this.setData({
                                userName: name
                            })
                        }
                    }else{
                        wx.setStorageSync('gender', -1);
                    }
                } else if (res.data.code === -1) {
                    wx.setStorageSync('gender', -1);
                }
            },
            fail: () => {}
        })
    },
}
for(let name in tempObj)
{
    pageObject[name] = tempObj[name]
}
Page(pageObject);
