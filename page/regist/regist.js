const domain = getApp().globalData.domain;
const utilData = getApp().globalData.utilData;
let regName = /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,12}$/;
let pageObject = {
    data: {
        name: "",
        gender: "",
        date: "",
        addressRegion: [],
        originRegion: [],
        industry: "",
        occupation: "",
        income: null,
        height: "",
        weight: "",
        nation: "",
        education: null,
        school: "",
        maritalStatus: null,
        incomeArray: ['15万以下', '15-30万', '30万以上'],
        educationArray: ['专科及以下', '本科', '硕士', '博士'],
        maritalArray: ['单身','已婚','离异','丧偶'],
        genderArrary: [{
                id: 1,
                name: "男",
                // checked: 'true'
            },
            {
                id: 2,
                name: "女"
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
        purchase: null,
        carBuying: null,
        invite:"",
        mateSelection: "",
        hobby: "",
        declaration: "",
        checkbox: "",
        idTempFilePaths: [],
        checkboxTempFilePaths: [],
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
        if (name && name.toString().match(regName)) {
        } else {
            this.toast('请填写1-12位汉字或者数字或者字母的昵称');
            return;
        }
        if( ! dataObj.gender){
            this.toast('请填写性别');
            return;
        }
        if( ! dataObj.date){
            this.toast('请填写出生日期');
            return;
        }
        if( ! dataObj.addressRegion){
            this.toast('请填写所在地区');
            return;
        }
        if( ! dataObj.originRegion){
            this.toast('请填写籍贯');
            return;
        }
        if( ! dataObj.industry){
            this.toast('请填写您所在的行业');
            return;
        }
        if( ! dataObj.occupation){
            this.toast('请填写您的职业');
            return;
        }
        if( ! dataObj.income){
            this.toast('请填写年收入');
            return;
        }
        if( ! dataObj.height){
            this.toast('请填写身高');
            return;
        }
        if( ! dataObj.education){
            this.toast('请填写您的学历');
            return;
        }
        if( ! dataObj.maritalStatus){
            this.toast('请填写您当前婚姻状况');
            return;
        }
        wx.request({
            url: domain + '/register',
            method: 'POST',
            data: {
                "data": JSON.stringify(dataObj)
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                if (res.data && res.data.code === 0) {
                    wx.redirectTo({
                        url: '../uploadPhotos/uploadPhotos'
                    })
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
        obj.openId = wx.setStorageSync('openId');
        obj.gender = this.data.gender;
        obj.addressRegion = obj.addressRegion.join(' ');
        obj.originRegion = obj.originRegion.join(' ');
        return obj;
    }
}
Page(pageObject);
