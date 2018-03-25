const domain = getApp().globalData.domain;
const utilData = getApp().globalData.utilData;
const util = require('../../util/util');
const wxPromise = util.wxPromisify(wx.uploadFile);
import tempObj from '../../template/courseList';
let pageObject = {
    data: {
        tempFilePaths: [],
        isShowAddPhoto: true,
        toastData: {
            toastMsg: "",
        },
        isToastShow: false,
        hidden: true,
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
        if (this.data.tempFilePaths.length === 0) {
            this.toast('请上传最精美生活照一张');
            return;
        }
        this.setData({
            hidden: false
        });
        this.uploadFile('/up_life', this.data.tempFilePaths[0], 'life');
    },
    uploadFile: function(url, path, name) {
        return new Promise((resolve) => {
            wxPromise({
                url: domain + url,
                filePath: path,
                name: name,
                formData: {
                    open_id: wx.getStorageSync('openId')
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
                    wx.showToast({
                        title: '修改成功',
                        icon: 'succes',
                        duration: 1500,
                        mask: true
                    });
                    wx.setStorageSync('isRegist', true);
                    setTimeout(()=>{
                        wx.switchTab({
                            url: '../mine/mine'
                        })
                    }, 1500)
                } else {
                    this.toast('修改失败,请稍后再试');
                }
                this.setData({
                    hidden:true
                });
            }, res => {
                this.toast('修改失败,请稍后再试');
                this.setData({
                    hidden: true
                });
            });
        });
    },
    toast: function(content) {
        utilData.toast(content, 'toastData.toastMsg', 'isToastShow', this);
    }
}
for(let name in tempObj)
{
    pageObject[name] = tempObj[name]
}
Page(pageObject);
