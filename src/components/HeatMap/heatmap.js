import React, { useEffect, useState } from "react";

//Neo4j 接口
import {
  getHeat as IgetHeat,
  getHeatAll as IgetHeatAll,
} from "../../api/Ineo4j";

import { Button, Space } from "antd";

const AMap = window.AMap;

//热力图组件
function MyHeatMap() {
  const [mymap, setMap] = useState(null);
  const [mylayer, setLayer] = useState({});
  var heatmapOpts = {
    //3d 相关的参数
    "3d": {
      //热度转高度的曲线控制参数，可以利用左侧的控制面板获取
      heightBezier: [0.4, 0.2, 0.4, 0.8],
      //取样精度，值越小，曲面效果越精细，但同时性能消耗越大
      gridSize: 2,
      heightScale: 1,
    },
  };

  useEffect(() => {
    const map = new AMap.Map("mapBox", {
      //启动3D地图
      zoom: 12, //级别
      center: [116.397428, 39.90923], //中心点坐标
      pitch: 50,
      resizeEnable: true,
      rotateEnable: true,
      pitchEnable: true,
      viewMode: "3D", //开启3D视图,默认为关闭
      buildingAnimation: true, //楼块出现是否带动画
      expandZoomRange: true,
      zooms: [3, 20],
      scrollWheel: true,
      mapStyle: "amap://styles/2c24c72703450fe5ca6b35b188ec69c1",
    });
    AMap.plugin(["AMap.ControlBar"], function () {
      // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
      map.addControl(
        new AMap.ControlBar({
          showZoomBar: false,
          showControlButton: true,
          position: {
            right: "10px",
            top: "10px",
          },
        })
      );
    });
    setMap(map);
    var heatmap = new AMap.Heatmap(map, heatmapOpts);
    setLayer(heatmap);
  }, []);

  function setHeatMap(data) {
    mylayer.setDataSet({
      data: data,
      max: 0.8,
    });
  }

  function getData(type) {
    IgetHeat(type).then((res) => {
      if (res.length !== 0) {
        setHeatMap(res);
      }
    });
  }

  function getAllData() {
    var alldata = [];
    IgetHeat("ht").then((res) => {
      if (res.length !== 0) {
        alldata = alldata.concat(res);
      }
    });
    IgetHeat("op").then((res) => {
      if (res.length !== 0) {
        alldata = alldata.concat(res);
      }
    });
    IgetHeat("db").then((res) => {
      if (res.length !== 0) {
        alldata = alldata.concat(res);
      }
    });
    IgetHeat("thb").then((res) => {
      if (res.length !== 0) {
        alldata = alldata.concat(res);
        setHeatMap(alldata);
      }
    });
  }

  return (
    <div>
      <Space>
        <Button onClick={() => getAllData()}>全局热力图</Button>
        <Button onClick={() => getData("ht")}>居住空间热力图</Button>
        <Button onClick={() => getData("thb")}>商业空间热力图</Button>
        <Button onClick={() => getData("op")}>娱乐空间热力图</Button>
        <Button onClick={() => getData("db")}>活动空间热力图</Button>
      </Space>
      <div id="mapBox"></div>
    </div>
  );
}

export default MyHeatMap;
