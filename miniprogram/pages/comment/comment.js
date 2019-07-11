// pages/comment/comment.js
const db=wx.cloud.database({
  env:"web-test-01-fjjb8"
});
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movieid:0,  //电影id
    detail:{},  //电影详细信息
    content:'',  //评论初始值
    score:5,  //评分初始值
    images:[], //保存用户选中的图片
    fileIds:[],  //保存图片fileID
  },
  submit(){
    //1.上传9张图片
    wx.showLoading({
      title: '评论中',
    });
    console.log(this.data.content+"_"+this.data.score);
    //2.上传图片到云存储
    //3.创建promise数组
    let promiseArr=[];
    //4.创建循环9次
    for(let i=0;i<this.data.images.length;i++){
    //5.创建promise  push数组中
    promiseArr.push(new Promise((reslove,reject)=>{
      //5.1获取当前上传图片
      var item=this.data.images[i];
      //5.2创建正则表达式拆分文件后缀 .jpg .png
      let suffix=/\.\w+$/.exec(item)[0];
      //5.3上传图片->将data中图片上传云存储
      wx.cloud.uploadFile({
        cloudPath:new Date().getTime()+suffix, //上传至云端的路径
        filePath:item,  //小程序临时路径
        success:res=>{
          //console.log(res.fileID);
          //将当前文件id保存到data
          var ids=this.data.fileIds.concat(res.fileID);
          this.setData({
            fileIds:ids
          })
          //5.4上传成功将当前云存储fileID保存数组
          //5.5追加任务列表
          reslove();
        },
        fail:err=>{
          console.log(err);
        }
      })
      //5.6失败显示出错信息
      }));
    }
    //6.一次性将图片  fileID，分数，内容  保存集合中[集合中一条记录]
    Promise.all(promiseArr).then(res=>{
      //6.1添加数据
      db.collection("comment").add({
        data:{
          content:this.data.content,  //评论内容
          score:this.data.score,      //评论分数
          movieid:this.data.movieid,  //电影id
          fileIds:this.data.fileIds   //上传图片的id
        }
      }).then(res=>{
        wx.hideLoading();   //隐藏加载框
        wx.showToast({      //显示提示框
          title: '评论成功',
        })
      }).catch(err=>{
        wx.hideLoading();
        wx.showToast({
          title: '评论失败',
        })
      })
    })
  },
  uploadImg(){
    //选中图片 9张
    wx.chooseImage({
      count:9,
      sizeType:["original","compressed"],
      sourceType:["album","camera"],
      success:res=>{
        const tempFiles=res.tempFilePaths;
        //console.log(tempFiles);
        //预览：将用户选中的图片保存
        this.setData({
          images:tempFiles
        })
      },
    })
  },
  onScoreChange(e){
    //获取用户评分内容
    //console.log(e.detail);
    this.setData({
      score: e.detail
    });
  },
  onContentChange(e){
    //获取用户输入框中内容
    //console.log(e.detail);
    this.setData({
      content:e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.接收电影列表传递参数id并且保存data
    //console.log(options.id);
    this.setData({
      movieid:options.id
    });
    //2.提示数据加载框
    wx.showLoading({
      title: '加载中',
    })
    //3.调云函数，将电影传递云函数
    wx.cloud.callFunction({
      name:"getDetail", //云函数名称
      data:{movieid:options.id} //参数
    }).then(res=>{
      //4.获取云函数返回数据并且保存data
      //console.log(res.result);
      //4.1将字符串转js  obj
      var obj=JSON.parse(res.result);
      //4.2保存data
      this.setData({
        detail:obj
      })
      //5.隐藏加载框
      wx.hideLoading();
    }).catch(err=>{
      wx.hideLoading();
    })
    
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})