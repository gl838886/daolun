/*
 * @Author: your name
 * @Date: 2022-06-09 22:35:12
 * @LastEditTime: 2022-06-10 19:25:58
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-16\cloudfunc tions\uploadAudio\changeAudioUrl\index.js
 */
// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

/**
 * 云数据库相关内容可以参考：https://www.ourspark.org/point/course_content/602df4b15165a14f347bb48b,%E5%B0%8F%E7%A8%8B%E5%BA%8F%E4%BA%91%E5%BC%80%E5%8F%91,%E4%BA%91%E6%95%B0%E6%8D%AE%E5%BA%93%E6%9C%8D%E5%8A%A1
 */ 
exports.main = async (event, context) => {
  const uploadAudios = db.collection("uploadAudios");
  let { OPENID } =cloud.getWXContext();
  try {
    console.log(event.file_id)
    await uploadAudios.where({
      user: OPENID
    }).update({
      data: {
        file_id: event.file_id
      }
    });
    return {
      state: true,
      message: "change audio url successed"
    };
  } catch (err) {
    return {
      state: false,
      message: "change audio url failed",
      error_message: err
    }
  }
} 