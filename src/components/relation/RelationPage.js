import React, { useEffect, useState } from "react";

import { Button, Switch, Divider, message, Card, Image, Tabs } from "antd";

import {
  getManLhb as IgetRelation,
  getPerson as IgetPerson,
} from "../../api/Ineo4j";

import LinkMap from "./Linkmap";
import Arcmap from "./Arcmap";
import AllRelation from "./AllReation";

const { TabPane } = Tabs;

function RealtionPage() {
  const [content, setContent] = useState("Is NOT funny");
  const [personData, setPersonData] = useState({ nodes: [], edges: [] });

  useEffect(() => {
    if(personData.nodes.length === 0){
      getPerson()
    }
    
  }, [personData])

  function callback(key) {
    console.log(key);
  }


  function getPerson() {
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
        <div style={{ marginTop: 30 }}>
          {personData.nodes.length > 0 && <Arcmap data={personData} />}
          {/* <Arcmap data={personData} /> */}
        </div>
      </TabPane>
      <TabPane tab="人地关系" key="2">
      <LinkMap  />
      </TabPane>
      <TabPane tab="综合分析" key="3">
        <AllRelation/>
      </TabPane>
    </Tabs>
  );
}

export default RealtionPage;
