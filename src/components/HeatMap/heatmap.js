import React, { useEffect, useState } from "react";
import {
  Amap,
  useAmapComponent,
  config as AmapReactConfig,
  ControlBar,
  Scale,
} from "@amap/amap-react";

AmapReactConfig.key = "6362a535992f9fd43430a7027fa33db2";

function MyHeatmap(props) {
  const heatmap = useAmapComponent(
    (AMap, map) => {
      // 初始化热力图
      const heatmap = new AMap.HeatMap(map, {
        "3d": {
          heightBezier: [0.4, 0.2, 0.4, 0.8],
          heightScale: 1,
        },
        opacity: [0, 0.8],
      });
      return heatmap;
    },
    ["AMap.HeatMap"] // 自动加载AMap.HeatMap插件
  );
  const { data, max } = props;

  useEffect(() => {
    if (!heatmap) return;
    heatmap.setDataSet({
      data,
      max,
    });
  }, [heatmap, data, max]);

  return null; // 只需要图层，不需要输出 dom
}

function HeatMap(input) {
  const [center] = useState([116.418261, 39.921984]);
  const mapStyle = "amap://styles/2c24c72703450fe5ca6b35b188ec69c1";
  //   const [data, setData] = useState([]);
  //   useEffect(() => {
  //     loadData().then((data) => {
  //       setData(data);
  //       console.log("heat", data);
  //     });
  //   }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Amap
        zoom={12}
        center={center}
        viewMode="3D"
        mapStyle={mapStyle}
        pitch="35"
      >
        <ControlBar offset={[30, 10]} position="RT" />
        <Scale position="RB" />
        <MyHeatmap data={input.data} max={0.8} />
      </Amap>
    </div>
  );
}

function loadData() {
  return new Promise((resolve) => {
    const tag = document.createElement("script");
    tag.onload = () => {
      resolve(window.heatmapData);
    };
    tag.src = "https://a.amap.com/jsapi_demos/static/resource/heatmapData.js";
    document.head.appendChild(tag);
  });
}

export default HeatMap;
