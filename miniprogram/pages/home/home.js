// miniprogram/pages/home/home.js

const db = require('../../utils/db')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList:[],
    commentList: [],
  },

  // 跳转热门电影
  skipToHot() {
    wx.navigateTo({
      url: '../hotMovie/hotMovie',
    })
  },
  // 跳转我的电影
  skipToMy() {
    wx.navigateTo({
      url: '../myFavorites/myFavorites',
    })
  },

  // 跳转影评详情
  skipToComment() {
    let commentId = this.data.commentList[0]._id
    wx.navigateTo({
      url: '../commentDetail/commentDetail?commentId=' + commentId,
    })
  },


  //跳转推荐电影详情
  skipToDetail() {
    let movieId = this.data.movieList[0]._id
    // console.log(movieId)
    wx.navigateTo({
      url: '../movieDetail/movieDetail?movieId=' + movieId,
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMovieList()
    this.getComment(this.data.commentList[0]._id)
  },

  getMovieList() {
    wx.showLoading({
      title: 'Loading.....',
    })

    db.getMovieList().then(result => {
      wx.hideLoading()

      const movieList = result.data 
      // console.log(movieList)

      if (movieList.length) {
        this.setData({
          movieList
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },

  getComment(movieId) {
    wx.cloud.callFunction({
      name: 'movieComments',
      data: {
        movieId: movieId
      }
    }).then(result => {
      const commentList = result.result.data[0]
      if (commentList.length) {
        this.setData({
          commentList
        })
      } else {
        setTimeout(() => {
          wx.navigateBack()
        }, 5000)
      }
    })
  },
})