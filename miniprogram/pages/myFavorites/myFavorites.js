// miniprogram/pages/myFavorites/myFavorities.js
const db = require('../../utils/db')
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList: [],
    selectNum: '0', // tab选中值
    userInfo: null
  },
  // tab切换
  selectTab(e) {
    let selectNum = e.target.dataset.num
    this.setData({
      selectNum
    })
    if (selectNum == 0) { // 已收藏
      this.setData({
        commentList: []
      })
      this.getMyCollection()
      wx.showLoading({
        title: 'Loading...',
      })
    } else if (selectNum == 1) { 
      this.setData({
        commentList: []
      })
      this.getMyRelease()
      wx.showLoading({
        title: '',
      })
    }
  },
  // 返回首页
  skipToHome() {
    wx.redirectTo({
      url: '../home/home'
    })
  },
  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMyCollection()
  },

  onShow: function() {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
    })
  },

  getMyCollection(callback) { // 查收藏
    wx.showLoading({
      title: 'loading',
    })
    
    let currentUser = wx.getStorageSync('currentUser')

    wx.cloud.callFunction({
      name: 'myFavorites',
      data: {
        name: currentUser
      }
    }).then(res => {
      this.setData({
        commentList: res.result.data
      })
      // console.log(res)
      wx.hideLoading()
      callback && callback()
    })
  },

  getMyRelease(callback) { // 查发布
    wx.showLoading({
      title: 'loading',
    })
    
    let currentUser = wx.getStorageSync('currentUser')

    wx.cloud.callFunction({
      name:'myComments',
      data:{
        name: currentUser
      }
    }).then(res => {
      this.setData({
        commentList: res.result.data
    })
    console.log(res)
    wx.hideLoading()
    callback && callback()
  })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    if (this.data.selectNum == 0) {
      this.getMyCollection(res => {
        wx.stopPullDownRefresh()
      })
    } else if (this.data.selectNum == 1) {
      this.getMyRelease(res => {
        wx.stopPullDownRefresh()
      })
    }
  }
})