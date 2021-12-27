import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

export default function Box(props: any) {
  const mesh = useRef();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    const current: any = mesh.current;
    return (current.rotation.x += 0.01);
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 0.2 : 0.15}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <torusKnotGeometry args={[10, 3, 100, 16]} />
      <meshStandardMaterial color={hovered ? "pink" : "orange"} />
    </mesh>
  );
}
