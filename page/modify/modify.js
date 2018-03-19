const domain = getApp().globalData.domain;
const utilData = getApp().globalData.utilData;
//const userInfo = getApp().globalData.userInfo;
let userInfo={
        "is_life_photo":"http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg",
        "identi_url":"http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg",
		"name":"金可言",
		"date":"1991-2-3",
		"gender":2,
		"addressRegion":"北京 顺义",
		"originRegion":"河北 张家口 涿鹿",
		"industry":"互联网",
		"occupation":"开发",
		"income":"15-30万",
		"height":"187",
		"weight":"100",
		"nation":"汉",
		"education":"本科",
		"school":"北大",
		"maritalStatus":"已婚",
		"purchase":0,
		"carBuying":1,
		"mateSelection":"lalala",
		"hobby":"121212",
		"declaration":"edee",
		"invite":"32232"
}
let regName = /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,12}$/;
let incomeArray= ['15万以下', '15-30万', '30万以上'];
let educationArray= ['专科及以下', '本科', '硕士', '博士'];
let maritalArray= ['单身','已婚','离异','丧偶'];
let pageObject = {
    data: {
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
        checkbox: true,
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
        console.log(dataObj);
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
        if (!this.data.checkbox) {
            this.toast('请同意链爱服务条款');
            return;
        }
        wx.request({
            url: domain + '/change_detail',
            method: 'POST',
            data: {
                "data": JSON.stringify(dataObj)
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
        obj.is_life_photo = this.data.idTempFilePaths.join('');
        obj.identi_url = this.data.checkboxTempFilePaths.join('');
        return obj;
    }
}
Page(pageObject)
