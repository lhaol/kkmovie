//index.js
const app = getApp()

const db = wx.cloud.database({
  env: 'movies-tijov'
})

Page({
  data: {
  },

  onLoad: function() {
    getMovieList() {
      wx.showLoading({
        title: 'Still Loading...',
      })
    }
  }

})
