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
    viewAll:function(){
        wx.navigateTo({
            url:'../viewAll/viewAll'
        })
    }
    // onLoad: function(options) {
    //     if(options.label)
    //     {
    //         let obj={
    //             tag:options.label
    //         }
    //         this.setData ({
    //             inputSearch:options.label,
    //         })
    //         this.searchRequest(obj);
    //     }
    // },
    // tagClick:function(event){
    //     let con=event.currentTarget.dataset.con;
    //     this.setData ({
    //         inputSearch: con,
    //         clearIcon:true,
    //         inpType:"tag"
    //     })
    //     this.subRequest(con);
    // },
    // clearContent:function(){
    //     this.setData ({
    //         inputSearch: "",
    //         clearIcon:false
    //     })
    // },
    // onInp:function(event){
    //     if(event.detail.value.length!=0){
    //         this.setData ({
    //             clearIcon:true
    //         })
    //     }
    //     this.setData ({
    //         inputSearch:event.detail.value,
    //         inpType:"wd"
    //     })
    // },
    // focusInp:function(event){
    //     if(event.detail.value.length!=0){
    //         this.setData ({
    //             clearIcon:true
    //         })
    //     }
    // },
    // blurInp:function(event){
    //     this.setData ({
    //         clearIcon:false
    //     })
    // },
    // formSubmit: function(e) {
    //     let value=e.detail.value.searchData;
    //     this.subRequest(value);
    // },
    // subRequest:function(value){
    //     let type=this.data.inpType;
    //     let obj={};
    //     switch(type)
    //     {
    //         case "wd":
    //             let arr=this.trimStr(value).split(" ");
    //             obj[type]=JSON.stringify(arr);
    //             break;
    //         case "tag":
    //             obj[type]=value;
    //             break;
    //     }
    //     this.searchRequest(obj);
    // },
    // searchRequest:function(obj){
    //     wx.request({
    //         url: domain+'/xcx/search',
    //         data:obj,
    //         method:"POST",
    //         header: {'Content-Type': 'application/x-www-form-urlencoded'},
    //         success: (res)=>{
    //             if(res.data && res.data.book && res.data.book.length>0)
    //             {
    //                 this.setData ({
    //                     dpResult:true,
    //                     allBookList:util.formatImgSrc(res.data.book),
    //                     isNoData:false
    //                 })
    //             }else{
    //                 this.setData ({
    //                     dpResult:false,
    //                     allBookList:[],
    //                     isNoData:true
    //                 })
    //             }
    //         }
    //     })
    // },
    // confirmRequest:function(e){
    //     let value=e.detail.value;
    //     this.subRequest(value);
    // },
    // trimStr:function(str){
    //     return str.replace(/(^\s*)|(\s*$)/g,"").replace(/\s+/g, ' ');
    // },
    // goDetail:function(event){
    //     if(event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.bid){
    //         let bookId=event.currentTarget.dataset.bid;
    //         wx.redirectTo({
    //             url:'../detail_infor/detail_infor?bid='+bookId
    //         })
    //     }
    // }
}

Page(pageObject)
