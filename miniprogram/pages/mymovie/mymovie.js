// pages/mymovie/mymovie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    images:{}  //保存选中图片
  },
  submit(){
    //1.提交加载框
    //2.获取留言内容
    //3.获取图片
    //4.创建正则表达式载取文件扩展名
    //5.上传图片
      //5.1成功
        //5.1.1获取fileID
        //5.1.2向集合添加记录
      //5.2失败
  },
  onContentChange(e) {
    //获取用户输入框中内容
    //console.log(e.detail);
    this.setData({
      content: e.detail
    })
  },
  upload() {
    //选中一张图片 
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: res => {
        var file = res.tempFilePaths[0];
        //console.log(file);
        //预览：将用户选中的图片保存
        this.setData({
          image: file
        });
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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