// const domain = getApp().globalData.domain;
// const utilData = getApp().globalData.utilData;
// let regName = /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,12}$/;
// let pageObject = {
//     data: {
//         name: "",
//         gender: "",
//         genderArrary: [{
//                 id: 0,
//                 name: "男",
//                 // checked: 'true'
//             },
//             {
//                 id: 1,
//                 name: "女"
//             }
//         ],
//         date: "",
//         addressRegion: [],
//         originRegion: [],
//         industry: "",
//         occupation: "",
//         income: null,
//         incomeArray: ['15万以下', '15-30万', '30万以上'],
//         height: "",
//         weight: "",
//         nation: "",
//         education: null,
//         educationArray: ['专科及以下', '本科', '硕士', '博士', '其他'],
//         school: "",
//         maritalStatus: null,
//         maritalArray: [{
//                 id: 0,
//                 name: '单身'
//             },
//             {
//                 id: 1,
//                 name: '已婚'
//             },
//             {
//                 id: 2,
//                 name: '离异'
//             },
//             {
//                 id: 3,
//                 name: '丧偶'
//             }
//         ],
//         booleanArray: [{
//                 id: 0,
//                 name: '是'
//             },
//             {
//                 id: 1,
//                 name: '否'
//             }
//         ],
//         purchase: null,
//         carBuying: null,
//         mateSelection: "",
//         hobby: "",
//         declaration: "",
//         checkbox: "",
//         idTempFilePaths: [],
//         checkboxTempFilePaths: [],
//         toastData: {
//             toastMsg: "",
//         },
//         isToastShow: false,
//     },
//     onShow: function() {
//
//     },
//     onReady: function() {
//
//     },
//     radioChange: function(e) {
//         this.setData({
//             gender: e.detail.value
//         })
//     },
//     bindPickerChange: function(e) {
//         let key = e.target.dataset.key;
//         this.setData({
//             [key]: e.detail.value
//         })
//     },
//     uploadPhoto: function(e) {
//         wx.chooseImage({
//             success: (res) => {
//                 var tempFilePaths = e.target.dataset.arr;
//                 this.setData({
//                     [tempFilePaths]: res.tempFilePaths
//                 })
//             }
//         })
//     },
//     formSubmit: function(e) {
//         let dataObj = this.formatData(e.detail.value);
//         let name = e.detail.value.name;
//         if (name && name.toString().match(regName)) {
//         } else {
//             this.toast('请填写1-12位汉字或者数字或者字母的昵称');
//             return;
//         }
//         if( ! dataObj.gender){
//             this.toast('请填写性别');
//             return;
//         }
//         if( ! dataObj.date){
//             this.toast('请填写出生日期');
//             return;
//         }
//         if( ! dataObj.addressRegion){
//             this.toast('请填写所在地区');
//             return;
//         }
//         if( ! dataObj.originRegion){
//             this.toast('请填写籍贯');
//             return;
//         }
//         if( ! dataObj.industry){
//             this.toast('请填写您所在的行业');
//             return;
//         }
//         if( ! dataObj.occupation){
//             this.toast('请填写您的职业');
//             return;
//         }
//         if( ! dataObj.income){
//             this.toast('请填写年收入');
//             return;
//         }
//         if( ! dataObj.height){
//             this.toast('请填写身高');
//             return;
//         }
//         if( ! dataObj.education){
//             this.toast('请填写您的学历');
//             return;
//         }
//         if( ! dataObj.maritalStatus){
//             this.toast('请填写您当前婚姻状况');
//             return;
//         }
//         if( ! dataObj.purchase){
//             this.toast('请填写您当地购房状况');
//             return;
//         }
//         if( ! dataObj.carBuying){
//             this.toast('请填写您当地购车状况');
//             return;
//         }
//         wx.request({
//             url: domain + '/register',
//             method: 'POST',
//             data: {
//                 "data": dataObj
//             },
//             header: {
//                 'content-type': 'application/x-www-form-urlencoded'
//             },
//             success: function(res) {
//                 if (res.data && res.data.code === 0) {
//                     // wx.showToast({
//                     //     title: '注册成功',
//                     //     icon: 'succes',
//                     //     duration: 1000,
//                     //     mask: true
//                     // })
//                     wx.redirectTo({
//                         url: '../uploadPhotos/uploadPhotos'
//                     })
//                 }
//             },
//             fail: function(err) {
//                 this.toast('网络异常，请稍后再试');
//             }
//         })
//     },
//     toast: function(content) {
//         utilData.toast(content, 'toastData.toastMsg', 'isToastShow', this);
//     },
//     formatData: function(option) {
//         let obj = option;
//         obj.openId = wx.setStorageSync('openId');
//         obj.gender = this.data.gender;
//         obj.addressRegion = obj.addressRegion.join(' ');
//         obj.originRegion = obj.originRegion.join(' ');
//         return JSON.stringify(obj);
//     }
//     // prepay: function() {
//     //     wx.request({
//     //         url: 'https://yourwebsit/service/getPay',
//     //         method: 'POST',
//     //         data: {
//     //             bookingNo: bookingNo,
//     //             /*订单号*/
//     //             total_fee: total_fee,
//     //             /*订单金额*/
//     //             openid: openid
//     //         },
//     //         header: {
//     //             'content-type': 'application/json'
//     //         },
//     //         success: function(res) {
//     //             wx.requestPayment({
//     //                 'timeStamp': timeStamp,
//     //                 'nonceStr': nonceStr,
//     //                 'package': 'prepay_id=' + res.data.prepay_id,
//     //                 'signType': 'MD5',
//     //                 'paySign': res.data._paySignjs,
//     //                 'success': function(res) {
//     //                     console.log(res);
//     //                 },
//     //                 'fail': function(res) {
//     //                     console.log('fail:' + JSON.stringify(res));
//     //                 }
//     //             })
//     //         },
//     //         fail: function(err) {
//     //             console.log(err)
//     //         }
//     //     })
//     // }
// }
// Page(pageObject);
