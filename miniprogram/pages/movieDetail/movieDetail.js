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
    myCommentsFlag: false,
    userInfo: null,
    commentList:[],
  }, 
  
  // 设置myCommentsFlag
  setMyCommentsFlag(userInfo, commentList){
    if (userInfo && commentList.length){
      this.setData({
        myCommentsFlag: true
      })
    } else {
      this.setData({
        myCommentsFlag: false
      })
    }
  },
  
  // 底部弹出框
  actionSheetTap(){
    if(!this.data.myCommentsFlag){ //未登录 或 已登录但无我的影评
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

    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo,
      })
      if (userInfo){ //如果用户已登录， 查看此电影是否有该用户的评论， 如果有则设置myCommentsFlag值为真 （显示我的影评），如果没有则值为假（显示添加影评）。
        let name = userInfo.nickName
        let movieId = this.data.movie._id
        // console.log(movieId)
        // console.log(name)
        this.getCommentListByName(name, movieId)
        let commentList = this.data.commentList //为什么此处获取的commentList总为空？
        // console.log(commentList)
        this.setMyCommentsFlag(userInfo, commentList)
        // console.log(this.data.myCommentsFlag)
      }
    }).catch(err => {
      console.log(err)
      console.log('Not Authenticated yet');
    })
  },

  onShow: function() {

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

  },

  //根据登录的用户名和movieId 获取CommentList
  getCommentListByName(name, movieId){
    wx.cloud.callFunction({
      name: 'myCommentsByName',
      data: {
        name,
        movieId
      }
    }).then(res => {
      this.setData({
        commentList: res.result.data
      })
      // console.log(this.data.commentList)
    })
  }
})