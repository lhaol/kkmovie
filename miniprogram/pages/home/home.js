// miniprogram/pages/home/home.js

const db = require('../../utils/db')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // recommendMovie: {}, // 推荐电影
    // recommendList: [], // 推荐电影列表
    // movieTitle: '',
    // movieImg: '',
    // headshort: '',
    // name: '',
    // indicatorDots: false,
    // autoplay: true,
    // interval: 5000,
    // duration: 1000,
    // circular: true
    movieList:[],
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
      url: '../myFavorites/myFavorities',
    })
  },
  // 跳转影评详情
  skipToComment() {
    let commentId = this.data.recommendMovie._id
    wx.navigateTo({
      url: '../commentDetail/commentDetail?commentId=' + commentId,
    })
  },
  //跳转电影详情
  skipToDetail() {
    let movieId = this.data.recommendMovie.movieId
    wx.navigateTo({
      url: '../movieDetail/movieDetail?movieId=' + movieId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMovieList()
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
  }
})