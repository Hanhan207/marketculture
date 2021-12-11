import React, { Fragment, useState, useEffect } from "react";
// import reactDom from "react-dom";
import ReactDOM from "react-dom";
import "./App.css";
import HeatMap from "./components/HeatMap/heatmap";
import MyCircleMarker from "./components/cirleMarker/circleMarker";
import RelationPage from "./components/relation/RelationPage";
import Playground from "./components/playground/Playgroud";

//AMap-React 组件库
import { config as AmapReactConfig } from "@amap/amap-react";
import {
  Amap,
  Marker,
  ControlBar,
  InfoWindow,
  Scale,
  Loca,
} from "@amap/amap-react";

//Neo4j 接口
import {
  getSpace as IgetSpace,
  getCenter as IgetCenter,
  getRelation as IgetRelation,
  getHeat as IgetHeat,
  getHeatAll as IgetHeatAll,
} from "./api/Ineo4j.js";

//antd 组件库
import { Button, Switch, Divider, message, Card, Image, Tabs } from "antd";
import { Input, Space } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  CloseOutlined,
  UserOutlined,
  WhatsAppOutlined,
  BookOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

import topLogo from "./img/topLogo.png";
import logo from "./img/logo.png";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const { Search } = Input;

//配置AMap
AmapReactConfig.version = "2.0"; // 默认2.0，这里可以不修改
AmapReactConfig.key = "6362a535992f9fd43430a7027fa33db2";
AmapReactConfig.Loca = "2.0.0";
AmapReactConfig.plugins = [
  "AMap.ToolBar",
  "AMap.MoveAnimation",
  "Loca",
  // 在此配置你需要预加载的插件，如果不配置，在使用到的时候会自动异步加载
];

//布局组件
function SiderLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [content, setContent] = useState(0);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <div
          style={{ height: 50, marginTop: 20, padding: 10, marginBottom: 20 }}
        >
          {collapsed ? (
            <Image width={30} src={logo} style={{ marginLeft: 18 }} />
          ) : (
            <Image width={180} src={topLogo} />
          )}
        </div>

        <Menu theme="light" defaultSelectedKeys={["0"]} mode="inline">
          <Menu.Item
            key="1"
            icon={<PieChartOutlined />}
            onClick={() => setContent(0)}
          >
            地图空间
          </Menu.Item>

          <SubMenu key="sub1" icon={<DesktopOutlined />} title="可视分析">
            <Menu.Item key="2" onClick={() => setContent(2)}>
              聚合分析
            </Menu.Item>
            <Menu.Item key="3" onClick={() => setContent(3)}>
              关联分析
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="4" icon={<BarChartOutlined />}>
            数据统计
          </Menu.Item>
          <SubMenu key="sub2" icon={<BookOutlined />} title="相关文献">
            <Menu.Item key="6">古都文化</Menu.Item>
            <Menu.Item key="8">可视分析</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<WhatsAppOutlined />}>
            联系方式
          </Menu.Item>
        </Menu>
      </Sider>
      {/* 内部布局 */}
      <Layout className="site-layout">
        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        {content === 0 && (
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>市井文化</Breadcrumb.Item>
              <Breadcrumb.Item>地图空间</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <MainApp></MainApp>
            </div>
          </Content>
        )}
        {content === 2 && (
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>可视分析</Breadcrumb.Item>
              <Breadcrumb.Item>聚合分析</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <MyHeatMap />
            </div>
          </Content>
        )}
        {content === 3 && (
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>可视分析</Breadcrumb.Item>
              <Breadcrumb.Item>关联分析</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <RelationPage />
            </div>
          </Content>
        )}

        <Footer style={{ textAlign: "center" }}>
          Visual Analysis System of Market Culture ©2021 Created by Han
        </Footer>
      </Layout>
    </Layout>
  );
}

//地图空间组件
function MainApp() {
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

//标记组件
function MyMarker(data) {
  const [isActive, setIsActive] = useState(true);
  var markerInfo = data;

  return (
    <div>
      <Marker
        position={markerInfo.dot}
        clickable
        onClick={() => setIsActive(true)}
      />
      {isActive && (
        <InfoWindow
          position={markerInfo.dot}
          offset={[0, -30]}
          autoMove
          closeWhenClickMap
          isCustom
          onClose={() => setIsActive(false)}
        >
          <Card
            size="small"
            title={markerInfo.info.thb_name}
            shadow="always"
            extra={<CloseOutlined onClick={() => setIsActive(!isActive)} />}
          >
            <h5>{markerInfo.info.thb_address}</h5>
            {/* <div>{active.position.join(', ')}</div> */}
            <div></div>
          </Card>
        </InfoWindow>
      )}
    </div>
  );
}

//热力图组件
function MyHeatMap() {
  const [heatData, setHeatData] = useState([]);

  function getData(type) {
    switch (type) {
      case "thb":
      case "ht":
      case "op":
      case "db":
        IgetHeat(type).then((res) => {
          console.log("res", res);
          if (res.length !== 0) {
            setHeatData(res);
          }
        });
        break;
      case "all":
        IgetHeatAll().then((res) => {
          console.log("res", res);
          if (res.length !== 0) {
            setHeatData(res);
          }
        });
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <Space>
        {/* <Button onClick={() => getData("all")}>全局热力图</Button> */}
        <Button onClick={() => getData("ht")}>居住空间热力图</Button>
        <Button onClick={() => getData("thb")}>商业空间热力图</Button>
        <Button onClick={() => getData("op")}>娱乐空间热力图</Button>
        <Button onClick={() => getData("db")}>活动空间热力图</Button>
      </Space>
      <div style={{ height: 600, width: "100%" }}>
        {heatData.length > 0 && <HeatMap data={heatData}></HeatMap>}
      </div>
    </div>
  );
}

ReactDOM.render(
  <SiderLayout />,
  // <Playground />,
  document.querySelector("#root")
);
