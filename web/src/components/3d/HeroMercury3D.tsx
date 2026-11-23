"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { MercuryMind } from "@/components/3d/MercuryMind";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

export function HeroMercury3D() {
  const calmMode = usePortfolioStore((s) => s.calmMode);
  const qualityTier = usePortfolioStore((s) => s.qualityTier);
  const dpr = qualityTier === "high" ? 2 : qualityTier === "medium" ? 1.5 : 1;

  return (
    <div className="w-full h-64 sm:h-72 lg:h-80 relative rounded-2xl overflow-hidden bg-pearl/40">
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 42 }}
        dpr={dpr}
        shadows={!calmMode}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        <ambientLight intensity={1.2} color="#FFFFFF" />
        <directionalLight position={[5, 8, 5]} intensity={2.2} color="#FFFFFF" castShadow={!calmMode} />
        <directionalLight position={[-5, 4, -2]} intensity={0.7} color="#EEF0F3" />
        <pointLight position={[0, -1, 2]} intensity={0.6} color="#9FE7F5" />

        <Environment preset="studio" />

        <Suspense fallback={null}>
          <MercuryMind />
          <ContactShadows
            position={[0, -1.6, 0]}
            opacity={0.3}
            scale={8}
            blur={2.5}
            far={3.0}
            color="#16181C"
          />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-3 left-4 pointer-events-none">
        <span className="font-mono text-[10px] text-graphite-600 uppercase tracking-widest block">
          REAL-TIME 3D // MERCURY CORE
        </span>
        <span className="font-mono text-[9px] text-graphite-500">
          Click to ripple · Morphs between lattice, graph, and sphere
        </span>
      </div>
    </div>
  );
}

