// miniprogram/pages/movieDetail/movieDetail.js

const db = require('../../utils/db')
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{},
    actionSheetHidden:true,
    actionSheetItems:['文字','音频'],
    isFavorite: false,
    userInfo: null,
    commentList:[],
  }, 
  // 底部弹出框
  actionSheetTap(){
    if(!this.data.isFavorite){ //未收藏
      this.setData({
        actionSheetHidden:!this.data.actionSheetHidden
      })
    }
  },
  actionSheetChange(){
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindItemTap(e){
    let selectType = e.currentTarget.dataset.name
    let movieDetail = {
      image: this.data.movie.image,
      title: this.data.movie.title,
      movieId: this.data.movie._id
    }
    // console.log(movieDetail)
    wx.setStorageSync('movieDetail', movieDetail)
    wx.navigateTo({
      url: '../editComment/editComment?selectType=' + selectType
    })
  },
  // 跳转影评列表页
  skipToComment(){
    let movieId = this.data.movie._id
    wx.navigateTo({
      url: '../commentList/commentList?movieId=' + movieId,
    })
  },

  //跳转到我的影评
  myComments(){
    let movieId = this.data.movie._id
    let name = this.data.userInfo.nickName

    wx.navigateTo({
      url: '../commentList/commentList?movieId=' + movieId + "&name=" + name,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovieDetail(options)
  },

  onShow: function() {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo,
        isFavorite: true,
      })

    }).catch(err => {
      console.log('Not Authenticated yet');
    })
  },
  
  // 根据ID获取电影详情
  getMovieDetail(id){
    wx.showLoading({
      title: 'Loading...',
    })

    db.getMovieById(id).then(result => {
      wx.hideLoading()
      const data = result.result
      // console.log(data)
      if (data){
        this.setData({
          movie: data
        })
      } else {
        setTimeout(() => {
          wx.navigateBack()
        }, 5000)
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
      
      setTimeout(() => {
        wx.navigateBack()
      }, 5000)
    })

  }
})