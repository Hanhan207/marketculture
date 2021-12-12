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

function Playground() {
  AMapLoader.load({
    key: "6362a535992f9fd43430a7027fa33db2", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.ControlBar"],
    // Loca: {
    //   // 是否加载 Loca， 缺省不加载
    //   version: "2.0.0", // Loca 版本，缺省 1.3.2
    // },
  })
    .then((AMap) => {
      console.log("Amap", AMap);
      var map = new AMap.Map("map", {
        center: [116.397428, 39.90923],
        zoom: 8,
        viewMode: "3D", // 地图设置成 3D 模式，否则图层会失去高度信息
        mapStyle: "amap://styles/831ba866573db55fa614ca598e94cc4b",
        pitch: 35,
      });

      map.addControl(
        new AMap.ControlBar({
          showZoomBar: true,
          showControlButton: true,
          position: {
            right: "10px",
            top: "10px",
          },
        })
      );

      map.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.9);
      map.DirectionLight = new AMap.Lights.DirectionLight(
        [0, -1, 1],
        [1, 1, 1],
        0.1
      );
      var object3Dlayer = new AMap.Object3DLayer();
      map.add(object3Dlayer);
      var bounds = [
        new AMap.LngLat(116, 39),
        new AMap.LngLat(117, 39),
        new AMap.LngLat(117, 40),
        new AMap.LngLat(116, 40),
      ];
      var height = 50000;
      var color = "#0088ff"; //rgba
      var prism = new AMap.Object3D.Prism({
        path: bounds,
        height: height,
        color: color,
      });
      object3Dlayer.add(prism); //添加

      const center = { lng: 114.301803, lat: 30.599835 }; //起点
      const points = [
        //终点集合，这些点最终和起点连线
        { lng: 104.075809, lat: 30.651239 },
        { lng: 113.543028, lat: 22.186835 },
        { lng: 106.551643, lat: 29.562849 },
        { lng: 102.710002, lat: 25.045806 },
        { lng: 116.407394, lat: 39.904211 },
        { lng: 112.562678, lat: 37.873499 },
        { lng: 112.983602, lat: 28.112743 },
        { lng: 108.954347, lat: 34.265502 },
        { lng: 121.473662, lat: 31.230372 },
        { lng: 120.152585, lat: 30.266597 },
        { lng: 119.295143, lat: 26.100779 },
        { lng: 106.705463, lat: 26.600055 },
        { lng: 109.194828, lat: 27.755017 },
        { lng: 116.369774, lat: 28.000249 },
        { lng: 106.766385, lat: 31.892508 },
      ];
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const meshLine = new AMap.Object3D.MeshLine({
          path: computeBezier(center, point, 180), //计算曲线
          height: getEllipseHeight(180, 4500000, 20), //计算高度 maxHeight可自定义
          // height: 2000000,
          color: "rgba(55,129,240, 1)", //线条颜色
          width: 10, //线条宽度
        });
        meshLine.transparent = true;
        object3Dlayer.add(meshLine);
        meshLine["backOrFront"] = "both";
      }
      map.add(object3Dlayer);

      function computeBezier(center, point, numberOfPoints) {
        let dt;
        let i;
        const curve = [];
        dt = 1.0 / (numberOfPoints - 1);
        for (i = 0; i < numberOfPoints; i++) {
          curve[i] = pointOnCubicBezier(center, point, i * dt); //计算曲线
        }
        return curve;
      }
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
      function pointOnCubicBezier(center, point, t) {
        let cx;
        let cy;
        cx = point.lng - center.lng;
        cy = point.lat - center.lat;
        const lng = cx * t + center.lng;
        const lat = cy * t + center.lat;
        return new AMap.LngLat(lng, lat);
      }
    })
    .catch((e) => {
      console.log(e);
    });

  return (
    <div>
      <h1>北京市井文化</h1>
      <div id="map" style={{ height: 1200, width: "100%" }}></div>
      <NavLink to="/">To LandPage</NavLink>
    </div>
  );
}

export default Playground;
