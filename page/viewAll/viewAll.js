const domain = getApp().globalData.domain;
let pageObject = {
    data: {
        name:"",
        lifePhoto:"",
        originRegion:"",
        gender:"",
        baseInfor:[],
        declaration:"",
        hobby:"",
        mateSelection:"",



        data:{
    		"is_life_photo":"http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg",
    		"name":"金可言",
    		"date":"1991-2-3",
    		"gender":0,
    		"addressRegion":"北京 顺义",
    		"originRegion":"河北 张家口 涿鹿",
    		"industry":"互联网",
    		"occupation":"开发",
    		"income":"13万",
    		"height":"187",
    		"weight":"100",
    		"nation":"汉",
    		"education":"本科",
    		"school":"北大",
    		"maritalStatus":"已婚",
    		"purchase":0,
    		"carBuying":1,
    		"mateSelection":"lalala",
    		"hobby":"",
    		"declaration":"",
    		"invite":"32232"
    	}
    },
    onShow: function() {
        wx.request({
            url: domain + '/detail',
            method: 'POST',
            data: {
                name:wx.getStorageSync('name')
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res)=>{
                if (res.data && res.data.code === 0) {
                    // this.setData({
                    //     gender: e.detail.value
                    // })

                }
            },
            fail: (err)=>{
                this.toast('网络异常，请稍后再试');
            }
        })
    },
    formatBaseData:function(){

    }
}
Page(pageObject);
