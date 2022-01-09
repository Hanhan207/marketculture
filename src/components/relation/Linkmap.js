import React, { useEffect, useState, useRef } from "react";
import opicon from "../../img/op.png";
import {
  Select,
  Button,
  Switch,
  Divider,
  message,
  Card,
  Image,
  Tabs,
} from "antd";
import "../../App.css";

import man from "../../api/mandata";

import { getManPlace as IgetManPlace } from "../../api/Ineo4j";

const AMap = window.AMap;
const { Option } = Select;

function LinkMap() {
  const beijing = [116.397428, 39.90923];
  const [mymap, setMap] = useState(null);
  const [person, setPerson] = useState("鲁迅");
  const refmap = useRef(null);
  const [mylayer, setLayer] = useState(null);
  const [markers, setmarkers] = useState([]);
  const [markLayer, setmarkLayer] = useState(null);
  const [avatarLayer, setavatarLayer] = useState(null);

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
    var markerLayer = new AMap.LabelsLayer({
      zooms: [3, 20],
      zIndex: 1000,
      // 开启标注避让，默认为开启，v1.4.15 新增属性
      collision: true,
      // 开启标注淡入动画，默认为开启，v1.4.15 新增属性
      animation: true,
    });
    setmarkLayer(markerLayer);
    setavatarLayer(new AMap.Object3DLayer());
    setLayer(new AMap.Object3DLayer());
    setMap(map);
  }, []);

  //设置标记
  function setMarker(data) {
    for (var i = 0; i < data.length; i++) {
      var curData = toLabel(data[i].end);
      var labelMarker = new AMap.LabelMarker(curData);
      markers.push(labelMarker);
      markLayer.add(labelMarker);
    }
    mymap.add(markLayer);
  }

  //地标数据转Label
  function toLabel(data) {
    var type = data.labels[0];
    return {
      name: data.properties[`${type}_name`],
      position: [data.properties.long, data.properties.lat],
      zooms: [10, 20],
      opacity: 1,
      zIndex: 10,
      icon: {
        type: "image",
        // image:{opicon},
        image: "https://a.amap.com/jsapi_demos/static/images/poi-marker.png",
        clipOrigin: [14, 92],
        clipSize: [50, 68],
        size: [25, 34],
        anchor: "bottom-center",
        angel: 0,
        retina: true,
      },
      text: {
        content: data.properties[`${type}_name`],
        direction: "left",
        offset: [0, -5],
        style: {
          fontSize: 15,
          fontWeight: "normal",
          fillColor: "#333",
          strokeColor: "#fff",
          strokeWidth: 2,
        },
      },
    };
  }

  //选人框
  function handleChange(value) {
    console.log("mylayer", mylayer);
    console.log("markerLayer", markLayer);
    markLayer.Yf = [];
    markLayer.lb = [];
    mylayer.objects = [];
    mylayer.Yd = [];
    setPerson(value);
    setPlace("ht");
    setPlace("db");
    setPlace("op");
    setPlace("thb");
  }

  //拉数据
  function setPlace(type) {
    if (person) {
      IgetManPlace(person, type).then((res) => {
        console.log("res", res);
        if (res.length === 0) {
        } else {
          draw(res, mymap, type);
          setMarker(res);
        }
      });
    }
  }

  //绘制人物头像

  function avatar(name, map) {
    mymap.add(avatarLayer);
    var point3D = new AMap.Object3D.Points();
    point3D.transparent = true;
    point3D.borderColor = [0.6, 0.8, 1, 1];
    point3D.borderWeight = 3;
    var geometry = point3D.geometry;
    var center = LnglatToG20(beijing);
    geometry.vertices.push(center.x, center.y, -55000);
    geometry.pointSizes.push(80);
    point3D.textures.push("https://hanhan.run/mc_img/lx256.png");
    // point3D.textures.push('https://picsum.photos/256')
    // point3D.textures.push('https://a.amap.com/jsapi_demos/static/demo-center/3d_texture_cctv_256.png')

    geometry.pointAreas.push(0, 0, 1, 1);
    // 每两个元素描述一个顶点的纹理坐标信息，纹理坐标以图片左上角为原点。分别是左上角和右下角。
    geometry.vertexUVs.push(0, 0, 1, 1);
    avatarLayer.add(point3D);
  }

  //坐标转换
  function LnglatToG20(lnglat) {
    lnglat = mymap.lngLatToGeodeticCoord(lnglat);
    lnglat.x = AMap.Util.format(lnglat.x, 3);
    lnglat.y = AMap.Util.format(lnglat.y, 3);
    return lnglat;
  }

  //遍历、绘制3D线
  function draw(Idata, map, type) {
    // var object3Dlayer = new AMap.Object3DLayer();
    map.add(mylayer);
    let center = [
      Idata[0].end.properties.long * 1,
      Idata[0].end.properties.lat * 1,
    ];

    for (let i = 0; i < Idata.length; i++) {
      let Mlng = Idata[i].end.properties.long * 1;
      let Mlat = Idata[i].end.properties.lat * 1;
      let path = computeBezier(beijing, Mlng, Mlat, 180);
      // mypath.push(path)
      mylayer.add(drawLines(path, 50000, getcolor(type)));
    }
    // console.log('mypath',mypath)
    // object3Dlayer.add(drawLines(mypath,50000, "rgba(185, 63, 57, 1)"));
  }

  //画线
  function drawLines(path, maxHeight, color) {
    const meshLine = new AMap.Object3D.MeshLine({
      // path: computeBezier(center, Plng, Plat, 180),
      path: path,
      height: getEllipseHeight(180, maxHeight, 2), //计算高度 maxHeight可自定义
      color: color, //线条颜色
      width: 4, //线条宽度
    });
    meshLine.transparent = true;
    meshLine["backOrFront"] = "both";
    return meshLine;
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

  return (
    <div>
      <Select
        defaultValue="鲁迅"
        style={{ width: 200 }}
        onChange={handleChange}
      >
        {man.map((person) => (
          <Option key={person.n.identity} value={person.n.properties.name}>
            {person.n.properties.name}
          </Option>
        ))}
      </Select>
      <button onClick={() => avatar()}>set</button>
      <div id="mapBox" ref={refmap}></div>
    </div>
  );
}

export default LinkMap;
