const domain = getApp().globalData.domain;
const utilData = getApp().globalData.utilData;
let pageObject = {
    data: {
        checkbox: true,
        idTempFilePaths: [],
        checkboxTempFilePaths: [],
        isShowAddiD: true,
        isShowAddPhoto: true,
        toastData: {
            toastMsg: "",
        },
    },
    onShow: function() {

    },
    onReady: function() {

    },
    uploadPhoto: function(e) {
        wx.chooseImage({
            success: (res) => {
                var tempFilePaths = e.target.dataset.arr;
                var shoewName = e.target.dataset.show;
                this.setData({
                    [tempFilePaths]: res.tempFilePaths,
                    [shoewName]: false
                })
            }
        })
    },
    checkboxChange: function(e) {
        let bChecked = null;
        if (e.detail.value.length === 0) {
            bChecked = false
        } else if (e.detail.value.length === 1) {
            bChecked = true
        }
        this.setData({
            checkbox: bChecked
        })
    },
    formSubmit: function(e) {
        if (this.data.idTempFilePaths.length === 0) {
            this.toast('请上传一张身份证正面照片');
            return;
        }
        if (this.data.checkboxTempFilePaths.length === 0) {
            this.toast('请上传最精美生活照一张');
            return;
        }
        let dataObj = {
            is_identity_card: this.data.idTempFilePaths[0],
            is_life_photo: this.data.checkboxTempFilePaths[0],
            open_id: wx.setStorageSync('openId')
        }
        if (!this.data.checkbox) {
            this.toast('请同意链爱服务条款');
            return;
        }
        wx.request({
            url: domain + '/up_pic',
            method: 'POST',
            data: {
                "data": JSON.stringify(dataObj)
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                if (res.data && res.data.code === 0) {
                    // wx.showToast({
                    //     title: '注册成功',
                    //     icon: 'succes',
                    //     duration: 1000,
                    //     mask: true
                    // })
                    // setTimeout(() => {
                    //     wx.redirectTo({
                    //         url: '../index/index'
                    //     })
                    // }, 1000)

                }else{
                    this.toast(res.data.msg);
                }
            },
            fail: () => {
                this.toast('网络异常，请稍后再试');
            }
        })
    },
    toast: function(content) {
        utilData.toast(content, 'toastData.toastMsg', 'isToastShow', this);
    },
}
Page(pageObject);
