// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  traceUser: true,
  env: 'movies-tijov'
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  // return db.collection('comments').get()
  const title = event.title.title
  const commentRes = await db.collection('comments').where({
    title: title
  }).get()
  const comment = commentRes.data
  console.log(comment)
  return comment

  // return event.title
  // return title
}