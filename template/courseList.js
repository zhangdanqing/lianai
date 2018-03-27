const temp = {
    onShareAppMessage: function () {
        return {
            title: '找好麦穗，就上麦田转转',
            desc: '找好麦穗，就上麦田转转',
            path: '/pages/index/index',
            //imageUrl:getApp().globalData.configData.common.shareImg,
            success: function(res) {
            }
        }
    },
}
export default temp
