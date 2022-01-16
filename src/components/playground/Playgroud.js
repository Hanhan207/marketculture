import React, { useEffect, useState, useRef } from "react";
import { Select, Switch, message } from "antd";
import "./playground.scss";

import useLocoScroll from "../hooks/uesLocoScroll";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import SplitText from "../../utils/Split3.min.js";
import useOnScreen from "../hooks/useOnScreen";
import cn from "classnames";
import Gallery from "./gallery";

import { Pie, Line } from "@antv/g2plot";

import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Tilt from "react-parallax-tilt";

import { Parallax } from "rc-scroll-anim";
import ScrollAnim from "rc-scroll-anim";

import p1 from "../../img/p1/P1_1.png";
import p2 from "../../img/p1/P1_2.png";
import p3 from "../../img/p1/P1_3.png";
import p4 from "../../img/p1/P1_4.png";

import FiberEl from "../FiberEl/FiberEl";

const images = [
  {
    src: "https://images.unsplash.com/photo-1566204773863-cf63e6d4ab88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1345&q=100",
    title: "Dracaena Trifasciata",
    subtitle: "Live the Beauty",
    category: "Shooting / Adv.Campaing",
  },
  {
    src: "https://images.unsplash.com/photo-1558603668-6570496b66f8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1300&q=100",
    title: "Cereus Penuvianus",
    subtitle: "Live the Beauty",
    category: "Shooting / Adv.Campaing",
  },
  {
    src: "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=934&q=100",
    title: "Calliope",
    subtitle: "Live the Beauty",
    category: "Shooting / Adv.Campaing",
  },
  {
    src: "https://images.unsplash.com/photo-1611145367651-6303b46e4040?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2006&q=100",
    title: "Golden Pothos",
    subtitle: "Living Room",
    category: "Shooting / Adv.Campaing",
  },
];

function SectionHeader({ title }) {
  return (
    <h6 style={{ fontWeight: "600", letterSpacing: "1px", fontSize: "30px" }}>
      {title}
    </h6>
  );
}

function Header() {
  useEffect(() => {
    const split = new SplitText("#header-text", {
      type: "lines",
      linesClass: "lineChildren",
    });

    const splitParent = new SplitText("#header-text", {
      type: "lines",
      linesClass: "lineParent",
    });
    gsap.to(split.lines, {
      duration: 1,
      y: 0,
      opacity: 1,
      stagger: 0.1,
      ease: "power2",
    });
  }, []);
  return (
    <section className={"header-section"} data-scroll-section>
      {/* <ul className="header-menu">
        <li>首页</li>
        <li>四种空间</li>
        <li>人物关系</li>
        <li>数据统计</li>
      </ul> */}
      <FiberEl />
      <p className="header-menu">
        市井一词，原指街市或市场，即城邑中集中买卖货物的场所。“市井”在宋代之前多是由市场围墙围合成的商业区域，并在空间中施以“井”制，以限定其空间范围，起到与“坊”相隔离的作用，以便于监管。唐末宋初，市井外围高墙自发的逐步瓦解，商业逐渐向临街店面的形式转变，与居住空间的联系日益紧密，所形成的商业和居住空间的这种混合方式对商户经营、居民生活更加便利。北宋时期开封(东京)的市井，经过由前朝(唐代)“仿里”向“街坊”的转变后，得到了飞速发展。
      </p>
      <h1 id="header-text">市井文化 可视分析</h1>
    </section>
  );
}

function Featured() {
  return (
    <section className={"featured-section"} data-scroll-section>
      <div className="feature-row-layout">
        <h6>鲁迅在北京住过哪几个胡同？</h6>
        <img src="https://picsum.photos/600/300" alt="" data-scroll />
      </div>
      <div className="feature-column-layout">
        <h6>lily</h6>
        <img src="https://picsum.photos/800/500" data-scroll alt="" />
      </div>
    </section>
  );
}

function About() {
  const ref = useRef();
  const [reveal, setReveal] = useState(false);
  const onScreen = useOnScreen(ref);
  useEffect(() => {
    if (onScreen) setReveal(onScreen);
  }, [onScreen]);
  useEffect(() => {
    if (reveal) {
      const split = new SplitText("#headline", {
        type: "lines",
        // linesClass: "lineChildren",
      });

      gsap.to(split.lines, {
        duration: 2,
        y: -20,
        opacity: 1,
        stagger: 0.1,
        ease: "power4.out",
      });
    }
  }, [reveal]);
  return (
    <section className={"about-section"} data-scroll-section>
      <SectionHeader title={"数据探索"} />
      <p id="headline" ref={ref} className={cn({ "is-reveal": reveal })}>
        市井文化可视分析系统从传统文化爱好者的角度出发，设计了自定义数据统计功能。用户可以通过选择感兴趣的主题，查看相关主题下的可视分析图表并写下自己的洞察或评价，并经过分析平台再设计后生成可分享的海报，
        <NavLink to="/">{"快来试一试吧——>"}</NavLink>
      </p>
    </section>
  );
}

function Footer() {
  const ref = useRef();
  const [reveal, setReveal] = useState(false);
  const onScreen = useOnScreen(ref);
  useEffect(() => {
    if (onScreen) setReveal(onScreen);
  }, [onScreen]);
  useEffect(() => {
    if (reveal) {
      const split = new SplitText("#location-text", {
        type: "lines",
        linesClass: "lineChildren2",
      });

      gsap.fromTo(
        split.lines,
        { y: 200 },
        {
          duration: 1,
          y: 0,
          // opacity: 1,
          stagger: 0.1,
          ease: "power2",
        }
      );
    }
  }, [reveal]);
  return (
    <section className={"footer"} data-scroll-section>
      <SectionHeader title={"Made in"} />
      <h1
        className={cn("location", { "is-reveal": reveal })}
        id="location-text"
        ref={ref}
      >
        中华文化 博大精深
      </h1>
    </section>
  );
}

function Playground() {
  const [preloader, setPreloader] = useState(true);
  const [timer, setTimer] = useState(3);
  useLocoScroll(!preloader);
  const id = useRef(null);
  const clear = () => {
    window.clearInterval(id.current);
    setPreloader(false);
  };
  useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
  }, []);
  useEffect(() => {
    if (timer === 0) {
      clear();
    }
  }, [timer]);

  return (
    <>
      {preloader ? (
        <div
          style={{
            position: "fixed",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            zIndex: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: "#191919",
          }}
        >
          <h1
            style={{ fontSize: "1.5vw", fontWeight: "600", color: "#dbd8d6" }}
          >
            市井文化可视分析系统
          </h1>
          <h2
            style={{
              marginTop: "4px",
              fontSize: "1.2vw",
              color: "#dbd8d6",
              letterSpacing: "2px",
            }}
          >
            -古都知识图谱项目-
          </h2>
        </div>
      ) : (
        <div
          className="main-container"
          id="main-container"
          data-scroll-container
        >
          <div className="navbar" data-scroll-section>
            <div>菜单</div>
            <div>古都图谱</div>
            <div>关于</div>
          </div>
          <Header />
          <Gallery />
          <Featured />
          <About />

          <Footer />
        </div>
      )}
    </>
  );
}

export default Playground;
