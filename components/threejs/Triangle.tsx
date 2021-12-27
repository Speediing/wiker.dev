import * as THREE from "three";
import { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { Reflector, useTexture } from "@react-three/drei";

export function Triangle({ color, ...props }: any) {
  const ref = useRef();
  const [r] = useState(() => Math.random() * 10000);
  useFrame((_) => {
    if (!ref.current) return;
    const current: any = ref.current;
    return (current.position.y =
      -1.75 + Math.sin(_.clock.elapsedTime + r) / 10);
  });

  return (
    <group ref={ref}>
      <mesh {...props}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function Rig({ children }: any) {
  const ref = useRef();
  const vec = new THREE.Vector3();
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, 0, 3.5), 0.05);
    if (!ref.current) return;
    const current: any = ref.current;
    current.position.lerp(vec.set(mouse.x * 1, mouse.y * 0.1, 0), 0.1);
    current.rotation.y = THREE.MathUtils.lerp(
      current.rotation.y,
      (-mouse.x * Math.PI) / 20,
      0.1
    );
  });
  return <group ref={ref}>{children}</group>;
}

export function Ground(props: any) {
  //   const [floor, normal] = useTexture([
  //     "/SurfaceImperfections003_1K_var1.jpg",
  //     "/SurfaceImperfections003_1K_Normal.jpg",
  //   ]);
  return (
    <Reflector args={[8, 8]} {...props}>
      {(Material: any, props: any) => (
        <Material
          color="#ffffff"
          metalness={0}
          //   roughnessMap={floor}
          //   normalMap={normal}
          normalScale={[2, 2]}
          {...props}
        />
      )}
    </Reflector>
  );
}
