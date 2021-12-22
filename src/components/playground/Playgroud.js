import React, { useEffect, useState, useRef } from "react";
import { Select, Switch, message } from "antd";
import "./playground.css";

import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Tilt from "react-parallax-tilt";

import { Parallax } from "rc-scroll-anim";
import ScrollAnim from "rc-scroll-anim";

function Playground() {
  return (
    <div>
      <div className="father">
        <div className="child"></div>
        <div className="wrapper-bg" style={{}}></div>
      </div>
      <Tilt
        className="parallax-effect-glare-scale"
        perspective={500}
        glareEnable={true}
        glareMaxOpacity={0.45}
        scale={1.02}
      >
        <div className="inner-element">
          <div>React</div>
          <div>Parallax Tilt</div>
          <div>👀</div>
        </div>
      </Tilt>
      <NavLink to="/">To LandPage</NavLink>
    </div>
  );
}

export default Playground;
