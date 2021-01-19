// 0 引入 用来发送请求的方法 微信小程序引入要把路径补全
import { request } from "../../request/index.js"
Page({
  data: {
    //轮播图数值
    swiperList:[],
    //导航 数值
    catesList:[],
    // 楼层数据
    floorList:[]

    
  },
  //options(Object)
  onLoad: function(options){
    //1 发送异步请求获取轮播图数据  优化手段通过es6的promise来解决回调地狱问题
    // wx.request({
    //   url: ' /home/swiperdata',
    //   success: (result)=>{
    //     this.setData({
    //       swiperList:result  
    //     })
    //   }
    // });

    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  // 获取轮播图数据
  getSwiperList(){
    request({url:"/home/swiperdata"})
    .then(result =>{
      this.setData({
              swiperList:result
             })
    })
  },
    // 获取 分类导航数据
    getCateList(){
      request({url:"/home/catitems"})
      .then(result =>{
        this.setData({
          catesList:result
               })
      })
    }, // 获取 分类导航数据
    getFloorList(){
      request({url:"/home/floordata"})
      .then(result =>{
        this.setData({
          floorList:result
               })
      })
    }
});