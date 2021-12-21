import React, {Fragment, useState } from "react";
import '../App.css'

import MyMarker from "./CirleMarker/MyMarker";
import MyCircleMarker from "./CirleMarker/circleMarker";

//Neo4j 接口
import {
  getSpace as IgetSpace,
  getCenter as IgetCenter,
} from "../api/Ineo4j.js";

//AMap-React 组件库
import { config as AmapReactConfig } from "@amap/amap-react";
import {
  Amap,
  ControlBar,
  Scale,
} from "@amap/amap-react";

//antd 组件库
import { Button,  message, Space,Input} from "antd";
const { Search } = Input;

//配置AMap
AmapReactConfig.version = "2.0"; // 默认2.0，这里可以不修改
AmapReactConfig.key = "6362a535992f9fd43430a7027fa33db2";
AmapReactConfig.plugins = [
  "AMap.ToolBar",
  "AMap.MoveAnimation",
  "Loca",
  // 在此配置你需要预加载的插件，如果不配置，在使用到的时候会自动异步加载
];


//地图空间组件
function SpaceMap() {
  const mapStyle = "amap://styles/2c24c72703450fe5ca6b35b188ec69c1";
  const htColor = "#E7CA5E";
  const thbColor = "#B93F39";
  const opColor = "#48539F";
  const dbColor = "#6EDA53";
  const markOpacity = "0.8";
  const markScale = 40;

  const [markerInfo, setMarkerInfo] = useState([]);
  const [center, setCenter] = useState([116.397428, 39.90923]);
  const [htData, sethtData] = useState([
    {
      ht_id: "1",
      ht_name: "八道湾胡同11号院",
      ht_prop: "周氏兄弟产业",
      lat: "39.944347",
      long: "116.377384",
      value: ".577446",
      value_heat: ".049165",
      value_person: "鲁迅",
      value_quary: "1",
      value_search: "1",
    },
  ]);
  const [thbData, setThbData] = useState([]);
  const [opData, setOpData] = useState([]);
  const [dbData, setDbData] = useState([]);

  const [htShow, setHtShow] = useState(false);
  const [thbShow, setThbShow] = useState(false);
  const [opShow, setOpShow] = useState(false);
  const [dbShow, setDbShow] = useState(false);

  //获取搜索点的信息
  function setSearch(e) {
    IgetCenter(e).then((res) => {
      console.log("res", res);
      if (res.length === 0) {
        message.error("无搜索结果，请尝试其他关键字");
      } else {
        setCenter([res.properties.long, res.properties.lat]);
        setMarkerInfo(res.properties);
      }
    });
  }

  //获取空间信息
  function setSpace(e) {
    console.log("e", e);
    IgetSpace(e).then((res) => {
      console.log("res", res);
      switch (e) {
        case "ht":
          sethtData(res);
          setHtShow(!htShow);
          break;
        case "thb":
          setThbData(res);
          setThbShow(!thbShow);
          break;
        case "op":
          setOpData(res);
          setOpShow(!opShow);
          break;
        case "db":
          setDbData(res);
          setDbShow(!dbShow);
          break;
        default:
          break;
      }
    });
  }

  return (
    <Fragment>
      <Space>
        <Button
          type={htShow ? "primary" : "default"}
          onClick={() => {
            setSpace("ht");
          }}
        >
          居住空间
        </Button>
        <Button
          type={thbShow ? "primary" : "default"}
          onClick={() => {
            setSpace("thb");
          }}
        >
          商业空间
        </Button>
        <Button
          type={opShow ? "primary" : "default"}
          onClick={() => {
            setSpace("op");
          }}
        >
          娱乐空间
        </Button>
        <Button
          type={dbShow ? "primary" : "default"}
          onClick={() => {
            setSpace("db");
          }}
        >
          公共空间
        </Button>
        {/* <Button onClick={IgetRelation}>看看数据</Button> */}
        <Search
          placeholder="输入关键字"
          // onSearch={findPot}
          onSearch={setSearch}
          style={{ width: 200 }}
        />
      </Space>
      <div style={{ width: "100%", height: 600, marginTop: 30 }}>
        <Amap
          viewMode="3D"
          center={center}
          mapStyle={mapStyle}
          zoom="12"
          pitch="35"
        >
          <ControlBar offset={[30, 10]} position="RT" />
          <Scale position="RB" />

          {markerInfo.length !== 0 && (
            <MyMarker dot={center} info={markerInfo}></MyMarker>
          )}

          {htShow &&
            htData.map((ht) => (
              <MyCircleMarker
                key={ht.ht_id}
                data={ht}
                color={htColor}
                type={"ht"}
              />
            ))}

          {thbShow &&
            thbData.map((thb) => (
              <MyCircleMarker
                key={thb.thb_id}
                data={thb}
                color={thbColor}
                type={"thb"}
              />
            ))}

          {opShow &&
            opData.map((op) => (
              <MyCircleMarker
                key={op.op_id}
                data={op}
                color={opColor}
                type={"op"}
              />
            ))}

          {dbShow &&
            dbData.map((db) => (
              <MyCircleMarker
                key={db.db_id}
                data={db}
                color={dbColor}
                type={"db"}
              />
            ))}
        </Amap>
      </div>
    </Fragment>
  );
}

export default SpaceMap;
