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
            '../../img/slide1.png',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
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
    },
    viewAll:function(){
        wx.navigateTo({
            url: '../viewAll/viewAll'
        })
    }
}
Page(pageObject)
