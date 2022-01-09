import { Pie, Column,Scatter } from "@antv/g2plot";
import React, { useEffect, useState } from "react";
import Graphin, { Behaviors, Utils, GraphinContext } from "@antv/graphin";
import {
  Statistic as NewStat,
  ContextMenu,
  Tooltip,
  FishEye,
  Legend,
} from "@antv/graphin-components";
const { DragCanvas, ZoomCanvas, DragNode, ActivateRelations } = Behaviors;

function CardContent(e) {
  var type = e.type;
  var index = e.index;
  var chartdata = e.data;
  useEffect(() => {}, []);

  return (
    <div id="nodeBox">
      {type === "人物关系图" && <NodeMap data={chartdata} index={index}/>}
      {type === "人物-胡同关系图" && <NodeMap data={chartdata} index={index}/>}
      {type === "人物-老字号关系图" && <NodeMap data={chartdata} index={index}/>}
      {type === "人物-剧院关系图" && <NodeMap data={chartdata} index={index}/>}
      {type === "胡同分布图" && <East index={index} />}
      {type === '老字号分布图' && <East index={index}/>}
      {type === "地标类型" && <DbType />}
      {type === "老字号数值图" && <ThbScatter data={chartdata}/>}
      {type === "剧院分布图" && <div>剧院分布图</div>}
      {/* <pre>{JSON.stringify(chartdata, null, 2)}</pre> */}
      {/* */}
    </div>
  );
}

//人物关系图
function NodeMap(e) {
  var data = e.data;
  var index = e.index
  const [node, setnode] = useState([]);
  useEffect(() => {
    setnode({ nodes: setnodes(data.nodes), edges: setedges(data.edges) });
  }, []);

  //设置点样式
  function setnodes(nodes) {
    var themecolor = "rgba(72, 83, 159, 1)";
    console.log(nodes)
    nodes.forEach((node) => {
      let mykeyshape = {
        size: 30,
        fill: themecolor,
        stroke: themecolor,
        lineWidth: 2,
        cursor: "pointer",
      };
      node.style = {
        // 节点的主要形状，即圆形容器，可以在这里设置节点的大小，border，填充色
        keyshape: mykeyshape,
        label: {
          value:node.labels === 'man' ? node.properties.name : node.properties[`${node.labels}_name`],
        },
      };
    });
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
      <Graphin
        data={node}
        style={{width:'480px'}}
        layout={{ type: "gForce" }}
      >
        <ActivateRelations />
      </Graphin>
  );
}
//东西城分布图
function East(e) {
  useEffect(() => {
    const piePlot = new Pie(`pie_${e.index}`, {
      appendPadding: 10,
      data,
      angleField: "value",
      colorField: "type",
      radius: 0.9,
      label: {
        type: "inner",
        offset: "-30%",
        content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        style: {
          fontSize: 14,
          textAlign: "center",
        },
      },
      interactions: [{ type: "element-active" }],
    });
    piePlot.render();
  }, []);

  const data = [
    { type: "分类一", value: 27 },
    { type: "分类二", value: 25 },
    { type: "分类三", value: 18 },
    { type: "分类四", value: 15 },
    { type: "分类五", value: 10 },
    { type: "其他", value: 5 },
  ];

  return <div id={"pie_" + e.index}></div>;
}

//地标类型图
function DbType() {
  const db_data = [
    {
      type: "来往路线型",
      counts: 60,
    },
    {
      type: "象征型",
      counts: 33,
    },
    {
      type: "生活环境型",
      counts: 16,
    },
    {
      type: "店铺型",
      counts: 13,
    },
    {
      type: "满汉交融型",
      counts: 6,
    },
    {
      type: "雅玩习气型",
      counts: 6,
    },
  ];
  useEffect(() => {
    const columnPlot = new Column("db_type", {
      data: db_data,
      xField: "type",
      yField: "counts",
      label: {
        // 可手动配置 label 数据标签位置
        position: "middle", // 'top', 'bottom', 'middle',
        // 配置样式
        style: {
          fill: "#FFFFFF",
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      meta: {
        type: {
          alias: "类别",
        },
        sales: {
          alias: "销售额",
        },
      },
    });

    columnPlot.render();
  }, []);

  return <div id="db_type"></div>;
}

//老字号气泡散点图
function ThbScatter(params) {
  var mydata = params.data.data
  var thbdata= []
  mydata.forEach(item => {
    thbdata.push({
      title:item.properties.thb_name,
      year:parseInt(item.properties.thb_creation_time),
      value:item.properties.value*1,
      type:item.properties.thb_industry,
      shopnumber:item.properties.value_number*1
    })
  });
  useEffect(() => {
    const scatterPlot = new Scatter('thbscatter', {
      data:thbdata,
      xField: 'year',
      yField: 'value',
      colorField: 'type',
      sizeField: 'shopnumber',
      size: [4, 15],
      shape: 'circle',
      
    });
    scatterPlot.render();
  }, [])

  return (
    <div id="thbscatter"></div>
  )
}

export default CardContent;
