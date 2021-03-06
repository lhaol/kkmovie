const db = wx.cloud.database({
  env: 'movies-tijov'
})

module.exports = {
  getMovieList() {
    return db.collection('movies').get()
  },

  getCommentList() {
    return db.collection('comments').get()
  },

  getComment(id) {
    return db.collection('comments').where({
      movieId:id
    }).get()
  },

  getMovieById(id){
    return wx.cloud.callFunction({
      name: 'getMovieById',
      data:{
        id
      }
    })
  },

  addComment(data) {
    console.log(data)
    return util.isAuthenticated()
      .then(() => {
        //console.log("add successsss!")
        db.collection('comments').add({
          data: {
            username: data.username,
            avatar: data.avatar,
            content: data.content,
            id: data.movieId,
            createTime: +new Date(),
            image:data.image,
            name: data.name
          },
        })
      }).catch((err) => {
        console.log(err)
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {
         }
      })
  },

}