'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
  const group = useRef<THREE.Group<THREE.Object3DEventMap> | null>(null);
  const { nodes, materials } = useGLTF('/pokedex.glb') as GLTFDevice;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        Math.cos(t / 2) / 20 - 0.2,
        0.1,
      );
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        Math.sin(t / 4) / 20,
        0.1,
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        Math.sin(t / 8) / 20,
        0.1,
      );
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        (-2 + Math.sin(t / 2)) / 2,
        0.1,
      );
    }
  });

  return (
    <group {...props} ref={group} dispose={null}>
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
        />
      </group>
    </group>
  );
};

export default Device;
