import React, { useEffect, useState } from "react";
import { Button, Switch, Divider, message, Card, Image, Tabs } from "antd";

import AMapLoader from "@amap/amap-jsapi-loader";
import { Amap } from "@amap/amap-react";

import {
  getManLhb as IgetManLhb,
  getManHt as IgetManHt,
} from "../../api/Ineo4j";

const personlocation = [
  {
      "person": "茅盾",
      "location": [116.31,39.97]
  },
  {
      "person": "沈从文",
      "location": [116.31,39.93]
  },
  {
      "person": "郁达夫",
      "location": [116.31,39.89]
  },
  {
      "person": "巴金",
      "location": [116.31,39.85]
  },
  {
      "person": "郭沫若",
      "location": [116.36,39.97]
  },
  {
      "person": "老舍",
      "location": [116.36,39.93]
  },
  {
      "person": "胡适",
      "location": [116.36,39.89]
  },
  {
      "person": "鲁迅",
      "location": [116.36,39.85]
  },
  {
      "person": "梁实秋",
      "location": [116.41,39.97]
  },
  {
      "person": "胡絜青",
      "location":[116.41,39.93]
  },
  {
      "person": "启功",
      "location": [116.41,39.89]
  },
  {
      "person": "梅兰芳",
      "location": [116.41,39.85]
  },
  {
      "person": "齐白石",
      "location": [116.46,39.97]
  },
  {
      "person": "蒲杰",
      "location": [116.46,39.93]
  },
  {
      "person": "张大千",
      "location": [116.46,39.89]
  },
  {
      "person": "马连良",
      "location": [116.46,39.85]
  },
  {
      "person": "尚小云",
      "location": [116.46,39.81]
  }
]

function LinkMap(Idata) {
  const [thbdata, setthbdata] = useState([]);
  const [mymap, setmap] = useState();

  function getLhb() {
    console.log("I Clicked!");
    IgetManLhb().then((res) => {
      console.log("res", res);
      if (res.length === 0) {
        message.error("无搜索结果，请尝试其他关键字");
      } else {
        // setContent(res);
        console.log("thbData", res);
        setthbdata(res);
      }
    });
  }

  AMapLoader.load({
    key: "6362a535992f9fd43430a7027fa33db2", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.ControlBar"],
  })
    .then((AMap) => {
      var map = new AMap.Map("map", {
        center: [116.397428, 39.90923],
        zoom: 12,
        viewMode: "3D", // 地图设置成 3D 模式，否则图层会失去高度信息
        scrollWheel: true,
        mapStyle: "amap://styles/2c24c72703450fe5ca6b35b188ec69c1",
      });

      map.addControl(
        new AMap.ControlBar({
          showZoomBar: false,
          showControlButton: true,
          position: {
            right: "30px",
            top: "30px",
          },
        })
      );
      var object3Dlayer = new AMap.Object3DLayer();
      map.add(object3Dlayer);

      //画线 以鲁迅为例
      const center = { lng: 116.397428, lat: 39.90923 }; //起点
      if (Idata.data.length) {
        for (let i = 0; i < Idata.data.length; i++) {
          let name = Idata.data[i].start.properties.name;
          let type = Idata.data[i].end.labels[0];

          let Mlng = Idata.data[i].end.properties.long * 1;
          let Mlat = Idata.data[i].end.properties.lat * 1;

          object3Dlayer.add(
            drawLines(getcenter(name), Mlng, Mlat, 50000, getcolor(type))
          );
        }
      }
      //画线
      function drawLines(center, Plng, Plat, maxHeight, color) {
        const meshLine = new AMap.Object3D.MeshLine({
          path: computeBezier(center, Plng, Plat, 180),
          height: getEllipseHeight(180, maxHeight, 2), //计算高度 maxHeight可自定义
          color: color, //线条颜色
          width: 2, //线条宽度
        });
        meshLine.transparent = true;
        meshLine["backOrFront"] = "both";
        return meshLine;
      }
      //计算中心点
      function getcenter(name) {
        let obj = personlocation.find(o=>o.person === name)
        console.log('obj',obj)
        
        return obj.location;
      }
      //计算颜色
      function getcolor(type) {
        let color = "rgba(55,129,240, 1)";
        switch (type) {
          case "thb":
            color = "rgba(185, 63, 57, 1)";
            break;
          case "ht":
            color = "rgba(72, 83, 159, 1)";
            break;
          case "db":
            color = "rgba(110, 218, 83, 1)";
            break;
          case "op":
            color = "rgba(231, 202, 94, 1)";
            break;
          default:
            color = "rgba(55,129,240, 1)";
        }
        return color;
      }
      //计算曲线
      function computeBezier(center, Plng, Plat, numberOfPoints) {
        let dt;
        let i;
        const curve = [];
        dt = 1.0 / (numberOfPoints - 1);
        for (i = 0; i < numberOfPoints; i++) {
          curve[i] = pointOnCubicBezier(center, Plng, Plat, i * dt); //计算曲线
        }
        return curve;
      }
      //计算高度
      function getEllipseHeight(count, maxHeight, minHeight) {
        const height = [];
        const radionUnit = Math.PI / count;

        for (let i = 0; i < count; i++) {
          const radion = (i * radionUnit) / 2;
          // height.push(minHeight + Math.sin(radion) * maxHeight);
          height.push(minHeight + Math.cos(radion) * maxHeight);
        }
        return height;
      }
      //坐标转换
      function pointOnCubicBezier(center, Plng, Plat, t) {
        let cx;
        let cy;
        cx = Plng - center[0];
        cy = Plat - center[1];
        const lng = cx * t + center[0];
        const lat = cy * t + center[1];
        return new AMap.LngLat(lng, lat);
      }
    })
    .catch((e) => {
      console.log(e);
    });

  return (
    <div>
      <button onClick={getLhb}>老字号数据</button>
      <div id="map" style={{ height: 600, width: "100%" }}></div>
    </div>
  );
}

export default LinkMap;
