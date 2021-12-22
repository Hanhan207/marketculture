import React, { useEffect, useState } from "react";
import "./charts.css";

import { Steps, Button, message } from "antd";
import { Checkbox, Row, Col } from "antd";

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

function setContent(e) {
  switch (e) {
    case 0:
      return <StepOne />;
      break;
    case 1:
      return "1";
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
  function onChange(checkedValues) {
    console.log("checked = ", checkedValues);
  }
  return (
    <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
      <Row>
        <Col span={8}>
          <Checkbox value="A">人物</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="B">胡同</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="C">老字号</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="D">剧院</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="E">地标</Checkbox>
        </Col>
      </Row>
    </Checkbox.Group>
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
  return (
    <>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">
        {setContent(current)}
      </div>
      <div className="steps-action">
      {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            上一步
          </Button>
        )}
        {current < steps.length - 1 && (
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
