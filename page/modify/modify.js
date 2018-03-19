const domain = getApp().globalData.domain;
const utilData = getApp().globalData.utilData;
const userInfo = getApp().globalData.userInfo;
let regName = /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,12}$/;
let pageObject = {
    data: {
        name: userInfo.name,
        gender: userInfo.gender,
        date: userInfo.date,
        //addressRegion: userInfo.addressRegion.split(' '),
        //originRegion: userInfo.originRegion.split(' '),
        industry: userInfo.industry,
        occupation: userInfo.occupation,
        income: userInfo.income,
        incomeArray: ['15万以下', '15-30万', '30万以上'],
        height: userInfo.height,
        weight: userInfo.weight,
        nation: userInfo.nation,
        education: userInfo.education,
        educationArray: ['专科及以下', '本科', '硕士', '博士', '其他'],
        school: userInfo.school,
        maritalStatus: userInfo.maritalStatus,
        purchase: userInfo.purchase,
        carBuying: userInfo.carBuying,
        mateSelection: userInfo.mateSelection,
        hobby: userInfo.hobby,
        declaration: userInfo.declaration,
        checkbox: "",
        idTempFilePaths: [],
        checkboxTempFilePaths: [],
        genderArrary: [{
                id: 0,
                name: "男",
                // checked: 'true'
            },
            {
                id: 1,
                name: "女"
            }
        ],
        maritalArray: [{
                id: 0,
                name: '单身'
            },
            {
                id: 1,
                name: '已婚'
            },
            {
                id: 2,
                name: '离异'
            },
            {
                id: 3,
                name: '丧偶'
            }
        ],
        booleanArray: [{
                id: 0,
                name: '是'
            },
            {
                id: 1,
                name: '否'
            }
        ],
        toastData: {
            toastMsg: "",
        },
        isToastShow: false,
    },
    onShow: function() {

    },
    onReady: function() {

    },
    radioChange: function(e) {
        this.setData({
            gender: e.detail.value
        })
    },
    bindPickerChange: function(e) {
        let key = e.target.dataset.key;
        this.setData({
            [key]: e.detail.value
        })
    },
    uploadPhoto: function(e) {
        wx.chooseImage({
            success: (res) => {
                var tempFilePaths = e.target.dataset.arr;
                this.setData({
                    [tempFilePaths]: res.tempFilePaths
                })
            }
        })
    },
    formSubmit: function(e) {
        let dataObj = this.formatData(e.detail.value);
        let name = e.detail.value.name;
        if (name && name.toString().match(regName)) {} else {
            this.toast('请填写1-12位汉字或者数字或者字母的昵称');
            return;
        }
        if (!dataObj.gender) {
            this.toast('请填写性别');
            return;
        }
        if (!dataObj.date) {
            this.toast('请填写出生日期');
            return;
        }
        if (!dataObj.addressRegion) {
            this.toast('请填写所在地区');
            return;
        }
        if (!dataObj.originRegion) {
            this.toast('请填写籍贯');
            return;
        }
        if (!dataObj.industry) {
            this.toast('请填写您所在的行业');
            return;
        }
        if (!dataObj.occupation) {
            this.toast('请填写您的职业');
            return;
        }
        if (!dataObj.income) {
            this.toast('请填写年收入');
            return;
        }
        if (!dataObj.height) {
            this.toast('请填写身高');
            return;
        }
        if (!dataObj.education) {
            this.toast('请填写您的学历');
            return;
        }
        if (!dataObj.maritalStatus) {
            this.toast('请填写您当前婚姻状况');
            return;
        }
        if (!dataObj.purchase) {
            this.toast('请填写您当地购房状况');
            return;
        }
        if (!dataObj.carBuying) {
            this.toast('请填写您当地购车状况');
            return;
        }
        wx.request({
            url: domain + '/change_detail',
            method: 'POST',
            data: {
                "data": dataObj
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                if (res.data && res.data.code === 0) {
                    wx.showToast({
                        title: '修改成功',
                        icon: 'succes',
                        duration: 1000,
                        mask: true
                    })
                    setTimeout(function() {
                        wx.navigateBack({
                            url: '../mine/mine'
                        })
                    }, 1000)
                }
            },
            fail: function(err) {
                this.toast('网络异常，请稍后再试');
            }
        })
    },
    toast: function(content) {
        utilData.toast(content, 'toastData.toastMsg', 'isToastShow', this);
    },
    formatData: function(option) {
        let obj = option;
        obj.open_id = wx.getStorageSync('openId');
        obj.gender = this.data.gender;
        obj.addressRegion = obj.addressRegion.join(' ');
        obj.originRegion = obj.originRegion.join(' ');
        return JSON.stringify(obj);
    }
}
Page(pageObject)
