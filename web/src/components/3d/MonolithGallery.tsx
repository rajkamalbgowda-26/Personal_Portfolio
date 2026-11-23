"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import { Project } from "@/lib/api-client";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

interface MonolithGalleryProps {
  projects: Project[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
}

// Pre-create shared geometries to prevent GPU thrashing
const SLAB_GEO = new THREE.BoxGeometry(2.0, 2.8, 0.14);
const COVER_GEO = new THREE.PlaneGeometry(1.82, 1.82);
const EDGE_GEO = new THREE.EdgesGeometry(SLAB_GEO);

function MonolithCard({
  project,
  index,
  selectedIndex,
  onActivate,
}: {
  project: Project;
  index: number;
  selectedIndex: number;
  total?: number;
  onActivate: () => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const calmMode = usePortfolioStore((s) => s.calmMode);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  // Non-suspending texture loader to guarantee immediate rendering
  useEffect(() => {
    let active = true;
    const loader = new THREE.TextureLoader();
    const coverUrl = project.cover_image || "/assets/generated/project-hyperion.png";
    loader.load(
      coverUrl,
      (tex) => {
        if (!active) return;
        tex.colorSpace = THREE.SRGBColorSpace;
        setTexture(tex);
      },
      undefined,
      () => {}
    );
    return () => {
      active = false;
    };
  }, [project.cover_image]);

  // Calculate curved circular carousel angle
  const offset = index - selectedIndex;
  const angle = offset * 0.42; // radians between monoliths
  const radius = 5.2;

  const targetX = Math.sin(angle) * radius;
  const targetZ = -Math.cos(angle) * radius + radius;
  const targetRotY = -angle;
  const isSelected = index === selectedIndex;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    // Smooth lerp to target curved carousel position
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.1);

    if (!calmMode) {
      meshRef.current.position.y = (isSelected ? 0.2 : 0) + Math.sin(t * 1.5 + index) * 0.04;
    }
  });

  const scale = isSelected ? 1.08 : 0.88;

  return (
    <group
      ref={meshRef}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        onActivate();
      }}
      position={[targetX, 0, targetZ]}
    >
      {/* 1. Holo-Glass Slab (Transmission + Refraction) */}
      <mesh castShadow receiveShadow geometry={SLAB_GEO}>
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.88}
          roughness={0.12}
          thickness={0.8}
          ior={1.48}
          transparent
          opacity={0.88}
          clearcoat={1.0}
        />
      </mesh>

      {/* 2. Refracted Project Cover Panel */}
      <mesh position={[0, 0.25, 0.08]} geometry={COVER_GEO}>
        {texture ? (
          <meshStandardMaterial
            map={texture}
            roughness={0.18}
            metalness={0.15}
          />
        ) : (
          <meshStandardMaterial
            color="#C9CDD3"
            roughness={0.3}
            metalness={0.5}
          />
        )}
      </mesh>

      {/* 3. Holographic 1px Rim Accent */}
      <lineSegments geometry={EDGE_GEO}>
        <lineBasicMaterial
          color={isSelected ? "#9FE7F5" : "#C9CDD3"}
          transparent
          opacity={isSelected ? 0.9 : 0.5}
        />
      </lineSegments>
    </group>
  );
}

export function MonolithGallery({
  projects,
  selectedIndex,
  onSelectIndex,
}: MonolithGalleryProps) {
  const router = useRouter();
  const qualityTier = usePortfolioStore((s) => s.qualityTier);
  const calmMode = usePortfolioStore((s) => s.calmMode);

  const [isExpanding, setIsExpanding] = useState(false);
  const dragStartX = useRef<number | null>(null);

  const handleActivate = React.useCallback((proj: Project) => {
    setIsExpanding(true);
    setTimeout(() => {
      router.push(`/projects/${proj.slug}`);
    }, 400);
  }, [router]);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        onSelectIndex((selectedIndex + 1) % projects.length);
      } else if (e.key === "ArrowLeft") {
        onSelectIndex((selectedIndex - 1 + projects.length) % projects.length);
      } else if (e.key === "Enter") {
        if (projects[selectedIndex]) {
          handleActivate(projects[selectedIndex]);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, projects, onSelectIndex, handleActivate]);

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        onSelectIndex((selectedIndex - 1 + projects.length) % projects.length);
      } else {
        onSelectIndex((selectedIndex + 1) % projects.length);
      }
    }
    dragStartX.current = null;
  };

  const dpr = qualityTier === "high" ? 2 : qualityTier === "medium" ? 1.5 : 1;

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className={`w-full h-[360px] md:h-[420px] lg:h-[460px] relative rounded-2xl overflow-hidden bg-pearl/40 border border-silver-100 shadow-atelier-card select-none cursor-grab active:cursor-grabbing transition-transform duration-500 ${
        isExpanding ? "scale-105 opacity-90" : ""
      }`}
    >
      <Canvas
        camera={{ position: [0, 0.4, 4.4], fov: 45 }}
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
        <directionalLight position={[-6, 4, -2]} intensity={0.6} color="#EEF0F3" />
        <pointLight position={[0, -1, 3]} intensity={0.8} color="#9FE7F5" />

        <React.Suspense fallback={null}>
          <Environment preset="studio" />
          <group position={[0, -0.1, 0]}>
            {projects.map((proj, idx) => (
              <MonolithCard
                key={proj.slug}
                project={proj}
                index={idx}
                selectedIndex={selectedIndex}
                total={projects.length}
                onActivate={() => {
                  if (idx === selectedIndex) {
                    handleActivate(proj);
                  } else {
                    onSelectIndex(idx);
                  }
                }}
              />
            ))}
          </group>

          <ContactShadows
            position={[0, -1.8, 0]}
            opacity={0.35}
            scale={14}
            blur={2.5}
            far={4.0}
            color="#16181C"
          />
        </React.Suspense>
      </Canvas>

      {/* Floating System Annotations */}
      <div className="absolute top-4 left-6 pointer-events-none">
        <span className="sys-annotation text-graphite-900 font-bold block">
          MONOLITH GALLERY // CURVED 3D CAROUSEL
        </span>
        <span className="font-mono text-[10px] text-graphite-600">
          DRAG • WHEEL • ARROW KEYS • CLICK TO EXPAND CASE STUDY
        </span>
      </div>

      <div className="absolute top-4 right-6 pointer-events-none font-mono text-xs text-graphite-900 font-bold">
        0{selectedIndex + 1} / 0{projects.length}
      </div>
    </div>
  );
}
