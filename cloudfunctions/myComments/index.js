// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  traceUser: true,
  env: 'movies-tijov'
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('comments').where({
    name: event.name.name
  }).get()
  // return event
}