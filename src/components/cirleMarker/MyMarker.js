import React, {  useState } from "react";
import {
    Marker,
    InfoWindow,
  } from "@amap/amap-react";

//antd 组件库
import { Card} from "antd";
import {
    CloseOutlined,
  } from "@ant-design/icons";
//标记组件
function MyMarker(data) {
    const [isActive, setIsActive] = useState(true);
    var markerInfo = data;
  
    return (
      <div>
        <Marker
          position={markerInfo.dot}
          clickable
          onClick={() => setIsActive(true)}
        />
        {isActive && (
          <InfoWindow
            position={markerInfo.dot}
            offset={[0, -30]}
            autoMove
            closeWhenClickMap
            isCustom
            onClose={() => setIsActive(false)}
          >
            <Card
              size="small"
              title={markerInfo.info.thb_name}
              shadow="always"
              extra={<CloseOutlined onClick={() => setIsActive(!isActive)} />}
            >
              <h5>{markerInfo.info.thb_address}</h5>
              {/* <div>{active.position.join(', ')}</div> */}
              <div></div>
            </Card>
          </InfoWindow>
        )}
      </div>
    );
  }

  export default MyMarker