"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import * as THREE from "three";
import { MercuryMind } from "@/components/3d/MercuryMind";
import { HoloPortraitPanel } from "@/components/3d/HoloPortraitPanel";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

export function HeroCanvas() {
  const qualityTier = usePortfolioStore((s) => s.qualityTier);
  const calmMode = usePortfolioStore((s) => s.calmMode);

  const enablePost = qualityTier === "high" && !calmMode;
  const dpr = qualityTier === "high" ? 2 : qualityTier === "medium" ? 1.5 : 1;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
      <Canvas
        camera={{ position: [0.5, 0.1, 6.4], fov: 42 }}
        dpr={dpr}
        shadows={!calmMode}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        className="pointer-events-auto"
      >
        {/* Daylight Studio Environment Lighting */}
        <ambientLight intensity={1.1} color="#FFFFFF" />
        <directionalLight
          position={[6, 9, 5]}
          intensity={2.2}
          color="#FFFFFF"
          castShadow={!calmMode}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />
        <directionalLight position={[-6, 5, -2]} intensity={0.8} color="#EEF0F3" />
        <pointLight position={[0, -2, 3]} intensity={0.7} color="#9FE7F5" />
        <pointLight position={[3, 3, 2]} intensity={0.5} color="#C9B8FF" />

        {/* High-Key Studio HDRI for Chrome Reflections */}
        <Environment preset="studio" environmentIntensity={1.2} />

        <Suspense fallback={null}>
          {/* Central Living Liquid Mercury Core */}
          <MercuryMind />

          {/* Holo-Glass Portrait Panel */}
          <HoloPortraitPanel position={[2.1, 0.05, 0.1]} />

          {/* Soft Ground Contact Shadows */}
          <ContactShadows
            position={[0, -1.9, 0]}
            opacity={0.35}
            scale={14}
            blur={2.4}
            far={4.0}
            color="#16181C"
          />
        </Suspense>

        {/* Post-Processing Pipeline (Adaptive Tier Fallback) */}
        {enablePost && (
          <EffectComposer multisampling={4}>
            <Bloom
              luminanceThreshold={0.92}
              luminanceSmoothing={0.15}
              intensity={0.45}
              radius={0.65}
            />
            <ChromaticAberration
              offset={new THREE.Vector2(0.0006, 0.0006)}
              radialModulation={true}
              modulationOffset={0.25}
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}

