import React, { useEffect, useState } from "react";

import { Button, Switch, Divider, message, Card, Image, Tabs } from "antd";

import {
  getManLhb as IgetRelation,
  getPerson as IgetPerson,
} from "../../api/Ineo4j";

import LinkMap from "./Linkmap";
import Arcmap from "./Arcmap";

const { TabPane } = Tabs;

function RealtionPage() {
  const [content, setContent] = useState("Is NOT funny");
  const [linkData, setLinkData] = useState([]);
  const [personData, setPersonData] = useState({ nodes: [], edges: [] });

  function callback(key) {
    console.log(key);
  }

  function getData() {
    console.log("I Clicked!");
    IgetRelation().then((res) => {
      console.log("res", res);
      if (res.length === 0) {
        message.error("无搜索结果，请尝试其他关键字");
      } else {
        // setContent(res);
        console.log("Data", res);
        setLinkData(res);
      }
    });
  }

  function getPerson() {
    console.log("I Clicked!");
    IgetPerson().then((res) => {
      console.log("res", res);
      if (res.length === 0) {
        message.error("无搜索结果，请尝试其他关键字");
      } else {
        console.log("Data", res);
        setPersonData(res);
      }
    });
  }
  return (
    <Tabs onChange={callback} type="card">
      <TabPane tab="人物关系" key="1">
        <Button onClick={getPerson}>人物数据，来！</Button>
        <div style={{ marginTop: 30 }}>
          {personData.nodes.length > 0 && <Arcmap data={personData} />}
          {/* <Arcmap data={personData} /> */}
        </div>
      </TabPane>
      <TabPane tab="人地关系" key="2">
        <Button onClick={getData}>人地数据，来！</Button>
        {/* <h4>{content}</h4> */}
        <div style={{ height: 600, width: "100%", marginTop: 30 }}>
          {linkData.length > 0 && <LinkMap data={linkData} />}
        </div>
      </TabPane>
      <TabPane tab="综合分析" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
}

export default RealtionPage;
