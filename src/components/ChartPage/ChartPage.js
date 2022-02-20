import React, { useEffect, useState } from "react";
import "./charts.css";
import { P, Pie } from "@antv/g2plot";
import {
  getInfo as IgetInfo,
  getMan as IgetPerson,
  getManSomePlace as IgetManSomePlace,
} from "../../api/Ineo4j";

import CardContent from "./ChartCard";

import { Steps, Button, message, Input } from "antd";
import { Checkbox, Row, Col, Card, List } from "antd";

const { Step } = Steps;
const { TextArea } = Input;
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

var mychecklist = [];

var posterInsight = "";
var posterImg = "";

function setContent(e) {
  switch (e) {
    case 0:
      return <StepOne />;
      break;
    case 1:
      return <StepTwo />;
      break;
    case 2:
      return <StepThree />;
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
      type: "man",
      checked: false,
      src: require(`../../img/man.png`).default,
    },
    {
      title: "地标",
      type: "db",
      checked: false,
      src: require(`../../img/park.jpg`).default,
    },
    {
      title: "戏院",
      type: "op",
      checked: false,
      src: require(`../../img/opera.jpg`).default,
    },
    {
      title: "胡同",
      type: "ht",
      checked: false,
      src: require(`../../img/hutong.jpg`).default,
    },
    {
      title: "老字号",
      type: "thb",
      checked: false,
      src: require(`../../img/thb.jpg`).default,
    },
  ]);

  function onChange(index) {
    let data = [...checklist];
    data[index].checked = !data[index].checked;
    mychecklist = data;
    setchecklist(data);
  }

  return (
    <List
      className="ChartList"
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 5,
        lg: 5,
        xl: 6,
        xxl: 5,
      }}
      dataSource={checklist}
      renderItem={(item, index) => (
        <List.Item>
          <Card
            hoverable="true"
            bordered={item.checked}
            key={index}
            // className={item.checked ? "check" : "uncheck"}
            title={item.title}
            onClick={(e) => onChange(index)}
          >
            <img
              style={{
                // width: "100%",
                height: "30vh",
                width: "30vh",
                objectFit: "cover",
                filter: item.checked ? "grayscale(0%)" : "grayscale(100%)",
                transition: "all .6s ease-in",
              }}
              alt="card"
              src={item.src}
            />
          </Card>
        </List.Item>
      )}
    />
  );
}

//选图表、写洞察
function StepTwo() {
  var chartdata = [];
  const [insight, setInsight] = useState("");
  const [img, setimg] = useState("");
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
          title: "剧院年份图",
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
          title: "老字号数值图",
          data: Infos[i].data,
        });
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
      case "ManTothb":
        chartdata.push({
          title: "人物-老字号关系图",
          data: Infos[i].data,
        });
        break;
      case "ManToop":
        chartdata.push({
          title: "人物-剧院关系图",
          data: Infos[i].data,
        });
        break;
      case "ManToht":
        chartdata.push({
          title: "人物-胡同关系图",
          data: Infos[i].data,
        });
        break;
      default:
        break;
    }
  }

  const onChange = (e) => {
    // setInsight(e.target.value);
    posterInsight = e.target.value;
  };

  function getImg(e) {
    // console.log("ChartPage:", e);
    posterImg = e;
  }
  return (
    <div className="chartList-container">
      <div className="insight-container">
        <h3 style={{ textAlign: "left" }}>记录洞察：</h3>
        <TextArea
          className="insight-text"
          showCount
          maxLenght={100}
          onChange={onChange}
        />
      </div>
      <div className="card-container">
        {chartdata.map((item, index) => (
          <div className="card-chart">
            <h2>{item.title}</h2>
            <CardContent
              getImg={getImg}
              data={item.data}
              index={index}
              type={item.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

//设置海报
function StepThree() {
  return (
    <div className="poster-container">
      <img className="poster-img-container" src={posterImg} alt="" />
      <h4 className="poster-insight-container">{posterInsight}</h4>
      {/* {posterImg === "" ? <img src={posterImg} alt="" /> : <P>请先选择图片</P>} */}
    </div>
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
    if (mychecklist.length) {
      for (var i = 0; i < mychecklist.length; i++) {
        if (mychecklist[i].checked) {
          await IgetInfo(mychecklist[i].type).then((res) => {
            Infos.push({
              title: mychecklist[i].type,
              data: res,
            });
          });
        }
      }
      if (mychecklist[0].checked) {
        for (var i = 1; i < mychecklist.length; i++) {
          if (mychecklist[i].checked && mychecklist[i].type != "db") {
            await IgetManSomePlace(mychecklist[i].type).then((res) => {
              Infos.push({
                title: "ManTo" + mychecklist[i].type,
                data: res,
              });
            });
          }
        }
      }
      setcurrent(1);
    } else {
      message.warning("请先选择数据源");
    }
  }

  function backToOne() {
    Infos = [];
    // checked = [];
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
