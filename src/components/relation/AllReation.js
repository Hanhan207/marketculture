import { React, useState, useEffect, useContext } from "react";
import Graphin, { Behaviors, Utils, GraphinContext } from "@antv/graphin";
import {
  Statistic as NewStat,
  ContextMenu,
  Tooltip,
  FishEye,
  Legend,
} from "@antv/graphin-components";
import { Row, Col, Card, Switch } from "antd";
import { getAll as IgetAll } from "../../api/Ineo4j";

const { DragCanvas, ZoomCanvas, DragNode, ActivateRelations } = Behaviors;
const { Menu } = ContextMenu;
const colors = {
  blue: "rgba(72, 83, 159, 1)",
  red: "rgba(185, 63, 57, 1)",
  yellow: "rgba(231, 202, 94, 1)",
  green: "rgba(110, 218, 83, 1)",
  per: "rgba(218, 83, 180, 1)",
};
function AllRelation() {
  const [alldata, setAlldata] = useState([]);
  const [fish, setFish] = useState(false);
  const [tip, setTip] = useState(false);

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
          node.legend = "人物";
          mykeyshape.size = 50;
          break;
        case "op":
          node.legend = "剧院";
          mykeyshape.fill = colors.yellow;
          mykeyshape.stroke = colors.yellow;
          break;
        case "thb":
          node.legend = "老字号";
          mykeyshape.fill = colors.blue;
          mykeyshape.stroke = colors.blue;
          break;
        case "db":
          node.legend = "地标";
          mykeyshape.fill = colors.red;
          mykeyshape.stroke = colors.red;
          break;
        case "ht":
          node.legend = "胡同";
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
          value:
            node.labels === "man"
              ? node.properties.name
              : node.properties[`${node.labels}_name`],
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
    <div>
      <Switch
        checkedChildren="开启鱼眼"
        unCheckedChildren="关闭鱼眼"
        onChange={(e) => setFish(e)}
      />
      <Switch
        checkedChildren="显示信息"
        unCheckedChildren="隐藏信息"
        onChange={(e) => setTip(e)}
      />
      <div id="mapBox">
        <Graphin data={alldata} layout={{ type: "gForce" }}>
          <ActivateRelations />
          {tip && (
            <Tooltip bindType="node">
              <CustomTooltip />
            </Tooltip>
          )}
          <FishEye options={{}} visible={fish} />
          <Legend
            bindType="node"
            sortKey="legend"
            colorKey="style.keyshape.stroke"
          >
            <Legend.Node />
          </Legend>
        </Graphin>
      </div>
    </div>
  );
}

const CustomTooltip = () => {
  const { tooltip } = useContext(GraphinContext);
  const context = tooltip.node;
  const { item } = context;
  const model = item && item.getModel();
  return (
    // @ts-ignore
    <div>
      <Card title="节点信息" style={{ width: "400px" }}>
        ID : {model.id}
        {/* <pre>{JSON.stringify(model.properties, null, 2)}</pre> */}
      </Card>
    </div>
  );
};

export default AllRelation;
