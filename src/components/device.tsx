'use client';
import { ContactShadows, Environment, Html, OrbitControls } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import Image from 'next/image';
import { Suspense, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Device = () => {
  const glb = useLoader(GLTFLoader, './pokedex.glb');

  return (
    <>
      <Canvas camera={{ fov: 3 }}>
        <mesh>
          <Suspense
            fallback={
              <Html center>
                <Image
                  src="/pokeball.png"
                  alt="Pokeball"
                  className="dark:invert animate-rotate-poke-ball"
                  width={48}
                  height={48}
                  priority
                />
              </Html>
            }
          >
            <primitive object={glb.scene} />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls enablePan={false} enableZoom={false} autoRotateSpeed={5} />
        </mesh>
      </Canvas>
    </>
  );
};

export default Device;
