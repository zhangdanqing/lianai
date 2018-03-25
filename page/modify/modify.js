const domain = getApp().globalData.domain;
const utilData = getApp().globalData.utilData;
let regName = /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,12}$/;
let incomeArray= ['15万以下', '15-30万', '30万以上'];
let educationArray= ['专科及以下', '本科', '硕士', '博士'];
let maritalArray= ['单身','已婚','离异','丧偶'];
let pageObject = {
    data: {
        name: "",
        gender: "",
        date: "",
        addressRegion: "",
        originRegion: "",
        industry: "",
        occupation: "",
        income: "",
        height: "",
        weight: "",
        nation: "",
        education: "",
        school: "",
        maritalStatus: "",
        purchase: "",
        carBuying: "",
        mateSelection: "",
        hobby: "",
        declaration: "",
        checkbox: true,
        idTempFilePaths: [],
        checkboxTempFilePaths:[],
        incomeArray: ['15万以下', '15-30万', '30万以上'],
        educationArray: ['专科及以下', '本科', '硕士', '博士'],
        maritalArray: ['单身','已婚','离异','丧偶'],
        genderArrary: [
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
        let userInfo = getApp().globalData.userInfo;
        this.setData({
            name: userInfo.name,
            gender: userInfo.gender,
            date: userInfo.date,
            addressRegion: userInfo.addressRegion.split(' '),
            originRegion: userInfo.originRegion.split(' '),
            industry: userInfo.industry,
            occupation: userInfo.occupation,
            income: incomeArray.indexOf(userInfo.income),
            height: userInfo.height,
            weight: userInfo.weight,
            nation: userInfo.nation,
            education: educationArray.indexOf(userInfo.education),
            school: userInfo.school,
            maritalStatus: maritalArray.indexOf(userInfo.maritalStatus),
            purchase: userInfo.purchase,
            carBuying: userInfo.carBuying,
            mateSelection: userInfo.mateSelection,
            hobby: userInfo.hobby,
            declaration: userInfo.declaration,
            idTempFilePaths: [userInfo.identi_url],
            checkboxTempFilePaths:[userInfo.is_life_photo],
            incomeArray: ['15万以下', '15-30万', '30万以上'],
            educationArray: ['专科及以下', '本科', '硕士', '博士'],
            maritalArray: ['单身','已婚','离异','丧偶'],
            genderArrary: [{
                    id: 1,
                    name: "男",
                    checked: userInfo.gender===1?true:false
                },
                {
                    id: 2,
                    name: "女",
                    checked: userInfo.gender===2?true:false
                }
            ],
        })
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
        if (!dataObj.income===-1) {
            this.toast('请选择年收入');
            return;
        }
        if (!dataObj.height) {
            this.toast('请填写身高');
            return;
        }
        if (dataObj.education===-1) {
            this.toast('请选择您的学历');
            return;
        }
        if (!dataObj.maritalStatus===-1) {
            this.toast('请选择您当前婚姻状况');
            return;
        }
        if (!this.data.checkbox) {
            this.toast('请同意链爱服务条款');
            return;
        }
        wx.request({
            url: domain + '/change_detail',
            method: 'POST',
            data: {
                "data": JSON.stringify(dataObj),
                //"open_id" : wx.getStorageSync('openId')
                "open_id" :'whatthename123'
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
        obj.gender = this.data.gender;
        obj.addressRegion = obj.addressRegion.join(' ');
        obj.originRegion = obj.originRegion.join(' ');
        obj.is_life_photo = this.data.idTempFilePaths.join('');
        obj.identi_url = this.data.checkboxTempFilePaths.join('');
        return obj;
    }
}
Page(pageObject)
