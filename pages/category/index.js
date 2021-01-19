import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContent: [],
    //被点击的左侧菜单
    currentIndex: 0,
    //右侧内容滚动条距离顶部的距离
    scrollTop: 0
  },
  //接口返回数据
  Cates: [],

  onLoad: function(options) {
    /*
    0、web本地存储和小程序中本地存储区别
      1 写法不一样
      web: localStorage.setItem("key","value") localStorage.getItem("key")
      小程序: wx.setStorageSync("key","value") wx.getStorageSync("key");
      2 存值时 有没有做类型转换
       web会调用toString()再存进去,小程序不会
    1、判断本地有没有旧数据
    {tiem:Date.now(),data:[...]}
    2、没有旧数据直接发请求
    3、有旧数据同时旧数据没有过期使用本地的旧数据即可
    */

    //1 获取本地存储的数据
    const Cates = wx.getStorageSync("cates");
    //2 判断
    if (!Cates) {
      //不存在 发送请求获取数据
      this.getCates();
    } else {
      //有旧数据 定义过期时间 10s
      if (Date.now() - Cates.time > 1000 * 10) {
        //重新发送请求
        this.getCates();
      } else {
        // 可以使用旧的数据
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({ leftMenuList, rightContent });
      }
    }
  },
  //获取分类数据
  async getCates() {
    // request({
    //   url:"/categories"
    // }).then(res =>{
    //   this.Cates = res.data.message;
    //   // 把接口数据存在本地中
    //   wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
    //   //构建左侧的大菜单数据
    //   let leftMenuList = this.Cates.map(v=>v.cat_name);
    //   let rightContent = this.Cates[0].children;
    //   this.setData({leftMenuList,rightContent});
    // })

    // 1 使用es7的async await来发送异步请求
    const res = await request({ url: "/categories" });
    this.Cates = res;
    // 把接口数据存在本地中
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
    //构建左侧的大菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name);
    let rightContent = this.Cates[0].children;
    this.setData({ leftMenuList, rightContent });
  },
  //左侧菜单点击事件
  handleItemTap(e) {
    // 1、获取被点击标题身上的索引
    // 2、给data中的currentIndex赋值
    const { index } = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      //重新设置 右侧内容scroll-view标签的距离顶部的距离
      scrollTop: 0
    });
  }
});
