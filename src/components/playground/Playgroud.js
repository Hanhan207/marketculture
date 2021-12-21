import React, { useEffect, useState, useRef } from "react";
import { Select, Switch, message } from "antd";
import man from "../../api/mandata";
import map from "../../api/initMap"

import { BrowserRouter as Router, NavLink } from "react-router-dom";

import {
  getManLhb as IgetManLhb,
  getManHt as IgetManHt,
  getManPlace as IgetManPlace,
} from "../../api/Ineo4j";

import { Parallax } from "rc-scroll-anim";
import ScrollAnim from "rc-scroll-anim";
// import { QueueAnim } from "rc-queue-anim";
// import { TweenOne } from "rc-tween-one";
// import Animate from "rc-animate";

const { Option } = Select;
const ScrollOverPack = ScrollAnim.OverPack;

const AMap = window.AMap;

function Playground() {
  const [mymap, setMap] = useState(null);
  const [person, setPerson] = useState("鲁迅");
  const refmap = useRef(null);
  const [mylayer, setLayer] = useState(null);

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
    //添加物体
    // 以不规则棱柱体 Prism 为例，添加至 3DObjectLayer 图层中
    
  }, []);

  

  //选人
  function handleChange(value) {
    console.log('mylayer',mylayer)
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
        // console.log('res',res)
        if (res.length === 0) {
        } else {
          draw(res, mymap, type);
        }
      });
    }
  }

  //遍历、绘制
  function draw(Idata, map, type) {
    // var object3Dlayer = new AMap.Object3DLayer();
    map.add(mylayer);
    let center = [
      Idata[0].end.properties.long * 1,
      Idata[0].end.properties.lat * 1,
    ];
    let beijing =[116.397428,39.90923]
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
      <h1>北京市井文化</h1>
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
      {/* <Switch
        checkedChildren="居住空间"
        unCheckedChildren="居住空间"
        onChange={onChange}
        onClick={(e) => setPlace(e, "ht")}
      />
      <Switch
        checkedChildren="商业空间"
        unCheckedChildren="商业空间"
        onChange={onChange}
        onClick={(e) => setPlace(e, "thb")}
      />
      <Switch
        checkedChildren="娱乐空间"
        unCheckedChildren="娱乐空间"
        onChange={onChange}
        onClick={(e) => setPlace(e, "op")}
      />
      <Switch
        checkedChildren="活动空间"
        unCheckedChildren="活动空间"
        onChange={onChange}
        onClick={(e) => setPlace(e, "db")}
      /> */}

      <div
        id="mapBox"
        ref={refmap}
        style={{ height: 600, width: "100%" }}
      ></div>
      <NavLink to="/">To LandPage</NavLink>
    </div>
  );
}

export default Playground;
