import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import ParticleField from "./ParticleField";

interface SceneProps {
  disableControls?: boolean;
}

const Scene: React.FC<SceneProps> = ({ disableControls = false }) => {
  return (
    <Canvas
      gl={{ antialias: true }}
      onCreated={({ gl }) => {
        gl.setClearColor("#111011");
      }}
      camera={{ position: [0, 0, 5], fov: 75 }}
      className="!fixed top-0 left-0 w-full h-full -z-10"
    >
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      <Suspense fallback={null}>
        <mesh rotation={[0.5, 0.5, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#9D4EDD" />
        </mesh>
        <ParticleField
          count={1500}
          color="#9D4EDD"
          size={0.03}
          speed={0.1}
          density={25}
        />
        <Environment preset="night" />
      </Suspense>
      {!disableControls && (
        <OrbitControls enableZoom={false} enablePan={false} />
      )}
    </Canvas>
  );
};

export default Scene;
