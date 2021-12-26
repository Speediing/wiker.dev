import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

export default function Box(props: any) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (!mesh.current) return;
    const current: any = mesh.current;
    return (current.rotation.x += 0.01);
  });
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 0.5 : 0.25}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <torusGeometry args={[10, 3, 16, 100]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
      {/* <meshDis
        color={color}
        envMapIntensity={env}
        clearcoat={coat}
        clearcoatRoughness={0}
        metalness={0.1}
      /> */}
    </mesh>
  );
}
