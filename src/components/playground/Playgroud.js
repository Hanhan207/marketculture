import React, { useEffect, useState } from "react";
import { Button, Switch, Divider, message, Card, Image, Tabs } from "antd";

import { Parallax } from "rc-scroll-anim";
import ScrollAnim from "rc-scroll-anim";
// import { QueueAnim } from "rc-queue-anim";
// import { TweenOne } from "rc-tween-one";
// import Animate from "rc-animate";

const ScrollOverPack = ScrollAnim.OverPack;

function Playground() {
  return (
    <div>
      <img src="https://picsum.photos/200/300" alt="" />
      <Parallax
        animation={{ x: 0 }}
        style={{ transform: "translateX(-100px)" }}
        className="code-box-shape"
      />
      <img src="https://picsum.photos/200/300" alt="" />
      <Parallax
        animation={{ scale: 1 }}
        style={{ transform: "scale(0)" }}
        className="code-box-shape"
      />
      <Parallax animation={{ rotate: 360 }} className="code-box-shape" />
      <ScrollOverPack className="page1" playScale={1} replay location="page1">
        每次进入都启动播放
      </ScrollOverPack>
      <ScrollOverPack
        className="pack-page page2"
        style={{ backgroundColor: "#174270", height: 500 }}
        id="page2"
        playScale={1}
      >
        每次进入都启动播放22222222
      </ScrollOverPack>
      <Parallax
        animation={{ x: 0, opacity: 1, playScale: [0.5, 0.8] }}
        style={{ transform: "translateX(-100px)", opacity: 0 }}
        className="code-box-shape"
      />
      <Parallax
        animation={[
          { x: 0, opacity: 1, playScale: [0, 0.2] },
          { y: 100, playScale: [0, 0.3] },
          { blur: "10px", playScale: [0, 0.5] },
        ]}
        style={{
          transform: "translateX(-100px)",
          filter: "blur(0px)",
          opacity: 0,
        }}
        className="code-box-shape"
      />
    </div>
  );
}

export default Playground;
