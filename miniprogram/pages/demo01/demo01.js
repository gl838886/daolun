/*
 * @Author: your name
 * @Date: 2022-06-09 12:58:00
 * @LastEditTime: 2022-06-11 10:54:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-16\miniprogram\pages\demo01\demo01.js
 */
// pages/chart/chart.js
var wxCharts = require("../../utils/wxcharts.js");//相对路径
Page({
    
 
    /**
     * 页面的初始数据
     */
    data: {
        imageWidth:0
    },
 
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       
 
    },
 
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
 
    },
 
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        new wxCharts({
            canvasId: 'columnCanvas',
            type: 'column',
            categories: ['星期日','星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            series: [{
                name: '台灯使用时间',
                data: [5, 2, 4, 3, 4, 8, 4]
            }],
            yAxis: {
                format: function (val) {
                    return val + '小时';
                },
                /*max:400,
                min:0*/
            },
            width: 300,
            height: 200
        });
    },
 
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
 
    },
 
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
 
    },
 
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
 
    },
 
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
 
    },
 
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
 
    }
})