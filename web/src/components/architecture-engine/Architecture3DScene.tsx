"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Text } from "@react-three/drei";
import * as THREE from "three";
import { Architecture, ArchitectureNode, RequestFlowStep } from "@/lib/api-client";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

interface Architecture3DSceneProps {
  architecture: Architecture;
  mode: "orbit" | "exploded";
  activeStep: RequestFlowStep | null;
  selectedNode: ArchitectureNode | null;
  onSelectNode: (node: ArchitectureNode) => void;
  overlay: "none" | "latency" | "cost" | "security";
}

const LAYER_ORDER = [
  "Client",
  "Gateway",
  "Orchestration",
  "Agents",
  "Models",
  "Data",
  "Observability",
  "Infra",
];

export function Architecture3DScene({
  architecture,
  mode,
  activeStep,
  selectedNode,
  onSelectNode,
  overlay,
}: Architecture3DSceneProps) {
  const qualityTier = usePortfolioStore((s) => s.qualityTier);
  const calmMode = usePortfolioStore((s) => s.calmMode);

  const nodes = useMemo(() => architecture.nodes || [], [architecture.nodes]);

  // Compute 3D node positions based on mode
  const nodePositions = useMemo(() => {
    const map = new Map<string, THREE.Vector3>();

    nodes.forEach((node, idx) => {
      const layerIdx = LAYER_ORDER.indexOf(node.layer);
      const safeLayer = layerIdx !== -1 ? layerIdx : 3;

      if (mode === "exploded") {
        // Vertical stacked tiers
        const y = (safeLayer - 3.5) * 0.9;
        const angle = (idx / nodes.length) * Math.PI * 2;
        const x = Math.cos(angle) * 1.8;
        const z = Math.sin(angle) * 1.8;
        map.set(node.id, new THREE.Vector3(x, y, z));
      } else {
        // Spatial 3D orbit layout
        const angle = (idx / nodes.length) * Math.PI * 2;
        const r = 2.4;
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;
        const y = Math.sin(idx * 1.5) * 0.4;
        map.set(node.id, new THREE.Vector3(x, y, z));
      }
    });

    return map;
  }, [nodes, mode]);

  // Active Data Packet travel along current request step
  const packetRef = useRef<THREE.Mesh>(null);
  const packetProgress = useRef(0);

  useFrame((state, delta) => {
    if (!packetRef.current || !activeStep) return;

    const sourcePos = nodePositions.get(nodes[activeStep.step % nodes.length]?.id) || new THREE.Vector3(0, 0, 0);
    const targetPos = nodePositions.get(nodes[(activeStep.step + 1) % nodes.length]?.id) || new THREE.Vector3(1, 0, 0);

    packetProgress.current = (packetProgress.current + delta * 1.2) % 1.0;
    packetRef.current.position.lerpVectors(sourcePos, targetPos, packetProgress.current);
  });

  const dpr = qualityTier === "high" ? 2 : qualityTier === "medium" ? 1.5 : 1;

  return (
    <div className="w-full h-[540px] md:h-[640px] relative rounded-2xl overflow-hidden bg-pearl/40 border border-silver-100 shadow-atelier-card">
      <Canvas
        camera={{ position: [0, mode === "exploded" ? 3.5 : 2.5, 6.2], fov: 42 }}
        dpr={dpr}
        shadows={!calmMode}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[6, 9, 5]} intensity={2.2} castShadow={!calmMode} />
        <directionalLight position={[-6, 4, -2]} intensity={0.7} color="#EEF0F3" />
        <pointLight position={[0, 0, 2]} intensity={1.0} color="#9FE7F5" />

        <Environment preset="studio" />

        {/* Exploded Layer Planes */}
        {mode === "exploded" &&
          LAYER_ORDER.slice(0, 6).map((layer, lIdx) => {
            const y = (lIdx - 3.5) * 0.9;
            return (
              <mesh key={layer} position={[0, y - 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[5.2, 5.2]} />
                <meshPhysicalMaterial
                  color="#F7F8FA"
                  transmission={0.88}
                  roughness={0.15}
                  transparent
                  opacity={0.35}
                />
              </mesh>
            );
          })}

        {/* Nodes */}
        {nodes.map((node) => {
          const pos = nodePositions.get(node.id) || new THREE.Vector3(0, 0, 0);
          const isSelected = selectedNode?.id === node.id;

          // Color customization by overlay mode
          let nodeColor = isSelected ? "#9FE7F5" : "#E4E7EB";
          if (overlay === "security") nodeColor = "#C9B8FF";
          else if (overlay === "cost") nodeColor = "#10B981";
          else if (overlay === "latency") nodeColor = "#2F6BFF";

          return (
            <group key={node.id} position={pos}>
              {/* Chrome/Glass Object */}
              <mesh
                scale={isSelected ? 1.25 : 1.0}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectNode(node);
                }}
                castShadow
              >
                <boxGeometry args={[0.75, 0.75, 0.75]} />
                <meshPhysicalMaterial
                  color={nodeColor}
                  metalness={0.94}
                  roughness={isSelected ? 0.05 : 0.15}
                  clearcoat={1.0}
                  clearcoatRoughness={0.05}
                  iridescence={isSelected ? 1.0 : 0.4}
                />
              </mesh>

              {/* Node Labels */}
              <Text
                position={[0, -0.6, 0]}
                fontSize={0.12}
                color="#16181C"
                anchorX="center"
                anchorY="middle"
                maxWidth={1.4}
              >
                {node.label.toUpperCase()}
              </Text>
            </group>
          );
        })}

        {/* Animated Active Data Packet */}
        <mesh ref={packetRef} scale={0.18}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#2F6BFF" />
        </mesh>

        <ContactShadows
          position={[0, -2.4, 0]}
          opacity={0.35}
          scale={14}
          blur={2.5}
          far={4.0}
          color="#16181C"
        />
      </Canvas>

      {/* Mode Status Pill */}
      <div className="absolute top-4 left-6 pointer-events-none">
        <span className="sys-annotation text-graphite-900 font-bold block">
          ARCHITECTURE ENGINE // {mode.toUpperCase()} VIEW
        </span>
        <span className="font-mono text-[10px] text-graphite-600">
          OVERLAY: {overlay.toUpperCase()} • CLICK ANY NODE TO INSPECT CONTRACTS
        </span>
      </div>
    </div>
  );
}
