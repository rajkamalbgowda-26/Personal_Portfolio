"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { HoloPortraitShader } from "@/shaders/holoPortraitShader";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

interface HoloPortraitPanelProps {
  position?: [number, number, number];
  scrollProgress?: number;
}

export function HoloPortraitPanel({
  position = [2.4, 0.1, 0.2],
}: HoloPortraitPanelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const shaderMatRef = useRef<THREE.ShaderMaterial>(null);
  const calmMode = usePortfolioStore((s) => s.calmMode);

  // Load portrait texture
  const texture = useLoader(THREE.TextureLoader, "/assets/portrait/hero-portrait.png");

  useEffect(() => {
    if (texture) {
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
    }
  }, [texture]);

  // Shader Material instance
  const shaderMaterial = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      vertexShader: HoloPortraitShader.vertexShader,
      fragmentShader: HoloPortraitShader.fragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uDissolve: { value: 0 },
        uAspect: { value: 3 / 4 },
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    return mat;
  }, [texture]);

  // Scroll dissolution tracking
  const scrollDissolve = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      // Dissolves between 0% and 80% of first viewport height
      const progress = Math.min(Math.max(scrollY / (vh * 0.8), 0), 1);
      scrollDissolve.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (shaderMatRef.current) {
      shaderMatRef.current.uniforms.uTime.value = t;
      shaderMatRef.current.uniforms.uDissolve.value = scrollDissolve.current;

      // Mouse normalized in UV space
      const mouseX = (state.pointer.x + 1) * 0.5;
      const mouseY = (state.pointer.y + 1) * 0.5;
      shaderMatRef.current.uniforms.uMouse.value.set(mouseX, mouseY);
    }

    if (meshRef.current && !calmMode) {
      // Gentle floating plinth sway
      meshRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.04;
      meshRef.current.rotation.y = -0.15 + state.pointer.x * 0.05;
      meshRef.current.rotation.x = state.pointer.y * 0.04;
    }
  });

  return (
    <group position={position}>
      {/* Holo-Glass Backdrop Plinth */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[2.0, 2.7]} />
        <meshPhysicalMaterial
          color="#EEF0F3"
          transmission={0.88}
          roughness={0.12}
          thickness={0.5}
          ior={1.4}
          metalness={0.1}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Main Shader Portrait Surface */}
      <mesh ref={meshRef} castShadow>
        <planeGeometry args={[1.9, 2.6, 48, 48]} />
        <primitive object={shaderMaterial} ref={shaderMatRef} attach="material" />
      </mesh>

      {/* Subtle 1px Chrome Rim Frame */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(1.92, 2.62)]} />
        <lineBasicMaterial color="#C9CDD3" transparent opacity={0.7} />
      </lineSegments>

      {/* Floating System Annotation on the Holo-Glass corner */}
      <group position={[0, -1.45, 0.02]}>
        <mesh>
          <planeGeometry args={[1.9, 0.18]} />
          <meshBasicMaterial color="#F7F8FA" transparent opacity={0.8} />
        </mesh>
      </group>
    </group>
  );
}

