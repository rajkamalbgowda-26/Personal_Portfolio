"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

export function Hero3DCore() {
  const mountRef = useRef<HTMLDivElement>(null);
  const calmMode = usePortfolioStore((s) => s.calmMode);
  const theme = usePortfolioStore((s) => s.theme);

  useEffect(() => {
    if (calmMode || !mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const isDark = theme === "dark";
    const primaryColor = isDark ? 0x00f3ff : 0x2563eb;
    const secondaryColor = isDark ? 0xa855f7 : 0x7c3aed;
    const coreColor = isDark ? 0x38bdf8 : 0x0284c7;

    // 1. Outer Faceted Wireframe Icosahedron
    const outerGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: isDark ? 0.85 : 0.65,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outerMesh);

    // 2. Inner Glowing Core Sphere
    const innerGeo = new THREE.SphereGeometry(0.9, 32, 32);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: coreColor,
      emissive: isDark ? new THREE.Color(0x00f3ff) : new THREE.Color(0x2563eb),
      emissiveIntensity: isDark ? 0.6 : 0.3,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.9,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // 3. Orbiting Satellite Rings
    const ringGeo = new THREE.TorusGeometry(2.1, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      transparent: true,
      opacity: isDark ? 0.7 : 0.4,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 3;
    scene.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh2.rotation.x = -Math.PI / 4;
    ringMesh2.rotation.y = Math.PI / 6;
    scene.add(ringMesh2);

    // 4. Particle Halo
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: primaryColor,
      size: 0.05,
      transparent: true,
      opacity: isDark ? 0.9 : 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.6 : 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(primaryColor, isDark ? 3.0 : 2.0, 10);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(secondaryColor, isDark ? 2.5 : 1.5, 10);
    pointLight2.position.set(-3, -2, -2);
    scene.add(pointLight2);

    // Mouse Tracking with Spring Damping
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX = (x / rect.width) * 2 - 1;
      mouseY = -(y / rect.height) * 2 + 1;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Render loop
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous base rotation
      outerMesh.rotation.y += 0.006;
      outerMesh.rotation.x += 0.003;

      innerMesh.rotation.y -= 0.004;
      ringMesh1.rotation.z += 0.008;
      ringMesh2.rotation.z -= 0.006;
      particles.rotation.y += 0.002;

      // Pulse scale
      const pulse = 1.0 + Math.sin(elapsedTime * 2.5) * 0.04;
      innerMesh.scale.set(pulse, pulse, pulse);

      // Mouse interactive tilt with spring smoothing
      targetRotY += (mouseX * 0.8 - targetRotY) * 0.05;
      targetRotX += (mouseY * 0.8 - targetRotX) * 0.05;

      scene.rotation.y = targetRotY;
      scene.rotation.x = targetRotX;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [calmMode, theme]);

  if (calmMode) return null;

  return (
    <div
      ref={mountRef}
      className="relative w-full h-full min-h-[260px] flex items-center justify-center cursor-grab active:cursor-grabbing"
    />
  );
}
