const domain = getApp().globalData.domain;
const utilData = getApp().globalData.utilData;
const util = require('../../util/util');
const wxPromise = util.wxPromisify(wx.uploadFile);
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
        if (this.data.idTempFilePaths.length === 0) {
            this.toast('请上传一张身份证正面照片');
            return;
        }
        if (this.data.checkboxTempFilePaths.length === 0) {
            this.toast('请上传最精美生活照一张');
            return;
        }
        if (!this.data.checkbox) {
            this.toast('请同意链爱服务条款');
            return;
        }
        this.setData({
            hidden: false
        });
        new Promise((resolve) => {
            Promise.all([this.uploadFile('/up_identity', this.data.idTempFilePaths[0], 'identity'), this.uploadFile('/up_life', this.data.checkboxTempFilePaths[0], 'life')]).then((values) => {
                if (values[0] && values[1]) {
                    console.log('注册成功');
                    this.setData({
                        hidden: true,
                        xcxName:wx.getStorageSync('xcxName'),
                        successShow:true
                    });
                } else {
                    console.log('注册失败');
                    this.setData({
                        hidden: true
                    });
                    this.toast('注册失败,请稍后再试');
                }
            });
        });
    },
    uploadFile: function(url, path, name) {
        return new Promise((resolve) => {
            wxPromise({
                url: domain + url,
                filePath: path,
                name: name,
                formData: {
                    //open_id: wx.getStorageSync('openId')
                    open_id: 'whatthename123'
                },
                header: {
                    'content-type': 'multipart/form-data'
                }
            }).then(res => {
                let json = {};
                if (typeof res.data === 'string') {
                    json = JSON.parse(res.data)
                } else {
                    json = res.data;
                }
                if (json && json.code === 0) {
                    console.log(name + '成功');
                    resolve(true);
                } else {
                    console.log(name + '失败');
                    resolve(false);
                }
            }, res => {
                console.log(json + '失败');
                resolve(false);
            });
        });
    },
    toast: function(content) {
        utilData.toast(content, 'toastData.toastMsg', 'isToastShow', this);
    },
    confirm: function() {
        this.setData({
            successShow: false
        })
        setTimeout(() => {
            wx.switchTab({
                url: '../index/index'
            })
        }, 1000)
    }
}
Page(pageObject);
