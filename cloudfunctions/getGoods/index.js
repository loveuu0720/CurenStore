// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init() // 使用当前云环境
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let num = event.num;
  let page = event.page;
 return await db.collection("goodsItem").skip(page).limit(num).get()
}