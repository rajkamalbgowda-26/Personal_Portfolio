"use client";

import React, { useRef, useMemo, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

interface MercuryMindProps {
  onShockwave?: () => void;
}

export function MercuryMind({ onShockwave }: MercuryMindProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const calmMode = usePortfolioStore((s) => s.calmMode);
  const qualityTier = usePortfolioStore((s) => s.qualityTier);

  const { pointer } = useThree();

  // Morph state tracking: 0 = Neural Lattice, 1 = Agent Graph, 2 = Sphere
  const morphProgress = useRef(0);
  const shockwaveTime = useRef(0);
  const [isShockwaveActive, setIsShockwaveActive] = useState(false);

  // Particles setup for click shockwave
  const PARTICLE_COUNT = qualityTier === "high" ? 180 : 80;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particleVelocities = useMemo(() => {
    const vels: THREE.Vector3[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize().multiplyScalar(1.5 + Math.random() * 2.0);
      vels.push(v);
    }
    return vels;
  }, [PARTICLE_COUNT]);

  const particlePositions = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => new THREE.Vector3());
  }, [PARTICLE_COUNT]);

  // Custom Shader Uniforms for Physical Mercury Material
  const customUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uShockwave: { value: 0 },
    }),
    []
  );

  // Modify Three's MeshPhysicalMaterial via onBeforeCompile
  const handleBeforeCompile = (shader: THREE.WebGLProgramParametersWithUniforms) => {
    shader.uniforms.uTime = customUniforms.uTime;
    shader.uniforms.uMorph = customUniforms.uMorph;
    shader.uniforms.uMouse = customUniforms.uMouse;
    shader.uniforms.uShockwave = customUniforms.uShockwave;

    shader.vertexShader = `
      uniform float uTime;
      uniform float uMorph;
      uniform vec2 uMouse;
      uniform float uShockwave;

      // Simplex noise 3D implementation
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3  ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.zzzz);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      ${shader.vertexShader}
    `;

    // Inject displacement logic right before object coordinate transformation
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `
      #include <begin_vertex>

      // 1. Morph states:
      // uMorph 0.0 -> 1.0 (Lattice to Agent Graph)
      // uMorph 1.0 -> 2.0 (Agent Graph to Sphere)
      // uMorph 2.0 -> 3.0 (Sphere back to Lattice)

      float state = mod(uMorph, 3.0);
      float dLattice = snoise(transformed * 1.8 + vec3(0.0, uTime * 0.4, 0.0)) * 0.35;
      dLattice += snoise(transformed * 3.6 - vec3(uTime * 0.2)) * 0.15;

      float dGraph = sin(transformed.x * 6.0) * cos(transformed.y * 6.0) * sin(transformed.z * 6.0) * 0.28;
      float dSphere = sin(uTime * 1.5 + transformed.y * 2.0) * 0.03; // gentle fluid breathing

      float displacement = 0.0;
      if (state < 1.0) {
        displacement = mix(dLattice, dGraph, smoothstep(0.0, 1.0, state));
      } else if (state < 2.0) {
        displacement = mix(dGraph, dSphere, smoothstep(1.0, 2.0, state));
      } else {
        displacement = mix(dSphere, dLattice, smoothstep(2.0, 3.0, state));
      }

      // 2. Cursor Proximity Surface Ripple
      vec3 normPos = normalize(transformed);
      vec2 sphereUV = vec2(normPos.x, normPos.y);
      float mouseDist = length(sphereUV - uMouse);
      float mouseRipple = sin(mouseDist * 20.0 - uTime * 6.0) * exp(-mouseDist * 3.5) * 0.12;
      displacement += mouseRipple;

      // 3. Click Shockwave
      if (uShockwave > 0.001) {
        float wave = sin(length(transformed) * 12.0 - uShockwave * 18.0) * exp(-uShockwave * 2.8) * 0.25;
        displacement += wave;
      }

      transformed += normal * displacement;
      `
    );
  };

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    customUniforms.uTime.value = t;

    // Advance morphing state smoothly
    if (!calmMode) {
      morphProgress.current += delta * 0.18; // Complete cycle every ~16 seconds
      customUniforms.uMorph.value = morphProgress.current;

      // Soft mouse lerp
      customUniforms.uMouse.value.lerp(pointer, 0.1);

      // Core rotation
      if (meshRef.current) {
        meshRef.current.rotation.y = t * 0.15 + pointer.x * 0.3;
        meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.08 + pointer.y * 0.2;
      }
    }

    // Shockwave animation
    if (isShockwaveActive) {
      shockwaveTime.current += delta;
      customUniforms.uShockwave.value = shockwaveTime.current;

      // Animate shockwave silver particles
      if (particlesRef.current) {
        const decay = Math.max(0, 1 - shockwaveTime.current * 0.85);
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const pos = particlePositions[i];
          const vel = particleVelocities[i];
          pos.addScaledVector(vel, delta);
          dummy.position.copy(pos);
          dummy.scale.setScalar(0.04 * decay);
          dummy.updateMatrix();
          particlesRef.current.setMatrixAt(i, dummy.matrix);
        }
        particlesRef.current.instanceMatrix.needsUpdate = true;
      }

      if (shockwaveTime.current > 1.4) {
        setIsShockwaveActive(false);
        shockwaveTime.current = 0;
        customUniforms.uShockwave.value = 0;
      }
    }
  });

  const handleClick = () => {
    setIsShockwaveActive(true);
    shockwaveTime.current = 0;
    // Reset particles to origin
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particlePositions[i].set(0, 0, 0);
    }
    if (onShockwave) onShockwave();
  };

  const segments = qualityTier === "high" ? 72 : 48;

  return (
    <group position={[-0.4, 0.1, 0]}>
      {/* Central Living Liquid Mercury Mesh */}
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onClick={handleClick}
        scale={calmMode ? 1.45 : 1.55}
      >
        <sphereGeometry args={[1, segments, segments]} />
        <meshPhysicalMaterial
          color="#F7F8FA"
          metalness={1.0}
          roughness={0.08}
          clearcoat={1.0}
          clearcoatRoughness={0.04}
          reflectivity={1.0}
          onBeforeCompile={handleBeforeCompile}
        />
      </mesh>

      {/* Instanced Shockwave Silver Droplets */}
      <instancedMesh
        ref={particlesRef}
        args={[undefined, undefined, PARTICLE_COUNT]}
        visible={isShockwaveActive}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          metalness={1.0}
          roughness={0.05}
          clearcoat={1.0}
        />
      </instancedMesh>
    </group>
  );
}

