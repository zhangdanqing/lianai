const domain = getApp().globalData.domain;
import tempObj from '../../template/courseList';
let genderObj = {
    1: '男',
    2: '女'
}
let pageObject = {
    data: {
        image: "",
        name: "",
        date: "",
        gender: "",
        baseInfor: [],
        declaration: "",
        hobby: "",
        mateSelection: "",
        hasInvite: "",
    },
    onLoad: function(option) {
        this.detailRequest(option.name);
    },
    detailRequest: function(name) {
        let dataObj = {
            name: name
        }
        wx.request({
            url: domain + '/detail',
            method: 'POST',
            data: dataObj,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                if (res.data && res.data.code === 0) {
                    if (res.data.data) {
                        this.setData({
                            baseInfor: this.formatBaseData(res.data.data),
                            image: res.data.data.image,
                            name: res.data.data.name,
                            date: res.data.data.date,
                            gender: this.dictObj(genderObj, res.data.data.gender),
                            declaration: res.data.data.declaration,
                            hobby: res.data.data.hobby,
                            mateSelection: res.data.data.mateSelection,
                            hasInvite: res.data.data.invite ? '是' : '否'
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
        let arr = ['industry', 'occupation', 'date', 'income', 'height', 'nation', 'education', 'maritalStatus'];
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
    },
    previewImage: function(e) {
        let current = e.target.dataset.src;
        wx.previewImage({
            current: current,
            urls: [current],
            success: (res) => {
            }
        })
    }
}
for(let name in tempObj)
{
    pageObject[name] = tempObj[name]
}
Page(pageObject);
