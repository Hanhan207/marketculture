import React, { useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import "./fiberEl.scss";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useLoader } from "@react-three/fiber";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

import Model from "./models/house";
import Model2 from "./models/objtest";
import Chat from "./models/chat";

function About() {
  const materials = useLoader(MTLLoader, "/models/Chat.mtl");
  const obj = useLoader(OBJLoader, "/models/Chat.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  // console.log(obj);
  return <primitive object={obj} scale={1} />;
}

export default function FiberEl() {
  return (
    <div id="canvas-container" data-scroll data-scroll-speed={2}>
      <Canvas flat dpr={[1, 2]} camera={{ fov: 25, position: [0, 0, 25] }}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 1, 5]} />
        <PresentationControls
          global
          zoom={0.8}
          rotation={[0, -Math.PI / 4, 0]}
          polar={[0, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <Suspense fallback={null}>
            <Chat />
            {/* <About position={[0, 0, 0]} /> */}
          </Suspense>
        </PresentationControls>
      </Canvas>
    </div>
  );
}

function MyRotatingBox() {
  const myMesh = React.useRef();
  const [active, setActive] = useState(false);

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.z = a;
  });

  return (
    <mesh
      scale={active ? 4 : 2}
      onClick={() => setActive(!active)}
      ref={myMesh}
    >
      <boxGeometry />
      <meshPhongMaterial color="royalblue" />
    </mesh>
  );
}
