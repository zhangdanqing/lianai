const domain = getApp().globalData.domain;
const utilData = getApp().globalData.utilData;
import tempObj from '../../template/courseList';
let pageObject = {
    data: {
        toastData: {
            toastMsg: "",
        },
        isToastShow: false,
        invite: ""
    },
    onLoad: function() {
        if( ! wx.getStorageSync('invite')){
            this.refresh();
        }else{
            this.setData({
                invite:wx.getStorageSync('invite')
            })
        }
    },
    refresh: function() {
        let dataObj = {
            open_id: wx.getStorageSync('openId')
        }
        wx.request({
            url: domain + '/get_invite',
            method: 'POST',
            data:dataObj,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success:(res)=>{
                if (res.data && res.data.code === 0) {
                    this.setData({
                        invite: res.data.data.invite
                    })
                    wx.setStorageSync('invite',res.data.data.invite);
                }else{
                    this.toast(res.data.msg);
                }
            },
            fail:(err)=>{
                this.toast('网络异常，请稍后再试');
            }
        })
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
