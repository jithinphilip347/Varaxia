"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sphere,
  TorusKnot,
  Box,
  Stars,
  Environment,
} from "@react-three/drei";

function DesignShape() {
  const mesh = useRef();
  useFrame((state) => {
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={mesh} scale={0.8}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#4287f5"
          wireframe
          wireframeLinewidth={2}
        />
      </mesh>
    </Float>
  );
}

function BuildShape() {
  const group = useRef();
  useFrame((state) => {
    group.current.rotation.y = state.clock.getElapsedTime() * 0.4;
  });

  return (
    <group ref={group} scale={0.6}>
      <Float speed={4} rotationIntensity={0.5} floatIntensity={0.5}>
        <Box args={[1, 1, 1]}>
          <meshStandardMaterial color="#00ff88" opacity={0.5} transparent />
        </Box>
        <Box args={[1.2, 1.2, 1.2]}>
          <meshStandardMaterial color="#00ff88" wireframe />
        </Box>
      </Float>
    </group>
  );
}

function MarketShape() {
  const mesh = useRef();
  useFrame((state) => {
    mesh.current.rotation.y += 0.005;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <points ref={mesh} scale={0.9}>
        <sphereGeometry args={[1, 32, 32]} />
        <pointsMaterial color="#ff0055" size={0.05} sizeAttenuation />
      </points>
    </Float>
  );
}

export function PhilosophyBackground() {
  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
}

export function PhilosophyShape({ type }) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />

        {type === "design" && <DesignShape />}
        {type === "build" && <BuildShape />}
        {type === "market" && <MarketShape />}
      </Canvas>
    </div>
  );
}
