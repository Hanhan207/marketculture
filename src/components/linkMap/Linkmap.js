import React, { useEffect, useState } from "react";
import { Button, Switch, Divider, message, Card, Image, Tabs } from "antd";

import AMapLoader from "@amap/amap-jsapi-loader";

function toGeoJson(data) {
  var geo = [];
  data.forEach((e) => {
    let node = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [
          [e.end.properties.long * 1, e.end.properties.lat * 1],
          [116.397428, 39.90923],
        ],
      },
    };
    geo.push(node);
  });
  console.log("geo", geo);
  return geo;
}

function LinkMap(Idata) {
  AMapLoader.load({
    key: "6362a535992f9fd43430a7027fa33db2", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.ControlBar"],
    Loca: {
      // 是否加载 Loca， 缺省不加载
      version: "2.0.0", // Loca 版本，缺省 1.3.2
    },
  })
    .then((AMap) => {
      console.log("Amap", AMap);
      var map = new AMap.Map("map", {
        center: [116.397428, 39.90923],
        zoom: 12,
        viewMode: "3D", // 地图设置成 3D 模式，否则图层会失去高度信息
        mapStyle: "amap://styles/831ba866573db55fa614ca598e94cc4b",
      });

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

      // 创建 Loca 实例
      var loca = new Loca.Container({
        map: map,
      });

      var linkData = new Loca.GeoJSONSource({
        // data: toGeoJson(Idata.data),
        data: {
          type: "FeatureCollection",
          features: toGeoJson(Idata.data),
        },
      });

      var linkLayer = new Loca.PulseLinkLayer({
        // loca: loca,
        zooms: [2, 20],
        zIndex: 10,
        visible: true,
        opacity: 1,
      });

      linkLayer.setSource(linkData);

      linkLayer.setStyle({
        lineWidth: function () {
          return [4, 2];
        },

        lineColors: function (index, item) {
          return item.link.properties.type === 0
            ? ["#25CDEA", "#12BFBF"]
            : ["#FFD87B", "#FF4F00"];
        },
        height: function (index, item) {
          return item.distance / 3;
        },
      });

      loca.add(linkLayer);

      // 创建圆点图层
      var pointLayer = new Loca.PointLayer({
        zIndex: 10,
        opacity: 1,
        visible: true,
        blend: "lighter",
      });

      // 创建数据源
      var dataSource = new Loca.GeoJSONSource({
        // url: 'xxx.geojson', 或者使用 data 字段
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: [116.40014, 39.909736],
              },
            },
          ],
        },
      });
      // 图层添加数据
      pointLayer.setSource(dataSource);

      // 设置样式
      pointLayer.setStyle({
        radius: 30,
        color: "red",
        borderWidth: 10,
        borderColor: "#fff",
        unit: "px",
      });

      // 添加到地图上
      // loca.add(pointLayer);
    })
    .catch((e) => {
      console.log(e);
    });

  return <div id="map" style={{ height: 600, width: "100%" }}></div>;
}

export default LinkMap;
