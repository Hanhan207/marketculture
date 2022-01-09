import React, { useEffect, useState, useRef } from "react";
import { Select, Switch, message } from "antd";
import "./playground.css";

import { Pie, Line } from "@antv/g2plot";

import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Tilt from "react-parallax-tilt";

import { Parallax } from "rc-scroll-anim";
import ScrollAnim from "rc-scroll-anim";

import p1 from "../../img/p1/P1_1.png";
import p2 from "../../img/p1/P1_2.png";
import p3 from "../../img/p1/P1_3.png";
import p4 from "../../img/p1/P1_4.png";

function Playground() {
  return (
    <div>
      <Tilt
        className="parallax-effect-img"
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={800}
        transitionSpeed={150}
        // scale={1.1}
        gyroscope={true}
      >
        <img src={p4} className="inner p4" alt="pic" />
        <img src={p1} className="inner p1" alt="pic" />
        <img src={p2} className="inner p1" alt="pic" />
        <img src={p3} className="inner p1" alt="pic" />
      </Tilt>
      <NavLink to="/">To LandPage</NavLink>
      <img
        src="https://a.amap.com/jsapi_demos/static/demo-center/3d_texture_cctv_256.png"
        alt=""
      />
      <img src="http://hanhan.run/mc_img/3d_texture_cctv_256.png" alt="" />
    </div>
  );
}

export default Playground;
