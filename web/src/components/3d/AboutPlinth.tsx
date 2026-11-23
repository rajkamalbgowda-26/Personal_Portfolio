"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

function PlinthModel({ scrollRotation }: { scrollRotation: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const calmMode = usePortfolioStore((s) => s.calmMode);

  // Load about portrait
  const texture = useLoader(THREE.TextureLoader, "/assets/portrait/about-portrait.png");

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    if (!calmMode) {
      // Rotate plinth dynamically with scroll + gentle idle float
      const targetY = scrollRotation * 1.2 + Math.sin(t * 0.8) * 0.05;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.08);
      groupRef.current.rotation.x = Math.sin(t * 0.6) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Brushed Silver Plinth Pedestal (Multi-tiered Cylinder Base) */}
      <mesh position={[0, -1.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.7, 0.45, 64]} />
        <meshStandardMaterial
          color="#E4E7EB"
          metalness={0.92}
          roughness={0.25}
        />
      </mesh>

      <mesh position={[0, -1.0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.35, 1.45, 0.2, 64]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          metalness={0.98}
          roughness={0.12}
          clearcoat={1.0}
        />
      </mesh>

      {/* Floating Monolithic Glass & Portrait Display */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[1.8, 2.3, 0.12]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.88}
          roughness={0.15}
          thickness={0.6}
          ior={1.45}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Front Face: Portrait with Silver Duotone Feel */}
      <mesh position={[0, 0.35, 0.065]}>
        <planeGeometry args={[1.68, 2.18]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.2}
          metalness={0.15}
        />
      </mesh>

      {/* Holographic Iridescent Framing Ring around plinth */}
      <mesh position={[0, -0.88, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.42, 0.02, 16, 64]} />
        <meshPhysicalMaterial
          color="#9FE7F5"
          metalness={0.8}
          roughness={0.1}
          iridescence={1.0}
          iridescenceIOR={1.4}
        />
      </mesh>
    </group>
  );
}

export function AboutPlinth() {
  const qualityTier = usePortfolioStore((s) => s.qualityTier);
  const calmMode = usePortfolioStore((s) => s.calmMode);
  const [scrollRot, setScrollRot] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      // Scroll factor around station 2
      const rot = (y - vh) / (vh * 1.5);
      setScrollRot(rot);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dpr = qualityTier === "high" ? 2 : qualityTier === "medium" ? 1.5 : 1;

  return (
    <div className="w-full h-[480px] md:h-[580px] relative rounded-2xl overflow-hidden bg-pearl/30 border border-silver-100 shadow-atelier-card">
      <Canvas
        camera={{ position: [0, 0.3, 4.8], fov: 40 }}
        dpr={dpr}
        shadows={!calmMode}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[5, 8, 4]} intensity={2.0} castShadow={!calmMode} />
        <directionalLight position={[-5, 4, -2]} intensity={0.6} color="#EEF0F3" />
        <pointLight position={[0, -1, 2]} intensity={0.6} color="#9FE7F5" />

        <Environment preset="studio" />

        <React.Suspense fallback={null}>
          <PlinthModel scrollRotation={scrollRot} />
          <ContactShadows
            position={[0, -1.6, 0]}
            opacity={0.4}
            scale={8}
            blur={2.0}
            far={3.0}
            color="#16181C"
          />
        </React.Suspense>
      </Canvas>

      <div className="absolute bottom-4 left-6 pointer-events-none">
        <span className="sys-annotation text-graphite-900 font-bold block">
          PEDESTAL // BRUSHED SILVER ANISOTROPIC
        </span>
        <span className="font-mono text-[10px] text-graphite-600">
          SCROLL-COUPLED GYROSCOPIC INERTIA
        </span>
      </div>
    </div>
  );
}

