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
    },
    onReady: function() {

    },
    modifyTap:function(){
        wx.navigateTo({
            url:'../regist/regist'
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
