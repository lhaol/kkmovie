// miniprogram/pages/home/home.js

const db = require('../../utils/db')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList:[],
    // commentList: [],
    comment: [],
    swiperIndex:0,
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
  skipToComment(event) {
    // let commentId = this.data.commentList[0]._id
    let commentId = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../commentDetail/commentDetail?commentId=' + commentId,
    })
  },

  //跳转推荐电影详情
  skipToDetail(event) {
    // let movieId = this.data.movieList[0]._id
    let movieId = event.currentTarget.dataset.id
    console.log(movieId)
    wx.navigateTo({
      url: '../movieDetail/movieDetail?movieId=' + movieId,
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let index = this.data.swiperIndex
    this.getMovieList()
    let movieId = this.data.movieList[index]._id
    // this.getCommentList()
    this.getComment(movieId)
  },

  swiperChange(e){
    const swiperIndex = e.detail.current // 当前的swiper的页数
    this.setData({
      swiperIndex: swiperIndex
    })
    // console.log(swiperIndex)
    let movieId = this.data.movieList[swiperIndex]._id
    console.log(movieId)
    this.getComment(movieId)
  },

  getMovieList() {
    wx.showLoading({
      title: 'Loading.....',
    })
    db.getMovieList().then(result => {
      wx.hideLoading()
      const movieList = result.data 
      if (movieList.length) {
        this.setData({
          movieList: movieList
        })
        // console.log(movieList)
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },

  // getCommentList() {
  //   db.getCommentList().then(result => {
  //     const commentList = result.data
  //     if (commentList.length) {
  //       this.setData({
  //         commentList,
  //       })
  //       console.log(commentList)  
  //     }
  //   }).catch(err => {
  //     console.error(err)
  //   })
  // },

  getComment(id){
    console.log(id)
    db.getComment(id).then(res =>{
      this.setData({
       comment:res.data[0],
     })
     console.log(comment)
    }).catch(error=>{
      console.log(error)
      wx.hideLoading()
    })
  },

})