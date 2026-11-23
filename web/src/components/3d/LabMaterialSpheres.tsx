"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

// 1. Liquid Mercury Sphere with subtle organic surface wave
function MercurySphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const calmMode = usePortfolioStore((s) => s.calmMode);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    if (!calmMode) {
      meshRef.current.rotation.y = t * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.05;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          color="#F7F8FA"
          metalness={1.0}
          roughness={0.06}
          clearcoat={1.0}
          clearcoatRoughness={0.04}
          reflectivity={1.0}
        />
      </mesh>
    </group>
  );
}

// 2. Brushed Silver Sphere with directional / anisotropic brushed texture
function BrushedSilverSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const calmMode = usePortfolioStore((s) => s.calmMode);

  // Generate a procedural brushed anisotropic roughness texture
  const brushedTexture = React.useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#A0A0A0";
      ctx.fillRect(0, 0, 512, 512);

      // Add fine horizontal noise lines
      for (let i = 0; i < 600; i++) {
        const y = Math.random() * 512;
        const alpha = 0.04 + Math.random() * 0.12;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillRect(0, y, 512, Math.random() * 2 + 0.5);

        const darkAlpha = 0.04 + Math.random() * 0.1;
        ctx.fillStyle = `rgba(0, 0, 0, ${darkAlpha})`;
        ctx.fillRect(0, y + 1, 512, Math.random() * 1.5 + 0.5);
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 4);
    return texture;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    if (!calmMode) {
      meshRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#E4E7EB"
          metalness={0.92}
          roughness={0.28}
          roughnessMap={brushedTexture}
        />
      </mesh>
    </group>
  );
}

// 3. Holo-Glass Sphere with chromatic aberration & transmission
function HoloGlassSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const calmMode = usePortfolioStore((s) => s.calmMode);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    if (!calmMode) {
      meshRef.current.rotation.y = t * 0.18;
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          backside={false}
          samples={8}
          resolution={512}
          transmission={0.95}
          roughness={0.08}
          thickness={0.85}
          ior={1.45}
          chromaticAberration={0.06}
          anisotropy={0.15}
          distortion={0.12}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color="#FFFFFF"
          attenuationDistance={1.2}
          attenuationColor="#C9B8FF"
        />
      </mesh>
      {/* Tiny inner floating chrome bead for refraction demonstration */}
      <mesh scale={0.25}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial color="#9FE7F5" metalness={1} roughness={0.1} />
      </mesh>
    </group>
  );
}

// 4. Iridescent Thin-Film Edge Sphere (CD rainbow reflection)
function IridescentEdgeSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const calmMode = usePortfolioStore((s) => s.calmMode);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    if (!calmMode) {
      meshRef.current.rotation.y = t * 0.25;
      meshRef.current.rotation.z = Math.sin(t * 0.8) * 0.15;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          color="#F7F8FA"
          metalness={0.88}
          roughness={0.12}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          iridescence={1.0}
          iridescenceIOR={1.42}
          iridescenceThicknessRange={[120, 380]}
        />
      </mesh>
    </group>
  );
}

export function LabMaterialSpheres() {
  const qualityTier = usePortfolioStore((s) => s.qualityTier);
  const calmMode = usePortfolioStore((s) => s.calmMode);

  const dpr = qualityTier === "high" ? 2 : qualityTier === "medium" ? 1.5 : 1;

  return (
    <div className="w-full h-[460px] relative rounded-2xl overflow-hidden border border-silver-100 bg-pearl/40 shadow-atelier-card">
      <Canvas
        camera={{ position: [0, 1.2, 5.5], fov: 42 }}
        dpr={dpr}
        shadows={!calmMode}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        {/* Daylight Studio Ambient & Key Lighting */}
        <ambientLight intensity={0.9} color="#FFFFFF" />
        <directionalLight
          position={[5, 8, 4]}
          intensity={1.8}
          color="#FFFFFF"
          castShadow={!calmMode}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />
        <directionalLight position={[-6, 4, -2]} intensity={0.6} color="#EEF0F3" />
        <pointLight position={[0, -2, 2]} intensity={0.5} color="#9FE7F5" />

        {/* High-Key Studio HDRI Environment */}
        <Environment preset="studio" environmentIntensity={1.1} />

        {/* Four Material Spheres */}
        <group position={[0, 0, 0]}>
          <MercurySphere position={[-3.3, 0, 0]} />
          <BrushedSilverSphere position={[-1.1, 0, 0]} />
          <HoloGlassSphere position={[1.1, 0, 0]} />
          <IridescentEdgeSphere position={[3.3, 0, 0]} />
        </group>

        {/* Soft Contact Shadows on Light Porcelain Floor */}
        <ContactShadows
          position={[0, -1.05, 0]}
          opacity={0.4}
          scale={12}
          blur={2.2}
          far={3.5}
          color="#16181C"
        />
      </Canvas>

      {/* Floating System Annotations underneath each sphere */}
      <div className="absolute bottom-4 left-0 right-0 px-6 grid grid-cols-4 gap-2 text-center pointer-events-none">
        <div>
          <span className="sys-annotation text-graphite-900 font-bold block">01 / LIQUID MERCURY</span>
          <span className="font-mono text-[10px] text-graphite-600">MeshPhysical metal:1.0 rough:0.06</span>
        </div>
        <div>
          <span className="sys-annotation text-graphite-900 font-bold block">02 / BRUSHED SILVER</span>
          <span className="font-mono text-[10px] text-graphite-600">Anisotropic Noise Map</span>
        </div>
        <div>
          <span className="sys-annotation text-graphite-900 font-bold block">03 / HOLO-GLASS</span>
          <span className="font-mono text-[10px] text-graphite-600">Transmission + Chromatic Aberr.</span>
        </div>
        <div>
          <span className="sys-annotation text-graphite-900 font-bold block">04 / IRIDESCENT EDGE</span>
          <span className="font-mono text-[10px] text-graphite-600">Thin-Film Interference (IOR 1.42)</span>
        </div>
      </div>
    </div>
  );
}
