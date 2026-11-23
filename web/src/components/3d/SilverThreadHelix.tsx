"use client";

import React, { useRef, useMemo } from "react";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";
import { TimelineItem } from "@/lib/api-client";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

interface SilverThreadHelixProps {
  timeline: TimelineItem[];
  activeIndex: number;
  onSelectMilestone: (idx: number) => void;
}

function HelixCurve({
  timeline,
  activeIndex,
  onSelectMilestone,
}: {
  timeline: TimelineItem[];
  activeIndex: number;
  onSelectMilestone: (idx: number) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const calmMode = usePortfolioStore((s) => s.calmMode);

  // Generate 3D Helix Curve points
  const { curve, milestonePositions } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const nodePts: THREE.Vector3[] = [];
    const totalPoints = 120;
    const turns = 2.5;
    const height = 5.0;
    const radius = 1.35;

    for (let i = 0; i <= totalPoints; i++) {
      const progress = i / totalPoints;
      const angle = progress * Math.PI * 2 * turns;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (progress - 0.5) * height;
      pts.push(new THREE.Vector3(x, y, z));
    }

    const c = new THREE.CatmullRomCurve3(pts);

    // Compute evenly spaced milestone points along the curve
    const count = timeline.length || 4;
    for (let k = 0; k < count; k++) {
      const u = (k + 0.5) / count;
      nodePts.push(c.getPointAt(u));
    }

    return { curve: c, points: pts, milestonePositions: nodePts };
  }, [timeline.length]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    if (!calmMode) {
      groupRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3D Brushed Silver Ribbon Tube */}
      <mesh castShadow receiveShadow>
        <tubeGeometry args={[curve, 90, 0.08, 16, false]} />
        <meshPhysicalMaterial
          color="#E4E7EB"
          metalness={0.96}
          roughness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.06}
        />
      </mesh>

      {/* Iridescent Edge Accent Ribbon */}
      <mesh position={[0, 0.02, 0]}>
        <tubeGeometry args={[curve, 90, 0.03, 12, false]} />
        <meshPhysicalMaterial
          color="#9FE7F5"
          metalness={0.9}
          roughness={0.1}
          iridescence={1.0}
          iridescenceIOR={1.4}
        />
      </mesh>

      {/* Milestone Nodes on the Ribbon */}
      {milestonePositions.map((pos, idx) => {
        const isSelected = activeIndex === idx;
        return (
          <group key={idx} position={pos}>
            <mesh
              scale={isSelected ? 1.6 : 1.0}
              onClick={(e) => {
                e.stopPropagation();
                onSelectMilestone(idx);
              }}
              castShadow
            >
              <sphereGeometry args={[0.2, 32, 32]} />
              <meshPhysicalMaterial
                color={isSelected ? "#2F6BFF" : "#FFFFFF"}
                metalness={0.98}
                roughness={0.05}
                clearcoat={1.0}
              />
            </mesh>

            {/* Glowing Halos around selected node */}
            {isSelected && (
              <mesh scale={2.4}>
                <sphereGeometry args={[0.18, 16, 16]} />
                <meshBasicMaterial color="#9FE7F5" transparent opacity={0.3} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

export function SilverThreadHelix({
  timeline,
  activeIndex,
  onSelectMilestone,
}: SilverThreadHelixProps) {
  const qualityTier = usePortfolioStore((s) => s.qualityTier);
  const calmMode = usePortfolioStore((s) => s.calmMode);

  const dpr = qualityTier === "high" ? 2 : qualityTier === "medium" ? 1.5 : 1;

  return (
    <div className="w-full h-[340px] md:h-[400px] lg:h-[440px] relative rounded-2xl overflow-hidden bg-pearl/40 shadow-xs">
      {/* Static 30% Opacity Preview Backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <Image
          src="/assets/generated/art-journey.png"
          alt="Helix Ribbon Preview"
          fill
          priority
          className="object-cover"
        />
      </div>
      <Canvas
        camera={{ position: [0, 0.2, 5.2], fov: 42 }}
        dpr={dpr}
        shadows={!calmMode}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[6, 8, 4]} intensity={2.0} castShadow={!calmMode} />
        <directionalLight position={[-5, 4, -2]} intensity={0.6} color="#EEF0F3" />
        <pointLight position={[0, 0, 2]} intensity={0.8} color="#9FE7F5" />

        <React.Suspense fallback={null}>
          <Environment preset="studio" />

          <HelixCurve
            timeline={timeline}
            activeIndex={activeIndex}
            onSelectMilestone={onSelectMilestone}
          />

          <ContactShadows
            position={[0, -2.2, 0]}
            opacity={0.35}
            scale={10}
            blur={2.4}
            far={3.5}
            color="#16181C"
          />
        </React.Suspense>
      </Canvas>

      <div className="absolute bottom-4 left-6 pointer-events-none">
        <span className="font-mono text-xs text-graphite-900 font-bold block">
          CAREER TIMELINE
        </span>
        <span className="font-mono text-[10px] text-graphite-600">
          CHRONOLOGICAL MILESTONES (2020 — PRESENT)
        </span>
      </div>
    </div>
  );
}
