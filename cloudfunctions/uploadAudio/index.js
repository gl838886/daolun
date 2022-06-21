const addAudioUrl = require('./addAudioUrl')
const getAudioUrls = require('./getAudioUrls')
const changeAudioUrl=require('./changeAudioUrl')
const addTime=require('./addTime')
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'addAudioUrl':
      return await addAudioUrl.main(event, context);
    case 'getAudioUrls':
      return await getAudioUrls.main(event, context);
    case 'changeAudioUrl':
      return await changeAudioUrl.main(event, context);
    case 'addTime':
      return await addTime.main(event, context);
  }
}