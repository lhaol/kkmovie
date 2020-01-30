// miniprogram/pages/commentList/commentList.js

const db = require('../../utils/db')

let timer = null;
const innerAudioContext = wx.createInnerAudioContext();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    commentlist: [],
    startPlay: false
  },
  startPlay(e) {
    let that = this
    this.setData({
      startPlay: true,
    })
    clearInterval(timer)
    let n = parseInt(e.target.dataset.item.radioTimer)
    timer = setInterval(function () {
      n--
      let s = parseInt(n % 60)
      if (n == 0) {
        clearInterval(timer)
        that.setData({
          startPlay: false
        })
      }
    }, 1000)
    let voice = e.target.dataset.item.voice
    this.playRecord(voice)
  },
  // 播放录音
  playRecord(voice) {
    innerAudioContext.autoplay = true;
    innerAudioContext.src = voice;
    innerAudioContext.onPlay(() => {
      console.log('start play')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
    })
  },
  skipToHome() {
    wx.redirectTo({
      url: '../home/home',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let name =options.name
    let movieId = options.movieId
    if(name){
      this.getCommentListByName(name, movieId)
    }else{
      this.getCommentListByMovie(movieId)
    }
  },

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
      console.log(res)
    })
  },

  getCommentListByMovie(movieId) {
    wx.showLoading({
      title: 'Loading...',
    })
    wx.cloud.callFunction({
      name: 'movieComments',
      data:{
        movieId: movieId
      }
    }).then(res => {
      wx.hideLoading()  
      const commentList = res.result.data
      // console.log(commentList)
      if (commentList.length) {
        this.setData({
          commentList
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // this.getCommentListByMovie(res => {
    //   wx.stopPullDownRefresh()
    // })
    wx.stopPullDownRefresh()
  }
})