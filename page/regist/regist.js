const domain = getApp().globalData.domain;
const utilData = getApp().globalData.utilData;
let pageObject = {
    data: {
        name:"",
        date: '',
        addressRegion: [],
        originRegion: [],
        industry:"",
        occupation:"",
        income: 0,
        incomeArray: ['15万以下','15-30万','30万以上'],
        height:"",
        weight:"",
        nation:"",
        education: 0,
        educationArray:['专科及以下','本科','硕士','博士','其他'],
        school:"",
        maritalStatus:0,
        maritalArray:[{
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
        booleanArray:[{
                id: 0,
                name: '是'
            },
            {
                id: 1,
                name: '否'
            }
        ],
        purchase: 0,
        carBuying: 0,
        mateSelection:"",
        hobby:"",
        declaration:"",
        checkbox:"",
        idTempFilePaths:[],
        checkboxTempFilePaths:[],
        toastData: {
            toastMsg: "",
        },
        isToastShow: false,
    },
    onShow: function() {

    },
    onReady: function() {

    },
    bindPickerChange:function(e) {
        let key=e.target.dataset.key;
        this.setData({
            [key]: e.detail.value
        })
    },
    uploadPhoto: function(e) {
        wx.chooseImage({
            success:(res)=>{
                var tempFilePaths = e.target.dataset.arr;
                this.setData({
                    [tempFilePaths]: res.tempFilePaths
                })
            }
        })
    },
    formSubmit:function(e){
        let dataObj=this.formatData(e.detail.value);
        wx.request({
            url: domain+'/register',
            method: 'POST',
            data: {
                "data":dataObj
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                if(res.data && res.data.code===0){
                    wx.showToast({
                        title: '注册成功',
                        icon: 'succes',
                        duration: 1000,
                        mask: true
                    })
                    setTimeout(()=>{
                        wx.redirectTo({
                            url: '../index/index'
                        })
                    },1000)
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
    formatData:function(option){
        let obj=option;
        obj.openId=wx.setStorageSync('openId');
        obj.addressRegion=obj.addressRegion.join(' ');
        obj.originRegion=obj.originRegion.join(' ');
        return JSON.stringify(obj);
    }
    // prepay: function() {
    //     wx.request({
    //         url: 'https://yourwebsit/service/getPay',
    //         method: 'POST',
    //         data: {
    //             bookingNo: bookingNo,
    //             /*订单号*/
    //             total_fee: total_fee,
    //             /*订单金额*/
    //             openid: openid
    //         },
    //         header: {
    //             'content-type': 'application/json'
    //         },
    //         success: function(res) {
    //             wx.requestPayment({
    //                 'timeStamp': timeStamp,
    //                 'nonceStr': nonceStr,
    //                 'package': 'prepay_id=' + res.data.prepay_id,
    //                 'signType': 'MD5',
    //                 'paySign': res.data._paySignjs,
    //                 'success': function(res) {
    //                     console.log(res);
    //                 },
    //                 'fail': function(res) {
    //                     console.log('fail:' + JSON.stringify(res));
    //                 }
    //             })
    //         },
    //         fail: function(err) {
    //             console.log(err)
    //         }
    //     })
    // }
}
Page(pageObject);
