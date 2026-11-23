"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Text } from "@react-three/drei";
import * as THREE from "three";
import { Capability } from "@/lib/api-client";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

interface ConstellationOrbitalProps {
  capabilities: Capability[];
  activePlanetId: string | null;
  onSelectPlanet: (capability: Capability) => void;
}

function Planet({
  capability,
  index,
  total,
  isActive,
  isAnyActive,
  onHover,
  onClick,
}: {
  capability: Capability;
  index: number;
  total: number;
  isActive: boolean;
  isAnyActive: boolean;
  onHover: (hovered: boolean) => void;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);
  const calmMode = usePortfolioStore((s) => s.calmMode);

  // Orbit radius and angle
  const orbitRadius = 2.4 + (index % 3) * 0.75;
  const initialAngle = (index / total) * Math.PI * 2;
  const orbitSpeed = 0.12 / (1 + (index % 3) * 0.3);

  useFrame((state) => {
    if (!orbitGroupRef.current) return;
    const t = state.clock.getElapsedTime();

    if (!calmMode) {
      const angle = initialAngle + t * orbitSpeed;
      orbitGroupRef.current.position.x = Math.cos(angle) * orbitRadius;
      orbitGroupRef.current.position.z = Math.sin(angle) * (orbitRadius * 0.45);
      orbitGroupRef.current.position.y = Math.sin(t * 0.8 + index) * 0.15;
    }

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.5;
    }
  });

  // Calculate visual scale based on active state
  const targetScale = isActive ? 1.45 : isAnyActive ? 0.75 : 1.0;

  return (
    <group ref={orbitGroupRef}>
      {/* Chrome Planet Sphere */}
      <mesh
        ref={meshRef}
        scale={targetScale}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(true);
        }}
        onPointerOut={() => onHover(false)}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        castShadow
      >
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshPhysicalMaterial
          color={isActive ? "#9FE7F5" : "#E4E7EB"}
          metalness={0.96}
          roughness={isActive ? 0.04 : 0.14}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          iridescence={isActive ? 1.0 : 0.3}
          iridescenceIOR={1.4}
        />
      </mesh>

      {/* Orbiting Technology Moons */}
      {capability.technologies.slice(0, 3).map((tech, moonIdx) => {
        const moonRadius = 0.65 + moonIdx * 0.22;
        return (
          <group key={tech}>
            <mesh
              position={[
                Math.cos(moonIdx * 2.1) * moonRadius,
                Math.sin(moonIdx * 1.5) * 0.1,
                Math.sin(moonIdx * 2.1) * moonRadius,
              ]}
              scale={0.08}
            >
              <sphereGeometry args={[1, 16, 16]} />
              <meshPhysicalMaterial color="#C9B8FF" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        );
      })}

      {/* Floating Monospace Label */}
      <Text
        position={[0, -0.55, 0]}
        fontSize={0.12}
        color={isActive ? "#16181C" : "#4A4F57"}
        anchorX="center"
        anchorY="middle"
      >
        {capability.name.toUpperCase()}
      </Text>
    </group>
  );
}

export function ConstellationOrbital({
  capabilities,
  activePlanetId,
  onSelectPlanet,
}: ConstellationOrbitalProps) {
  const qualityTier = usePortfolioStore((s) => s.qualityTier);
  const calmMode = usePortfolioStore((s) => s.calmMode);

  const dpr = qualityTier === "high" ? 2 : qualityTier === "medium" ? 1.5 : 1;

  return (
    <div className="w-full h-[380px] md:h-[440px] lg:h-[480px] relative rounded-2xl overflow-hidden bg-pearl/40 shadow-xs">
      {/* Static 30% Opacity Preview Backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <Image
          src="/assets/generated/art-capabilities.png"
          alt="Constellation Orrery Preview"
          fill
          priority
          className="object-cover"
        />
      </div>
      <Canvas
        camera={{ position: [0, 2.8, 6.0], fov: 45 }}
        dpr={dpr}
        shadows={!calmMode}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        <ambientLight intensity={1.0} />
        <directionalLight position={[6, 9, 4]} intensity={2.2} castShadow={!calmMode} />
        <directionalLight position={[-6, 4, -3]} intensity={0.8} color="#EEF0F3" />
        <pointLight position={[0, 0, 0]} intensity={1.2} color="#9FE7F5" />

        <Environment preset="studio" />

        {/* Central Intelligence Core (Sun) */}
        <mesh position={[0, 0, 0]} scale={0.72} castShadow>
          <sphereGeometry args={[1, 48, 48]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            metalness={1.0}
            roughness={0.05}
            clearcoat={1.0}
            clearcoatRoughness={0.02}
          />
        </mesh>

        {/* Orbit Rings Track */}
        {[2.4, 3.15, 3.9].map((rad) => (
          <mesh key={rad} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
            <ringGeometry args={[rad - 0.01, rad + 0.01, 64]} />
            <meshBasicMaterial color="#C9CDD3" transparent opacity={0.35} side={THREE.DoubleSide} />
          </mesh>
        ))}

        {/* 7 Orbiting Chrome Planets */}
        {capabilities.map((cap, idx) => (
          <Planet
            key={cap.id}
            capability={cap}
            index={idx}
            total={capabilities.length}
            isActive={activePlanetId === cap.id}
            isAnyActive={activePlanetId !== null}
            onHover={(hovered) => {
              if (hovered) onSelectPlanet(cap);
            }}
            onClick={() => onSelectPlanet(cap)}
          />
        ))}

        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.35}
          scale={12}
          blur={2.5}
          far={4.0}
          color="#16181C"
        />
      </Canvas>

      <div className="absolute top-4 left-6 pointer-events-none">
        <span className="sys-annotation text-graphite-900 font-bold block">
          CONSTELLATION // 7 AUTONOMOUS CORES
        </span>
        <span className="font-mono text-[10px] text-graphite-600">
          HOVER OR TAP A PLANET TO EXPAND HOLO-CARD & FILTER PROJECTS
        </span>
      </div>
    </div>
  );
}
