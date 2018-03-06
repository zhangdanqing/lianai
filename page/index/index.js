let pageObject = {
    data: {

    },
    onShow: function() {

    },
    onReady: function() {

    },
    prepay: function() {
        wx.request({
            url: 'https://yourwebsit/service/getPay',
            method: 'POST',
            data: {
                bookingNo: bookingNo,
                /*订单号*/
                total_fee: total_fee,
                /*订单金额*/
                openid: openid
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                wx.requestPayment({
                    'timeStamp': timeStamp,
                    'nonceStr': nonceStr,
                    'package': 'prepay_id=' + res.data.prepay_id,
                    'signType': 'MD5',
                    'paySign': res.data._paySignjs,
                    'success': function(res) {
                        console.log(res);
                    },
                    'fail': function(res) {
                        console.log('fail:' + JSON.stringify(res));
                    }
                })
            },
            fail: function(err) {
                console.log(err)
            }
        })
    }
}
Page(pageObject);
