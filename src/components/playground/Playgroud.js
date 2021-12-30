import React, { useEffect, useState, useRef } from "react";
import { Select, Switch, message } from "antd";
import "./playground.css";

import { Pie,Line } from '@antv/g2plot';

import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Tilt from "react-parallax-tilt";

import { Parallax } from "rc-scroll-anim";
import ScrollAnim from "rc-scroll-anim";

const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];
function Playground() {
  useEffect(() => {
    const line = new Line('container', {
      data,
      xField: 'year',
      yField: 'value',
    });
    
    line.render();
    
  }, [])
  
 
  return (
    <div>
    <div id="container"></div>
      <div className="father">
        <div className="child"></div>
        <div className="wrapper-bg" style={{}}></div>
      </div>
      {/* <Tilt
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
      </Tilt> */}
      <NavLink to="/">To LandPage</NavLink>

    </div>
  );
}

export default Playground;
