import React, { useEffect, useState } from "react";
import "./charts.css";
import { Pie } from '@antv/g2plot';

import { Steps, Button, message } from "antd";
import { Checkbox, Row, Col ,Card,List} from "antd";

const piedata = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: '其他', value: 5 },
];

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
    title:'胡同',
    type:'热力图',
    content : 'hello'
  },
  {
    title:'胡同',
    type:'热力图',
    content : 'hello'
  },
  {
    title:'胡同',
    type:'热力图',
    content : 'hello'
  },
  {
    title:'胡同',
    type:'热力图',
    content : 'hello'
  },
  {
    title:'胡同',
    type:'热力图',
    content : 'hello'
  }
]

function setContent(e) {
  switch (e) {
    case 0:
      return <StepOne />;
      break;
    case 1:
      return <StepTwo/>;
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

function StepTwo(){

  const data = [
    { type: '分类一', value: 27 },
    { type: '分类二', value: 25 },
    { type: '分类三', value: 18 },
    { type: '分类四', value: 15 },
    { type: '分类五', value: 10 },
    { type: '其他', value: 5 },
  ];
  
  // const piePlot = new Pie('pie', {
  //   appendPadding: 10,
  //   data,
  //   angleField: 'value',
  //   colorField: 'type',
  //   radius: 0.9,
  //   label: {
  //     type: 'inner',
  //     offset: '-30%',
  //     content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
  //     style: {
  //       fontSize: 14,
  //       textAlign: 'center',
  //     },
  //   },
  //   interactions: [{ type: 'element-active' }],
  // });
  
  // piePlot.render();

  return(
    <div>
      <div id="pie"></div>
      <List className="ChartList"
    grid={{
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 4,
      lg: 4,
      xl: 6,
      xxl: 3,
    }}
    dataSource={mockCharts}
    renderItem={item => (
      <List.Item>
        <Card title={item.title}></Card>
      </List.Item>
    )}
  />
    </div>
  
  )
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
