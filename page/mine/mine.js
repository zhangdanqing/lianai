import tempObj from '../../template/courseList';
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
        let image = getApp().globalData.userInfo.image;
        let name = getApp().globalData.userInfo.name;
        console.log(image);
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
    },
    previewImage: function(e) {
        let current = e.target.dataset.src;
        wx.previewImage({
            current: current,
            urls: [current],
            success: (res) => {
            }
        })
    }
}
for(let name in tempObj)
{
    pageObject[name] = tempObj[name]
}
Page(pageObject);
