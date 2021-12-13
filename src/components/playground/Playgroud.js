import React, { useEffect, useState } from "react";
import { Button, Switch, Divider, message, Card, Image, Tabs } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  NavLink,
} from "react-router-dom";

import AMapLoader from "@amap/amap-jsapi-loader";

import { Parallax } from "rc-scroll-anim";
import ScrollAnim from "rc-scroll-anim";
// import { QueueAnim } from "rc-queue-anim";
// import { TweenOne } from "rc-tween-one";
// import Animate from "rc-animate";

const ScrollOverPack = ScrollAnim.OverPack;
const AMap = window.AMap;
let data = [{
  "lng": 116.191031,
  "lat": 39.988585,
  "count": 10
}, {
  "lng": 116.389275,
  "lat": 39.925818,
  "count": 11
}, {
  "lng": 116.287444,
  "lat": 39.810742,
  "count": 12
},]

function Playground() {

  useEffect(() => {
    let map = new AMap.Map('mapBox', {//启动3D地图
      zoom:11,//级别
      center: [116.397428, 39.90923],//中心点坐标
      pitch:50,
      //rotation:-15,
      viewMode:'3D',//开启3D视图,默认为关闭
      buildingAnimation:true,//楼块出现是否带动画
  });
  map.plugin(["AMap.Heatmap"], function () {
    let heatmap
    //初始化heatmap对象
    heatmap = new AMap.Heatmap(map, {
        radius: 25, //给定半径
        opacity: [0, 0.8]
    });
    //设置数据集：该数据为北京部分“公园”数据
    // heatmap.setDataSet({
    //     data: data, //热力图数据
    //     max: 100
    // });
    return () => {
      
    }
  })
 
 



});



  return (
    <div>
      <h1>北京市井文化</h1>
      <div id="mapBox" style={{ height: 1200, width: "100%" }}></div>
      <NavLink to="/">To LandPage</NavLink>
    </div>
  );
}

export default Playground;
