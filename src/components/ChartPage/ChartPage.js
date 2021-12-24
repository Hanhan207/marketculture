import React, { useEffect, useState } from "react";
import "./charts.css";
import { Pie } from "@antv/g2plot";
import { getInfo as IgetInfo, getMan as IgetPerson } from "../../api/Ineo4j";

import CardContent from "./ChartCard";

import { Steps, Button, message } from "antd";
import { Checkbox, Row, Col, Card, List } from "antd";

const { Step } = Steps;
const steps = [
  {
    title: "选择数据源",
    content: "{<StepOne>}",
  },
  {
    title: "查看图表",
    content: "Second-content",
  },
  {
    title: "生成海报",
    content: "Last-content",
  },
];

const mockCharts = [
  {
    title: "胡同",
    type: "热力图",
    content: "hello",
  },
  {
    title: "胡同",
    type: "热力图",
    content: "hello",
  },
  {
    title: "胡同",
    type: "热力图",
    content: "hello",
  },
  {
    title: "胡同",
    type: "热力图",
    content: "hello",
  },
  {
    title: "胡同",
    type: "热力图",
    content: "hello",
  },
];

var checked = [];
var Infos = [];

function setContent(e) {
  switch (e) {
    case 0:
      return <StepOne />;
      break;
    case 1:
      return <StepTwo />;
      break;
    case 2:
      return "2";
      break;
    default:
      return "3";
      break;
  }
}

function StepOne() {
  const [checklist, setchecklist] = useState([
    {
      title: "人物",
      checked: false,
    },
    {
      title: "地标",
      checked: false,
    },
    {
      title: "戏院",
      checked: false,
    },
    {
      title: "胡同",
      checked: false,
    },
    {
      title: "老字号",
      checked: false,
    },
  ]);

  function onChange(index) {
    console.log(index);
    checklist[index].checked = !checklist[index].checked;
    console.log(checklist);
  }

  return (
    // <div>
    //   {checklist.map((item,index)=>
    //   <div   key={index}>
    //     <h1> <pre>{JSON.stringify(item.checked, null, 2)}</pre></h1>
    //      <Card
    //    bordered={item.checked}
    //     //  className={item.checked ? "check" : "uncheck"}
    //      title={item.title}
    //      onClick={(e)=>onChange(index)}
    //    >
    //      <pre>{JSON.stringify(item.checked, null, 2)}</pre>
    //    </Card>
    //   </div>

    //   )}
    // </div>
    <List
      className="ChartList"
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      dataSource={checklist}
      renderItem={(item, index) => (
        <List.Item>
          <Card
            hoverable="true"
            bordered={item.checked}
            key={index}
            className={item.checked ? "check" : "uncheck"}
            title={item.title}
            onClick={(e) => onChange(index)}
          >
             <pre>{JSON.stringify(item.checked, null, 2)}</pre>
          </Card>
        </List.Item>
      )}
    />
  );
}

function StepTwo() {
  var chartdata = [];
  for (var i = 0; i < Infos.length; i++) {
    switch (Infos[i].title) {
      case "man":
        chartdata.push({
          title: "人物关系图",
          data: Infos[i].data,
        });
        break;
      case "op":
        chartdata.push({
          title: "剧院分布图",
          data: Infos[i].data,
        });
        break;
      case "ht":
        chartdata.push({
          title: "胡同分布图",
          data: Infos[i].data,
        });
        break;
      case "thb":
        chartdata.push({
          title: "老字号分布图",
          data: Infos[i].data,
        });
        break;
      case "db":
        chartdata.push({
          title: "地标类型",
          data: Infos[i].data,
        });
        break;
      default:
        break;
    }
  }
  return (
    <List
      className="ChartList"
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      dataSource={chartdata}
      renderItem={(item, index) => (
        <List.Item>
          <Card title={item.title}>
            <CardContent data={item.data} index={index} type={item.title} />
          </Card>
        </List.Item>
      )}
    />
  );
}

function ChartPage() {
  const [current, setcurrent] = useState(0);
  const next = () => {
    setcurrent(current + 1);
  };
  const prev = () => {
    setcurrent(current - 1);
  };

  async function getData() {
    if (checked.length) {
      for (var i = 0; i < checked.length; i++) {
        if (checked[i] === "man") {
          await IgetPerson().then((res) => {
            Infos.push({
              title: "man",
              data: res,
            });
          });
        } else {
          await IgetInfo(checked[i]).then((res) => {
            Infos.push({
              title: res.type,
              data: res,
            });
          });
        }
      }
      setcurrent(1);
    } else {
      message.warning("请先选择数据源");
    }
  }

  function backToOne() {
    Infos = [];
    checked = [];
    setcurrent(0);
  }

  return (
    <>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{setContent(current)}</div>
      <div className="steps-action">
        {current === 1 && (
          <Button style={{ margin: "0 8px" }} onClick={() => backToOne()}>
            上一步
          </Button>
        )}
        {current === 2 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            上一步
          </Button>
        )}
        {current === 0 && (
          <Button type="primary" onClick={() => getData()}>
            下一步
          </Button>
        )}
        {current === 1 && (
          <Button type="primary" onClick={() => next()}>
            下一步
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            保存图片
          </Button>
        )}
      </div>
    </>
  );
}

export default ChartPage;
