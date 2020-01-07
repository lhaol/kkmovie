// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  traceUser: true,
  env: 'movies-tijov'
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const id = event.id.movieId
  const movieRes = await db.collection('movies').doc(id).get()
  const movie = movieRes.data
  return movie
  // return event
}