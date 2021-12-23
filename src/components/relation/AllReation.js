import { React, useState, useEffect } from "react";
import Graphin, { Behaviors, Utils } from "@antv/graphin";
import { Statistic as NewStat } from "@antv/graphin-components";
import { Row, Col, Card } from "antd";
import { getAll as IgetAll } from "../../api/Ineo4j";

const { DragCanvas, ZoomCanvas, DragNode, ActivateRelations } = Behaviors;
const colors = {
  blue: "rgba(72, 83, 159, 1)",
  red: "rgba(185, 63, 57, 1)",
  yellow: "rgba(231, 202, 94, 1)",
  green: "rgba(110, 218, 83, 1)",
  per: "rgba(218, 83, 180, 1)",
};
function AllRelation() {
  const [alldata, setAlldata] = useState([]);

  useEffect(() => {
    IgetAll().then((res) => {
      if (res.length === 0) {
      } else {
        console.log(res.edges);
        setAlldata({ nodes: setnodes(res.nodes), edges: setedges(res.edges) });
      }
    });
  }, []);

  //设置点样式
  function setnodes(nodes) {
    nodes.forEach((node) => {
      let mykeyshape = {
        size: 30,
        fill: colors.per,
        stroke: colors.per,
        lineWidth: 2,
        cursor: "pointer",
      };
      switch (node.labels) {
        case "man":
          mykeyshape.size = 50;
          break;
        case "op":
          mykeyshape.fill = colors.yellow;
          mykeyshape.stroke = colors.yellow;
          break;
        case "thb":
          mykeyshape.fill = colors.blue;
          mykeyshape.stroke = colors.blue;
          break;
        case "db":
          mykeyshape.fill = colors.red;
          mykeyshape.stroke = colors.red;
          break;
        case "ht":
          mykeyshape.fill = colors.green;
          mykeyshape.stroke = colors.green;
          break;
        default:
          break;
      }
      node.style = {
        // 节点的主要形状，即圆形容器，可以在这里设置节点的大小，border，填充色
        keyshape: mykeyshape,
        label: {
        //   value: node.labels,
        value:node.labels === 'man'? node.properties.name:node.properties[`${node.labels}_name`]
        },
      };
    });
    console.log(nodes);
    return nodes;
  }

  //设置边样式
  function setedges(edges) {
    edges.forEach((edge) => {
      edge.style = {
        label: {
          value: edge.properties.relation,
        },
      };
    });
    return edges;
  }
  return (
    <div id="mapBox">
      <Graphin data={alldata} layout={{ type: "gForce" }}>
        <ActivateRelations />
      </Graphin>
    </div>
    //     <Row gutter={16}>
    //     {/* <Col span={12}>
    //       <Card title="关系数据" bodyStyle={{ height: '554px', overflow: 'scroll' }}>
    //         <pre>{JSON.stringify(alldata, null, 2)}</pre>
    //       </Card>
    //     </Col> */}
    //     <Col span={18}>
    //       <Card title="可视化结果">
    //       </Card>
    //     </Col>
    //   </Row>
  );
}

export default AllRelation;
