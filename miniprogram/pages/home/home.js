// pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movielist:[]  //保存电影列表
  },
  //详情跳转
  jumpComment(e){
    //↓跳转：关闭并且跳转
    //wx.redirectTo({
      //url: '/pages/comment/comment',
    //})
    //获得电影id
    // e 事件对象； target 触发事件元素 button
    // dataset所有自定义属性
    var id=e.target.dataset.movieid;
    //↓跳转：保留并且跳转
    wx.navigateTo({
      url: '/pages/comment/comment?id='+id,
    })
  },
  loadMore:function(){
    //加载更多
    //1.调云函数 
    wx.cloud.callFunction({
      name: "movielist",  //云函数名称
      data: {
        start: this.data.movielist.length,
        count: 10
      }
    }).then(res => {
      //console.log(typeof res.result); //string
      //将字符串转为js对象
      var obj = JSON.parse(res.result);
      //电影列表
      //console.log(obj.subjects);
      //放入movielist
      this.setData({
        movielist: this.data.movielist.concat(obj.subjects) //一句话！ concat 两个函数的拼接 
      });
    }).catch(err => {
      console.log(err);
    });
    //将字符串->转换js  obj->显示wxml标题
    //2.将云函数返回电影列表保存
    //3.显示当前组件
  },
  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    this.loadMore();
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
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})