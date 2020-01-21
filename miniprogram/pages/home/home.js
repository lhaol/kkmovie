// miniprogram/pages/home/home.js

const db = require('../../utils/db')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList:[],
    commentList: [],
    name: '',
    headshort: '',
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
  // skipToComment() {
  //   let commentId = this.data.commentList[0]._id
  //   wx.navigateTo({
  //     url: '../commentDetail/commentDetail?commentId=' + commentId,
  //   })
  // },


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
  },

  getMovieList() {
    wx.showLoading({
      title: 'Loading.....',
    })

    db.getMovieList().then(result => {
      wx.hideLoading()

      const movieList = result.data 
      const movieId =movieList[0]._id

      if (movieList.length) {
        this.getComment(movieId)
        this.setData({
          movieList,
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },

  // getComment(id){
  //   wx.cloud.callFunction({
  //     name:'movieComments',
  //     data:{
  //       movieId:id
  //     }
  //   }).then(res=>{
  //     console.log(res)
  //     this.setData({
  //      commentList:res.result.data[0]
  //    })
  //   })
  // }

  getComment(movieId) {
    // console.log(movieId.movieId)
    wx.cloud.callFunction({
      name: 'movieComments',
      data:{
        movieId: movieId
      }
    }).then(result => { 
      // console.log(result)
      const commentList = result.result.data[0]
      console.log(commentList)
      console.log(commentList.headshort)
      if (commentList.length) {
        this.setData({
          commentList,
          name: commentList.name,
          headshort: commentList.headshort,
        })
      }
    })
  },
})