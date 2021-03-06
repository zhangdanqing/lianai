const domain = getApp().globalData.domain;
const utilData = getApp().globalData.utilData;
import tempObj from '../../template/courseList';
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
        incomeArray: ['15万以下', '15-30万', '30万以上'],
        educationArray: ['专科及以下', '本科', '硕士', '博士'],
        maritalArray: ['单身','已婚','离异','丧偶'],
        genderArrary: [{
                id: 1,
                name: "男"
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
        toastData: {
            toastMsg: "",
        },
        isToastShow: false,
    },
    onShow: function() {
        this.setInfor();
    },
    radioChange: function(e) {
        this.setData({
            gender: e.detail.value
        })
    },
    bindPickerChange: function(e) {
        let key = e.currentTarget.dataset.key;
        this.setData({
            [key]: e.detail.value
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
        if(dataObj.purchase===""){
            this.toast('请选择您的购房情况');
            return;
        }
        if(dataObj.carBuying===""){
            this.toast('请选择您的购车情况');
            return;
        }
        wx.request({
            url: domain + '/change_detail',
            method: 'POST',
            data: {
                "data": JSON.stringify(dataObj),
                "open_id": wx.getStorageSync('openId')
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                if (res.data && res.data.code === 0) {
                    getApp().globalData.bChangeI = true;
                    getApp().globalData.bChangeM = true;
                    wx.showToast({
                        title: '修改成功',
                        icon: 'succes',
                        duration: 1500,
                        mask: true
                    })
                    setTimeout(()=>{
                        wx.switchTab({
                            url: '../mine/mine'
                        })
                    }, 1500)
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
        obj.purchase=this.formatObj(obj.purchase,this.data.booleanArray,'id');
        obj.carBuying=this.formatObj(obj.carBuying,this.data.booleanArray,'id');
        obj.income=this.formatArr(obj.income,this.data.incomeArray);
        obj.education=this.formatArr(obj.education,this.data.educationArray);
        obj.maritalStatus=this.formatArr(obj.maritalStatus,this.data.maritalArray);
        obj.gender = this.data.gender;
        obj.addressRegion = obj.addressRegion.join(' ');
        obj.originRegion = obj.originRegion.join(' ');
        return obj;
    },
    formatArr:function(key,arr){
        if(key!==""){
            return arr[key]
        }
    },
    formatObj:function(key,obj,name){
        if(key!==""){
            return obj[key][name]
        }
    },
    setInfor:function(){
        let userInfo = getApp().globalData.userInfo;
        this.setData({
            name: userInfo.name,
            gender: parseInt(userInfo.gender),
            date: userInfo.date,
            addressRegion: userInfo.addressRegion.split(' '),
            originRegion: userInfo.originRegion.split(' '),
            industry: userInfo.industry,
            occupation: userInfo.occupation,
            income:this.data.incomeArray.indexOf(userInfo.income),
            height: userInfo.height,
            weight: userInfo.weight,
            nation: userInfo.nation,
            education: this.data.educationArray.indexOf(userInfo.education),
            school: userInfo.school,
            maritalStatus: this.data.maritalArray.indexOf(userInfo.maritalStatus),
            purchase: parseInt(userInfo.purchase),
            carBuying: parseInt(userInfo.carBuying),
            mateSelection: userInfo.mateSelection,
            hobby: userInfo.hobby,
            declaration: userInfo.declaration,
            incomeArray: ['15万以下', '15-30万', '30万以上'],
            educationArray: ['专科及以下', '本科', '硕士', '博士'],
            maritalArray: ['单身','已婚','离异','丧偶'],
            genderArrary: [{
                    id: 1,
                    name: "男",
                    checked: parseInt(userInfo.gender)===1?true:false
                },
                {
                    id: 2,
                    name: "女",
                    checked: parseInt(userInfo.gender)===2?true:false
                }
            ],
        })
    }
}
for(let name in tempObj)
{
    pageObject[name] = tempObj[name]
}
Page(pageObject)
