let pageObject = {
    data: {
        beingList: [],
        bookList: [],
        shareList: [],
        hidden: true,
        wifiData: {
            isWifi: true
        },
        bookData: {
            returnNum: 0,
            isShow: false
        },
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 500
    },
    onReady: function() {

    },
    searchJump: function() {
        wx.navigateTo({
            url: '../search/search'
        })
    }
}
Page(pageObject)
