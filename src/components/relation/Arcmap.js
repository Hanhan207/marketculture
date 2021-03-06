import React, { useEffect, useState } from "react";
import { Button, Switch, Divider, message, Card, Image, Tabs } from "antd";
import G6 from "@antv/g6";

const width = 1500;
const height = 800;
const colors = [
  "rgb(91, 143, 249)",
  "rgb(90, 216, 166)",
  "rgb(93, 112, 146)",
  "rgb(246, 189, 22)",
  "rgb(232, 104, 74)",
  "rgb(109, 200, 236)",
  "rgb(146, 112, 202)",
  "rgb(255, 157, 77)",
  "rgb(38, 154, 153)",
  "rgb(227, 137, 163)",
];

// lineDash array
const lineDash = [4, 2, 1, 2];

function Arcmap(e) {
  useEffect(() => {
    // init(e.data);
    CircleMap(e.data);
  }, []);

  return <div style={{ width: width, height: height }} id="container"></div>;
}
function CircleMap(e) {
  var nodes = e.nodes;
  var edges = e.edges;

  G6.registerEdge(
    "line-growth",
    {
      afterDraw(cfg, group) {
        const shape = group.get("children")[0];
        const length = shape.getTotalLength();
        shape.animate(
          (ratio) => {
            // the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
            const startLen = ratio * length;
            // Calculate the lineDash
            const cfg = {
              lineDash: [startLen, length - startLen],
            };
            return cfg;
          },
          {
            // repeat: true, // Whether executes the animation repeatly
            duration: 2000, // the duration for executing once
          }
        );
      },

      setState(name, value, item) {
        const shape = item.get("keyShape");
        if (name === "running") {
          if (value) {
            let index = 0;
            shape.animate(
              () => {
                index++;
                if (index > 9) {
                  index = 0;
                }
                const res = {
                  lineDash,
                  lineDashOffset: -index,
                };
                // return the params for this frame
                return res;
              },
              {
                repeat: true,
                duration: 3000,
              }
            );
          } else {
            shape.stopAnimate();
            shape.attr("lineDash", null);
          }
        }
      },
    },
    "quadratic" // extend the built-in edge 'cubic'
  );

  const graph = new G6.Graph({
    container: "container",
    width,
    height,
    linkCenter: true,
    modes: {
      default: [
        "drag-canvas",
        {
          type: "zoom-canvas",
          sensitivity: 5,
        },
        // {
        //   type: 'edge-tooltip',
        //   formatText: function formatText(model) {
        //     const text = 'source: ' + model.sourceName + '<br/> target: ' + model.targetName;
        //     return text;
        //   },
        // },
      ],
    },
    defaultNode: {
      style: {
        opacity: 0.8,
        lineWidth: 1,
        stroke: "#999",
      },
    },
    defaultEdge: {
      size: 1,
      color: "#e2e2e2",
      style: {
        opacity: 0.6,
        lineAppendWidth: 3,
        lineWidth: 3,
      },
    },
  });

  // set hover state
  graph.on("node:mouseenter", (ev) => {
    const node = ev.item;
    const edges = node.getEdges();
    edges.forEach((edge) => graph.setItemState(edge, "running", true));
  });
  graph.on("node:mouseleave", (ev) => {
    const node = ev.item;
    const edges = node.getEdges();
    edges.forEach((edge) => graph.setItemState(edge, "running", false));
  });

  graph.on("edge:mouseenter", function (e) {
    const edge = e.item;
    graph.setItemState(edge, "hover", true);
  });
  graph.on("edge:mouseleave", function (e) {
    const edge = e.item;
    graph.setItemState(edge, "hover", false);
  });

  const origin = [width / 2, height / 2];
  const radius = width < height ? width / 3 : height / 3;

  const nodeMap = new Map();
  // const clusterMap = new Map();
  let clusterId = 0;
  const n = nodes.length;
  const angleSep = (Math.PI * 2) / n;
  nodes.forEach(function (node, i) {
    node.id = node.identity.low + "";
    const angle = i * angleSep;
    node.x = radius * Math.cos(angle) + origin[0];
    node.y = radius * Math.sin(angle) + origin[1];
    node.angle = angle;
    nodeMap.set(node.id, node);

    // cluster
    // if (node.cluster && clusterMap.get(node.cluster) === undefined) {
    //   clusterMap.set(node.cluster, clusterId);
    //   clusterId++;
    // }
    // const id = clusterMap.get(node.cluster);
    // if (node.style) {
    //   node.style.fill = colors[id % colors.length];
    // } else {
    //   node.style = {
    //     fill: colors[id % colors.length],
    //   };
    // }
    // label
    node.label = node.properties.name;
    node.labelCfg = {
      position: "center",
      style: {
        rotate: angle,
        rotateCenter: "lefttop",
        textAlign: "start",
      },
    };
  });
  edges.forEach((edge) => {
    // edge.type = "quadratic";
    edge.type = "line-growth";
    const source = nodeMap.get(edge.source);
    const target = nodeMap.get(edge.target);
    edge.controlPoints = [
      {
        x: origin[0],
        y: origin[1],
      },
    ];
    edge.color = setColor(edge.properties.relation);
    // edge.lineWidth = 150;
    // edge.sourceName = source.name;
    // edge.targetName = target.name;
  });

  graph.data(e);
  graph.render();
}

