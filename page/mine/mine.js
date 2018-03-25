let pageObject = {
    data: {
        headPortrait:wx.getStorageSync('avatarUrl'),
        userName:wx.getStorageSync('userName'),
        modalHidden: true,
    },
    onShow: function() {
        if(wx.getStorageSync('isMember')===false){
            this.setData({
                modalHidden: false
            })
        }
        let image = getApp().globalData.userInfo.is_life_photo;
        let name = getApp().globalData.userInfo.name;
        if(image && image.indexOf('http://') !== -1 || image.indexOf('http://') !== -1){
            this.setData({
                headPortrait: image
            })
        }
        if(name){
            this.setData({
                userName: name
            })
        }
    },
    onReady: function() {

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
    }
}
Page(pageObject);
