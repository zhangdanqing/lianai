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
        var data = {
            "is_life_photo": "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg",
            "name": "金可言",
            "date": "1991-2-3",
            "gender": 0,
            "addressRegion": "北京 顺义",
            "originRegion": "河北 张家口 涿鹿",
            "industry": "互联网",
            "occupation": "开发",
            "income": "13万",
            "height": "187",
            "weight": "100",
            "nation": "汉",
            "education": "本科",
            "school": "北大",
            "maritalStatus": "已婚",
            "purchase": 0,
            "carBuying": 1,
            "mateSelection": "lalala",
            "hobby": "",
            "declaration": "",
            "invite": "32232"
        }
        this.setData({
            searchList: data
        });
    },
    viewAll: function(e) {
        wx.navigateTo({
            url: '../viewAll/viewAll?name='+e.currentTarget.dataset.n
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
        wx.request({
            url: domain + '/detail',
            method: 'POST',
            data: {
                name: this.data.inputSearch
            },
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