function init(e) {
  var nodes = e.nodes;
  var edges = e.edges;

  G6.registerEdge(
    "line-growth",
    {
      afterDraw(cfg, group) {
        const shape = group.get("children")[0];
        const length = shape.getTotalLength();
        shape.animate(
          (ratio) => {
            // the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
            const startLen = ratio * length;
            // Calculate the lineDash
            const cfg = {
              lineDash: [startLen, length - startLen],
            };
            return cfg;
          },
          {
            // repeat: true, // Whether executes the animation repeatly
            duration: 2000, // the duration for executing once
          }
        );
      },

      setState(name, value, item) {
        const shape = item.get("keyShape");
        if (name === "running") {
          if (value) {
            let index = 0;
            shape.animate(
              () => {
                index++;
                if (index > 9) {
                  index = 0;
                }
                const res = {
                  lineDash,
                  lineDashOffset: -index,
                };
                // return the params for this frame
                return res;
              },
              {
                repeat: true,
                duration: 3000,
              }
            );
          } else {
            shape.stopAnimate();
            shape.attr("lineDash", null);
          }
        }
      },
    },
    "arc" // extend the built-in edge 'cubic'
  );

  const graph = new G6.Graph({
    container: "container",
    width,
    height,
    linkCenter: true,
    modes: {
      // default: [
      //   // {
      //   //   type: "edge-tooltip",
      //   //   fomaText: "Hi!",
      //   // },
      // ],
      defaultNode: {
        style: {
          opacity: 0.8,
          lineWidth: 1,
          stroke: "#999",
        },
      },
      defaultEdge: {
        size: 1,
        color: "#e2e2e2",
        style: {
          opacity: 0.6,
          lineWidth: 15,
        },
      },
    },
  });

  // set hover state
  graph.on("node:mouseenter", (ev) => {
    const node = ev.item;
    const edges = node.getEdges();
    edges.forEach((edge) => graph.setItemState(edge, "running", true));
  });
  graph.on("node:mouseleave", (ev) => {
    const node = ev.item;
    const edges = node.getEdges();
    edges.forEach((edge) => graph.setItemState(edge, "running", false));
  });

  const nodeMap = new Map();
  //   const clusterMap = new Map();
  //   let clusterId = 0;
  const n = nodes.length;
  const horiPadding = 10;
  const begin = [horiPadding, height * 0.7];
  const end = [width - horiPadding, height * 0.7];
  const xLength = end[0] - begin[0];
  const yLength = end[1] - begin[1];
  const xSep = xLength / n;
  const ySep = yLength / n;

  //?????????
  nodes.forEach(function (node, i) {
    node.id = node.identity.low + "";
    node.x = begin[0] + i * xSep;
    node.y = begin[1] + i * ySep;
    nodeMap.set(node.identity.low + "", node);
    // label
    node.label = node.properties.name;
    node.labelCfg = {
      position: "bottom",
      offset: 5,
      style: {
        rotate: Math.PI / 2,
        textAlign: "start",
      },
    };
  });
  //?????????
  edges.forEach((edge) => {
    edge.type = "line-growth";
    const source = nodeMap.get(edge.source);
    const target = nodeMap.get(edge.target);
    const endsSepStep = (target.x - source.x) / xSep;
    const sign = endsSepStep < 0 ? -1 : 1;
    const curveOffset = sign * 10 * Math.ceil(Math.abs(endsSepStep));
    edge.curveOffset = curveOffset;
    edge.color = setColor(edge.properties.relation);
    edge.lineWidth = 15;
    // edge.sourceName = source.name;
    // edge.targetName = target.name;
    // console.log("edge", edge);
  });
  graph.data(e);
  graph.render();
}

function setColor(type) {
  var mycolor;
  switch (type) {
    case "??????":
      mycolor = colors[1];
      break;
    case "??????":
      mycolor = colors[2];
      break;
    case "??????":
      mycolor = colors[3];
      break;
    case "????????????":
      mycolor = colors[4];
      break;
    default:
      mycolor = colors[0];
  }
  return mycolor;
}

export default Arcmap;
