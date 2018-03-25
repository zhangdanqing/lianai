const temp = {
    onShareAppMessage: function () {
        return {
            title: '找最好的麦穗，最好的方式就是上麦田转转',
            desc: '找最好的麦穗，最好的方式就是上麦田转转',
            path: '/pages/index/index',
            //imageUrl:getApp().globalData.configData.common.shareImg,
            success: function(res) {
            }
        }
    },
}
export default temp
