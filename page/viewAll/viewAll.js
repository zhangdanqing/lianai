let pageObject = {
    data: {

    },
    onShow: function() {
        wx.request({
            url: domain + '/detail',
            method: 'POST',
            data: {
                name:wx.getStorageSync('name')
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                if (res.data && res.data.code === 0) {
                    // wx.showToast({
                    //     title: '注册成功',
                    //     icon: 'succes',
                    //     duration: 1000,
                    //     mask: true
                    // })
                    wx.redirectTo({
                        url: '../uploadPhotos/uploadPhotos'
                    })
                }
            },
            fail: function(err) {
                this.toast('网络异常，请稍后再试');
            }
        })
    }

}
Page(pageObject);
