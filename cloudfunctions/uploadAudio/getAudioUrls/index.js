// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  const uploadAudios = db.collection("uploadAudios");
  let { OPENID } =cloud.getWXContext();
  try {
    var Url = await uploadAudios.where({
      user: OPENID
    }).get();
    return {
      state: true,
      message: "get audio url list successed",
      data: Url
    }
  } catch (e) {
    return {
      state: false,
      message: "get audio url list failed",
      error_message: e
    }
  }
}