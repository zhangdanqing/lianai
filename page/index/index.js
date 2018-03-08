let pageObject = {
    data: {
        beingList:[],
        bookList:[],
        shareList:[],
        hidden:true,
        wifiData:{
            isWifi:true
        },
        bookData:{
            returnNum:0,
            isShow:false
        }
    },
    onReady: function() {

    },
    searchJump:function(){
        wx.navigateTo({
            url:'../search/search'
        })
    },
}
Page(pageObject)
