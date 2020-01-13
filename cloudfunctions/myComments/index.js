// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  const name = event.name
  const res = await db.collection('comments').where({
    name:name
  }).get()
  return res
}