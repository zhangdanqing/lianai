let pageObject = {
    data: {
        focus:true,
        tagList:['JavaScript','HTML5','Android','Python','Linux','C#','iOS','php','数据库','机器学习'],
        inputSearch:"",
        clearIcon:false,
        dpResult:false,
        searchData:"",
        inpType:"",
        allBookList:[],
        isNoData:false
    },
    onReady: function() {

    },
    onShow:function(){

    },
    viewAll:function(){
        wx.navigateTo({
            url:'../viewAll/viewAll'
        })
    },
    confirmRequest:function(){

    },
    searchRequest:function(){
        wx.request({
            url: domain+'/getinfo_by_name',
            method: 'POST',
            data: {
                name:wx.getStorageSync('name')
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                console.log(res,'成功');
            },
            fail: function(err) {
                this.toast('网络异常，请稍后再试');
            }
        })
    }

}

Page(pageObject)
