//index.js
//获取应用实例
var app = getApp()



Page({

  data: {
    //默认未获取地址
    hasLocation: false
  },
  
 
  //获取经纬度
  getLocation: function (e) {
    console.log(e)
    var that = this
    const requestTask = wx.request({
      url: 'https://api.heclouds.com/devices/505324186/datapoints?datastream_id=longitude,latitude&limit=1',
      header: {
        'content-type': 'application/json',
        'api-key': 'm=TfQ2xOOY6nq5zbhXeVaViFaew='
      },
      success: function (res) {
        var app = getApp()
        app.globalData.longitude = res.data.data.datastreams[1].datapoints[0].value
        app.globalData.latitude = res.data.data.datastreams[0].datapoints[0].value
        console.log(app.globalData.longitude)
        console.log(app.globalData.latitude)
        that.setData({
          hasLocation: true,
          location: {
            longitude: app.globalData.longitude,
            latitude:app.globalData.latitude
          }
        })
      }
    })
  },
  //根据经纬度在地图上显示
  openLocation: function (e) {
    var value = e.detail.value
    console.log(e)
    console.log(value.longitude)
    wx.openLocation({
      longitude: Number(app.globalData.longitude),
      latitude: Number(app.globalData.latitude)
    })
  }

})
