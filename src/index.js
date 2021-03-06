import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import MyHeatMap from "./components/HeatMap/heatmap";
import RelationPage from "./components/relation/RelationPage";
import Playground from "./components/playground/Playgroud";
import SpaceMap from "./components/SpaceMap";
import ChartPage from "./components/ChartPage/ChartPage";
import Contact from "./components/Contact";
import FiberEl from "./components/FiberEl/FiberEl";
import Pappers from "./components/pappers";

//antd 组件库
import { Button, Divider, message, Card, Image, Tabs } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  WhatsAppOutlined,
  BookOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

import logo from "./img/logo.png";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

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
            <Link
              to="/"
              style={{ width: "180", textAlign: "center", fontSize: "16px" }}
            >
              市井文化可视分析系统
            </Link>
          )}
        </div>

        <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
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
            {/* <Menu.Item key="5" onClick={() => setContent(5)}>
             中心性分析
            </Menu.Item> */}
          </SubMenu>
          <Menu.Item
            key="4"
            icon={<BarChartOutlined />}
            onClick={() => setContent(4)}
          >
            数据统计
          </Menu.Item>
          <Menu.Item
            key="6"
            icon={<BookOutlined />}
            onClick={() => setContent(6)}
          >
            相关文献
          </Menu.Item>
          {/* <SubMenu key="sub2" icon={<BookOutlined />} title="相关文献">
            <Menu.Item key="6" onClick={() => setContent(6)}>
              古都文化
            </Menu.Item>
            <Menu.Item key="7" onClick={() => setContent(7)}>
              可视分析
            </Menu.Item>
          </SubMenu> */}
          <Menu.Item
            key="8"
            icon={<WhatsAppOutlined />}
            onClick={() => setContent(8)}
          >
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
              {/* <MainApp></MainApp> */}
              <SpaceMap />
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
        {content === 4 && (
          <Content style={{ margin: "0 16px" }}>
            {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>数据统计</Breadcrumb.Item>
          </Breadcrumb> */}
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <ChartPage />
            </div>
          </Content>
        )}
        {content === 6 && (
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {/* <Contact /> */}
              <Pappers />
            </div>
          </Content>
        )}

        {content === 8 && (
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Contact />
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

ReactDOM.render(
  // <Playground />,
  // <FiberEl />,
  <Router>
    {/* <p>版本：V1.1 无安全策略，修改字体链接</p>
    <Link to="home">to home</Link>
    <Link to="/">to SiderLayout</Link> */}
    <Routes>
      <Route path="/system" element={<SiderLayout />} />
      <Route path="/" element={<Playground />} />
    </Routes>
  </Router>,
  document.querySelector("#root")
);
