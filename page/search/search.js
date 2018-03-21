const domain = getApp().globalData.domain;
const utilData = getApp().globalData.utilData;
let pageObject = {
    data: {
        searchList: {},
        inputSearch: "",
        toastData: {
            toastMsg: "",
        },
        isToastShow: false,
    },
    onShow: function() {
    },
    viewAll: function(e) {
        wx.navigateTo({
            url: '../viewAll/viewAll?name=' + e.currentTarget.dataset.n
        })
    },
    confirmRequest: function() {
        this.searchRequest();
    },
    onInp: function(e) {
        this.setData({
            inputSearch: e.detail.value
        });
    },
    searchRequest: function() {
        let dataObj = {
            name: this.data.inputSearch
        }
        wx.request({
            url: domain + '/detail',
            method: 'POST',
            data: JSON.stringify(dataObj),
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                if (res.data && res.data.code === 0) {
                    if (res.data.data) {
                        this.setData({
                            searchList: res.data.data
                        });
                    }
                } else if (res.data.code === -1) {
                    this.toast('没有查到该用户');
                } else {
                    this.toast(res.data.msg);
                }
            },
            fail: (err) => {
                this.toast('网络异常，请稍后再试');
            }
        })
    },
    toast: function(content) {
        utilData.toast(content, 'toastData.toastMsg', 'isToastShow', this);
    },

}

Page(pageObject)
