const domain = getApp().globalData.domain;
const utilData = getApp().globalData.utilData;
const util = require('../../util/util');
const wxPromise=util.wxPromisify(wx.uploadFile);
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
        isToastShow: false,
        xcxName: "",
        successShow: false,
        hidden: true,
    },
    onShow: function() {

    },
    onReady: function() {

    },
    uploadPhoto: function(e) {
        wx.chooseImage({
            success: (res) => {
                var tempFilePaths = e.currentTarget.dataset.arr;
                var shoewName = e.currentTarget.dataset.show;
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
        // if (this.data.idTempFilePaths.length === 0) {
        //     this.toast('请上传一张身份证正面照片');
        //     return;
        // }
        // if (this.data.checkboxTempFilePaths.length === 0) {
        //     this.toast('请上传最精美生活照一张');
        //     return;
        // }
        // let dataObj = {
        //     identi_url: this.data.idTempFilePaths[0],
        //     life_photo_url: this.data.checkboxTempFilePaths[0],
        //     //open_id: wx.getStorageSync('openId')
        //     open_id: 'whatthename123'
        // }
        // if (!this.data.checkbox) {
        //     this.toast('请同意链爱服务条款');
        //     return;
        // }
        // wx.request({
        //     url: domain + '/up_pic',
        //     method: 'POST',
        //     data:dataObj,
        //     header: {
        //         'content-type': 'application/x-www-form-urlencoded'
        //     },
        //     success: (res) => {
        //         if (res.data && res.data.code === 0) {
        //             this.setData({
        //                 xcxName:wx.getStorageSync('xcxName'),
        //                 successShow:true
        //             })
        //         } else {
        //             this.toast(res.data.msg);
        //         }
        //     },
        //     fail: () => {
        //         this.toast('网络异常，请稍后再试');
        //     }
        // })
        this.setData({
            hidden: false
        });

        let resultId = this.uploadFile('/up_identity', this.data.idTempFilePaths[0], 'identity');
        let resultPic = this.uploadFile('/up_life', this.data.checkboxTempFilePaths[0], 'life');
        // console.log(resultId);
        // console.log(resultPic);
        // if (resultId && resultPic) {
        //     console.log('注册成功');
        //     this.setData({
        //         hidden: true
        //     });
        // }
    },
    uploadFile: function(url, path, name) {
        wx.uploadFile({
            url: domain + url,
            filePath: path,
            name: name,
            formData: {
                open_id: 'whatthename123'
            },
            header: {
                'content-type': 'multipart/form-data'
            },
            success: (res) => {
                let json = {};
                if (typeof res.data === 'string') {
                    json = JSON.parse(res.data)
                } else {
                    json = res.data;
                }
                if (json && json.code === 0) {
                    console.log(name + '成功');
                    return true;
                } else {
                    console.log(name + '失败');
                    return false;
                }

            },
            fail: () => {
                console.log(name + '失败');
                return false;
            }
        })
    },
    toast: function(content) {
        utilData.toast(content, 'toastData.toastMsg', 'isToastShow', this);
    },
    confirm: function() {
        this.setData({
            successShow: false
        })
        setTimeout(() => {
            wx.redirectTo({
                url: '../index/index'
            })
        }, 1000)
    }
}
Page(pageObject);
