import tempObj from '../../template/courseList';
let pageObject = {
    data: {

    },
    onShow: function() {
    },

}
for(let name in tempObj)
{
    pageObject[name] = tempObj[name]
}
Page(pageObject)
