// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

/**
 * 云数据库相关内容可以参考：https://www.ourspark.org/point/course_content/602df4b15165a14f347bb48b,%E5%B0%8F%E7%A8%8B%E5%BA%8F%E4%BA%91%E5%BC%80%E5%8F%91,%E4%BA%91%E6%95%B0%E6%8D%AE%E5%BA%93%E6%9C%8D%E5%8A%A1
 */ 
exports.main = async (event, context) => {
  const uploadTimes = db.collection("time");
  let { OPENID } =cloud.getWXContext();
  try {
    await uploadTimes.add({
      data: {
        user: OPENID,
        hour:event.hour,
        minute:event.minute,
        second:event.second,
      }
    });
    return {
      state: true,
      message: "add time successed"
    };
  } catch (err) {
    return {
      state: false,
      message: "add time failed",
      error_message: err
    }
  }
}