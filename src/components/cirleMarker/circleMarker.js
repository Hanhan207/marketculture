import React, { useEffect, useState } from "react";
import { CircleMarker, InfoWindow } from "@amap/amap-react";
import { Button, Switch, Divider, message, Card, Image } from "antd";

function MyCircleMarker(info) {
  const [markOpacity, setmarkOpacity] = useState(0.5);
  const [isActive, setActive] = useState(false);
  const markScale = 40;
  const item = info.data;
  const center = [item.long, item.lat];
  var myTitle = "";
  var content = "";

  switch (info.type) {
    case "ht":
      myTitle = item.ht_name;
      content = `相关名人：${item.value_person}`;
      break;
    case "thb":
      myTitle = item.thb_name;
      content = `商道精神：${item.thb_culture}`;
      break;
    case "op":
      myTitle = item.op_name;
      content = item.des ? item.des : "";
      break;
    case "db":
      myTitle = item.db_name;
      content = item.des ? item.des : "";
      break;
    default:
      break;
  }

  function onHover() {
    setmarkOpacity(1);
    setActive(true);
  }

  function onOut() {
    setmarkOpacity(0.5);
    setActive(false);
  }

  function showInfo() {
    console.log("info", item);
  }

  return (
    <div>
      <CircleMarker
        onMouseOver={onHover}
        onMouseOut={onOut}
        center={center}
        radius={item.value * markScale}
        fillColor={info.color}
        fillOpacity={markOpacity}
        strokeColor="#FFF"
        cursor="pointer"
        onClick={showInfo}
      />
      {isActive && (
        <InfoWindow
          position={center}
          offset={[0, -30]}
          autoMove
          closeWhenClickMap
          isCustom
          onClose={() => setActive(null)}
        >
          <Card size="small" title={myTitle} shadow="always">
            <h5>{content}</h5>
            <div></div>
          </Card>
        </InfoWindow>
      )}
    </div>
  );
}

export default MyCircleMarker;
