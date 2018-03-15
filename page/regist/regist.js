let pageObject = {
    data: {
        name:"",
        date: '2016-09-01',
        addressRegion: ['广东省', '广州市', '海珠区'],
        originRegion: ['广东省', '广州市', '海珠区'],
        industry:"",
        occupation:"",
        income: 0,
        incomeArray: [{
                id: 0,
                name: '15万以下'
            },
            {
                id: 1,
                name: '15-30万'
            },
            {
                id: 2,
                name: '30万以上'
            }
        ],
        height:"",
        weight:"",
        nation:"",
        education: 0,
        educationArray:[{
                id: 0,
                name: '专科及以下'
            },
            {
                id: 1,
                name: '本科'
            },
            {
                id: 2,
                name: '硕士'
            },
            {
                id: 3,
                name: '博士'
            },
            {
                id: 4,
                name: '其他'
            },
        ],
        school:"",
        maritalStatus:"",
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
        console.log(e.detail.value);
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
