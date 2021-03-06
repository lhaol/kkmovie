// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  traceUser: true,
  env: 'movies-tijov'
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const count = db.collection('comments').where({
    _id: event.id
  }).count

  const commentRes = db.collection('comments').where({
    _id: event.id
  }).get()

  const favRes = db.collection('favorites').where({
    _id: event.id
  }).get()
  
  if (count){
    return commentRes  
  } else {
    return favRes
  }

}