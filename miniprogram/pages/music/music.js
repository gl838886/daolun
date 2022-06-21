const time = new Date()
const hours = []
const minutes = []
const seconds = []

for (let i = 0; i <=23; i++) {
  hours.push(i)
}

for (let i = 0; i <=59; i++) {
  minutes.push(i)
}

for (let i = 0; i <= 59; i++) {
  seconds.push(i)
}
Page({
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.autoplay = false
    this.innerAudioContext.src = "https://music.163.com/song/media/outer/url?id=1831054932"
    this.innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  data:{
    hours: hours,
    hour:0,
    minutes: minutes,
    minute: 0,
    seconds: seconds,
    second: 0,
    value: [0, 0, 0],
    h:0,
    m:0,
    s:0,
 //存储计时器
    aud_urls:null,
    setInter:null,
 },   
  bindChange: function (e) {
   const val = e.detail.value
   if(this.data.setInter==null)
   {
     this.setData({
      hour: this.data.hours[val[0]],
      minute: this.data.minutes[val[1]],
      second: this.data.seconds[val[2]]
    })
  }
},
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
//计时器

queryTime(){
  const that=this;
  var hou=that.data.h
  var min=that.data.m
  var sec=that.data.s
 
  that.data.setInter  = setInterval(function(){
      sec++
      if(sec>=60){
       sec=0
       min++
       if(min>=60){
         min=0
         hou++
         that.setData({
           h:hou
         })
       }else{
         that.setData({
           m:min
         })
       }
      }else{
        that.setData({
          s:sec
        })
      }
      if(that.data.hour==that.data.h
        &&that.data.minute==that.data.m
        &&that.data.second==that.data.s)
        {
          that.audioPlay()
          that.taskEnd()
          that.uploadTime()
        }
   },1000)
},
//开始工作
 taskStart(){
   var that=this
   if(that.data.setInterval==null)
   {
     that.clearTime()
     that.queryTime()
  }
 },
 //结束工作
 taskEnd(){
   var that=this
   clearInterval(that.data.setInter)
   that.uploadTime()
   that.setData
   (
     {
       setInter:null,
     }
   )
 },
 //时间归零
 clearTime(){
   this.setData
   ({
     h:0,
     m:0,
     s:0,
   })
 },
 onUnload: function () {
   var that =this;
   //清除计时器  即清除setInter
   clearInterval(that.data.setInter)
},
//播放音乐
audioPlay()
{
  this.innerAudioContext.play()
},
//停止播放
audioStop(){
  this.innerAudioContext.stop()
},
//上传铃声
upload: function(e) {
  wx.showLoading({
    title: '铃声加载中',
  })
  wx.chooseMessageFile({
    count: 1,
  })
  .then(res => {
    wx.cloud.uploadFile({
      cloudPath: 'uploadAudio/' + (new Date()).getTime().toString() + '.mp3',
      filePath: res.tempFiles[0].path
    })
    .then(res1 => {
      if (res1.errMsg == 'cloud.uploadFile:ok') {
        if(this.innerAudioContext.src=="https://music.163.com/song/media/outer/url?id=1831054932"){
          wx.cloud.callFunction({
            name: 'uploadAudio',
            data: {
              type: 'addAudioUrl',
              file_id: res1.fileID
            }
          })
          .then(res2 => {
            if (res2.result.state) {
              this.data.aud_urls=res1.fileID;
                this.innerAudioContext.src= this.data.aud_urls;
                wx.hideLoading()
            }
            else {
              throw(res2.result.message);
            }
          })
          .catch(err2 => {
            console.log('调用添加url云函数错误', err2);
            wx.cloud.deleteFile({
              fileList: [res1.fileID]
            })
            .then(res3 => {
              console.log(res3);
            })
            .catch(err3 => {
              console.log('删除文件错误', err3);
            })
          })
       }
       else
       {
        wx.cloud.deleteFile({
          fileList: [this.innerAudioContext.src]
        }) 
        .then(res4 => {
          console.log(res4);
        })
        wx.cloud.callFunction({
          name: 'uploadAudio',
          data: {
            type: 'changeAudioUrl',
            file_id: res1.fileID
          }
        })
        .then(res2 => {
          if (res2.result.state) {
            this.data.aud_urls=res1.fileID;
              this.innerAudioContext.src= this.data.aud_urls;
              wx.hideLoading()
          }
          else {
            throw(res2.result.message);
          }
        })
        .catch(err2 => {
          console.log('调用更改url云函数错误', err2);
          wx.cloud.deleteFile({
            fileList: [res1.fileID]
          })
          .then(res3 => {
            console.log(res3);
          })
          .catch(err3 => {
            console.log('删除文件错误', err3);
          })
        })
       }
      }
      else {
        throw(res1.errMsg);
      }
    })
    .catch(err1 => {
      console.log('上传云存储错误', err1);
    })
  })
  .catch(err => {
    wx.hideLoading()
        wx.showToast({
          title: '上传错误',
          icon:"error"
        })
    console.log('获取音频错误', err);
  })
},
//获取铃声
onLoad: function(options) {
  wx.cloud.callFunction({
    name: 'uploadAudio',
    data: {
      type: 'getAudioUrls'
    }
  })
  .then(res => {
    if (res.result.state) {
        this.data.aud_urls=res.result.data.data[0].file_id;
        this.innerAudioContext.src= this.data.aud_urls
    }
    else {
      throw(res.result.message);
    }
  })
  .catch(err => {
    console.log('获取音频url列表错误', err);
  })
},
//上传时间 
uploadTime() 
{
  wx.cloud.callFunction({
    name: 'uploadAudio',
    data: {
      type: 'addTime',
      hour:this.data.h,
      minute:this.data.m,
      second:this.data.s,
    }
  })
}
})