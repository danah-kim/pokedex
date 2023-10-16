'use client';

import { Html, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

import useThemeStore from '@/stores/themeStore';
import { pokemonHtml, pokemonModalHtml, pokemonsHtml } from '@/utils/tunner';

type GLTFDevice = GLTF & {
  nodes: {
    group2polySurface92_Udim0001_0: THREE.Mesh;
    polySurface44_Udim0002_0: THREE.Mesh;
    pSphere12_Udim0003_0: THREE.Mesh;
    group2polySurface82_Udim0004_0: THREE.Mesh;
    polySurface85_Udim0005_0: THREE.Mesh;
  };
  materials: {
    Udim0001: THREE.MeshPhysicalMaterial;
    Udim0002: THREE.MeshPhysicalMaterial;
    Udim0003: THREE.MeshStandardMaterial;
    Udim0004: THREE.MeshPhysicalMaterial;
    Udim0005: THREE.MeshPhysicalMaterial;
  };
};

const Device = (props: JSX.IntrinsicElements['group']) => {
  const groupRef = useRef<THREE.Group<THREE.Object3DEventMap> | null>(null);
  const glassBallRef = useRef<THREE.Mesh | null>(null);

  const { nodes, materials } = useGLTF('/assets/models/pokedex.glb') as GLTFDevice;
  const { setHovered, changeSpaceTheme } = useThemeStore();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        Math.cos(t / 2) / 20 - 0.2,
        0.1,
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        Math.sin(t / 4) / 20,
        0.1,
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        Math.sin(t / 8) / 20,
        0.1,
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        (-2 + Math.sin(t / 2)) / 2,
        0.1,
      );
    }
  });

  return (
    <group {...props} ref={groupRef} dispose={null}>
      <group scale={0.5}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.group2polySurface92_Udim0001_0.geometry}
          material={materials.Udim0001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.polySurface44_Udim0002_0.geometry}
          material={materials.Udim0002}
        />
        <mesh
          ref={glassBallRef}
          castShadow
          receiveShadow
          geometry={nodes.pSphere12_Udim0003_0.geometry}
          material={materials.Udim0003}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.group2polySurface82_Udim0004_0.geometry}
          material={materials.Udim0004}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.polySurface85_Udim0005_0.geometry}
          material={materials.Udim0005}
        >
          <Html className="content" position={[-4.67, 1.88, -0.44]} transform occlude>
            <pokemonsHtml.Out />
            <pokemonModalHtml.Out />
          </Html>
          <Html className="content" position={[5.31, 2.82, -0.514]} transform occlude>
            <pokemonHtml.Out />
          </Html>
        </mesh>
      </group>
      <group>
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => changeSpaceTheme()}
          position={[-3.75, 3.55, 0.1]}
        >
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshPhysicalMaterial
            color="#459bf1"
            clearcoat={1}
            clearcoatRoughness={0}
            roughness={0}
            metalness={0.5}
          />
        </mesh>
      </group>
    </group>
  );
};

export default Device;
