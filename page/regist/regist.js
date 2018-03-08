let pageObject = {
    data: {
        date: '2016-09-01',
        region: ['广东省', '广州市', '海珠区'],
        income:0,
        incomeArray:['15万以下','15-30万','30万以上'],
        education:0,
        educationArray:['专科及以下','本科','硕士','博士','其他'],
        booleanArray:['是','否'],
        purchase:0,
        carBuying:0,
    },
    onShow: function() {

    },
    onReady: function() {

    },
    bindDateChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    },
    bindRegionChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            region: e.detail.value
        })
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
