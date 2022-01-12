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

function SectionHeader({ title }) {
  return (
    <h6 style={{ fontWeight: "600", letterSpacing: "1px", fontSize: "30px" }}>
      {title}
    </h6>
  );
}

function Header() {
  return (
    <section className={"header-section"}>
      <ul className="header-menu">
        <li>Intro</li>
        <li>About</li>
        <li>Featured</li>
      </ul>
      <h1 id="header-text">Art Objects</h1>
    </section>
  );
}

function Featured() {
  return (
    <section className={"featured-section"}>
      <div className="feature-row-layout">
        <h6 className="f6">green</h6>
        <img className="fimg" src="https://picsum.photos/600/300" alt="" />
      </div>
      <div className="feature-column-layout">
        <h6 className="f6">lily</h6>
        <img
          className="fimg"
          src="https://picsum.photos/800/500"
          alt=""
          style={{ height: "125vh" }}
        />
      </div>
    </section>
  );
}

function About() {
  return (
    <section className={"about-section"}>
      <SectionHeader title={"about"} />
      <p id="headline">
        Your websites and tutorials are awesome and easy to understand!! Just
        one suggestion though... If possible, please try to add timestamps so
        that it's easier to keep a track of at what time will you be working on
        which element.
      </p>
    </section>
  );
}

function Gallery() {
  return <section className={"gallery-section"}></section>;
}

function Footer() {
  return <section className={"footer-section"}></section>;
}

function Playground() {
  return (
    <div className="main-container">
      {/* <NavLink to="/">To LandPage</NavLink> */}
      <div className="navbar">
        <div>menu</div>
        <div>Urban Culture</div>
        <div>about</div>
      </div>
      <Header />
      <Featured />
      <About />
      <Gallery />
      <Footer />
    </div>
  );
}

export default Playground;
