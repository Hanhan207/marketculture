import React, { useEffect, useState, useRef } from "react";
import { Select, Switch, message } from "antd";
import "./playground.css";

import useLocoScroll from "../hooks/uesLocoScroll";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import SplitText from "../../utils/Split3.min.js";
import useOnScreen from "../hooks/useOnScreen";
import cn from "classnames";

import { Pie, Line } from "@antv/g2plot";

import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Tilt from "react-parallax-tilt";

import { Parallax } from "rc-scroll-anim";
import ScrollAnim from "rc-scroll-anim";

import p1 from "../../img/p1/P1_1.png";
import p2 from "../../img/p1/P1_2.png";
import p3 from "../../img/p1/P1_3.png";
import p4 from "../../img/p1/P1_4.png";

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
    <section className={"featured-section"} data-scroll-section>
      <div className="feature-row-layout">
        <h6 className="f6">green</h6>
        <img className="fimg" src="https://picsum.photos/600/300" alt="" />
      </div>
      <div className="feature-column-layout">
        <h6 className="f6">lily</h6>
        <img
          className="fimg"
          // style={{
          //   clipPath: " inset(0% 0% 0% 0%)",
          //   width: "100%",
          //   objectFit: "cover",
          //   transition: " clip-path 1s cubic-bezier(0.77,0,0.175,1)",
          // }}
          src="https://picsum.photos/800/500"
          alt=""
          style={{ height: "125vh" }}
        />
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
      <SectionHeader title={"about"} />
      <p id="headline" ref={ref} className={cn({ "is-reveal": reveal })}>
        Your websites and tutorials are awesome and easy to understand!! Just
        one suggestion though... If possible, please try to add timestamps so
        that it's easier to keep a track of at what time will you be working on
        which element.
      </p>
    </section>
  );
}

function GalleryItem({
  src,
  category,
  subtitle,
  title,
  updateActiveImage,
  index,
}) {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref, 0.5);
  useEffect(() => {
    if (onScreen) {
      updateActiveImage(index);
    }
  }, [onScreen, index]);
  return (
    <div
      className={cn("gallery-item-wrapper", { "is-reveal": onScreen })}
      ref={ref}
    >
      <div />
      <div className="gallery-item">
        <div className="gallery-item-info">
          <h1 className="gallery-info-title">{title}</h1>
          <h6 className="gallery-info-subtitle">{subtitle}</h6>
          <p className="gallery-info-category">{category}</p>
        </div>
        <div
          className="gallery-item-image"
          style={{ backgroundImage: `url(${src})` }}
        ></div>
      </div>
      <div />
    </div>
  );
}

function Gallery({ src, index, columOffset }) {
  const [activeImage, setActiveImage] = useState(1);
  const ref = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      let sections = gsap.utils.toArray(".gallery-item-wrapper");
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          start: "top top",
          trigger: ref.current,
          scroll: "#main-container",
          pin: true,
          scrub: 0.5,
          span: 1 / (sections.length - 1),
          end: () => `+=${ref.current.offsetWidth}`,
        },
      });
      ScrollTrigger.refresh();
    });
  }, []);

  const handleUpdateActiveImage = (index) => {
    setActiveImage(index + 1);
  };
  return (
    <section
      data-scroll-section
      className={"gallery-section gallery-wrap"}
      style={{
        backgroundColor: "#d53f41",
        marginLeft: "-5vw",
        marginRight: "-5vw",
      }}
    >
      <div className="gallery" ref={ref}>
        <div
          className="gallery-counter"
          style={{
            postion: "absolute",
            top: "10%",
            left: "100px",
            zIndex: "1",
            mixBlendMode: "difference",
            lineHeight: "16px",
            color: "#dbd8d6",
            fontSize: "16px",
            fontWeight: "600",
            display: "inline-block",
          }}
        >
          <span>{activeImage}</span>
          <span
            style={{
              content: "",
              backgroundColor: "white",
              width: "6.25vw",
              margin: "7px 10px",
              height: "1px",
              display: "inline-block",
            }}
          ></span>
          <span>{images.length}</span>
        </div>
        {images.map((image, index) => (
          <GalleryItem
            key={image.src}
            index={index}
            {...image}
            updateActiveImage={handleUpdateActiveImage}
          />
        ))}
      </div>
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
      const split = new SplitText("#location", {
        type: "lines",
        linesClass: "lineChildren2",
      });

      const splitParent = new SplitText("#location", {
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
    }
  }, [reveal]);
  return (
    <section
      className={"footer-section"}
      style={{ marginBottom: "200px", textAlign: "center" }}
      data-scroll-section
    >
      <SectionHeader title={"Made in"} />
      <h1
        className={cn({ "is-reveal": reveal })}
        id="location"
        // style={{  }}
        ref={ref}
      >
        Bupt and Hanyuxin
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
            Hanyuxin
          </h1>
          <h2
            style={{ marginTop: "10px", fontSize: "1.5vw", color: "#dbd8d6" }}
          >
            Urban Culture
          </h2>
        </div>
      ) : (
        <div
          className="main-container"
          id="main-container"
          data-scroll-container
        >
          {/* <NavLink to="/">To LandPage</NavLink> */}
          <div className="navbar" data-scroll-section>
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
      )}
    </>
  );
}

export default Playground;
