const domain = getApp().globalData.domain;
let genderObj = {
    1: '男',
    2: '女'
}
let pageObject = {
    data: {
        lifePhoto: "",
        name: "",
        date: "",
        gender: "",
        baseInfor: [],
        declaration: "",
        hobby: "",
        mateSelection: "",
        hasInvite:"",


        data: {
            "is_life_photo": "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg",
            "name": "金可言",
            "date": "1991-2-3",
            "gender": 2,
            "addressRegion": "北京 顺义",
            "originRegion": "河北 张家口 涿鹿",
            "industry": "互联网",
            "occupation": "开发",
            "income": "13万",
            "height": "187",
            "weight": "100",
            "nation": "汉",
            "education": "本科",
            "school": "北大",
            "maritalStatus": "已婚",
            "purchase": 0,
            "carBuying": 1,
            "mateSelection": "lalala",
            "hobby": "sudysudysd",
            "declaration": "谈一场不分手的恋爱，结一次永远不离的婚",
            "invite": "1111"
        }
    },
    onLoad: function() {
        this.setData({
            baseInfor: this.formatBaseData(this.data.data),
            lifePhoto: this.data.data.is_life_photo,
            name: this.data.data.name,
            date: this.data.data.date,
            gender: this.dictObj(genderObj, this.data.data.gender),
            declaration: this.data.data.declaration,
            hobby: this.data.data.hobby,
            mateSelection: this.data.data.mateSelection,
            hasInvite:this.data.data.invite?'是':'否'
        })
    },
    onShow: function() {
        wx.request({
            url: domain + '/detail',
            method: 'POST',
            data: {
                name: wx.getStorageSync('name')
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                if (res.data && res.data.code === 0) {
                    if(res.data.data){
                        this.setData({
                            baseInfor: this.formatBaseData(res.data.data),
                            lifePhoto: res.data.data.is_life_photo,
                            name: res.data.data.name,
                            date: res.data.dataa.date,
                            gender: this.dictObj(genderObj, res.data.data.gender),
                            declaration: res.data.data.declaration,
                            hobby: res.data.data.hobby,
                            mateSelection:res.data.data.mateSelection,
                            hasInvite:res.data.data.invite?'是':'否'
                        })
                    }
                }
            },
            fail: (err) => {
                this.toast('网络异常，请稍后再试');
            }
        })
    },
    formatBaseData: function(data) {
        let arr = ['industry', 'occupation', 'gender', 'date', 'income', 'height', 'nation', 'education', 'maritalStatus'];
        let json = data;
        let base = [];
        Object.keys(json).forEach(function(value) {
            if (arr.indexOf(value) === -1) {} else {
                if (json[value]) {
                    base.push(json[value]);
                }
            }
        });
        return base;
    },
    dictObj: function(obj, name) {
        if (obj[name]) {
            return obj[name];
        } else {
            return "";
        }
    }
}
Page(pageObject);
