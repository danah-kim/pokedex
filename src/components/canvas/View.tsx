'use client';

import {
  ContactShadows,
  Environment,
  type EnvironmentProps,
  OrbitControls,
  type OrbitControlsProps,
} from '@react-three/drei';
import { Canvas, type CanvasProps } from '@react-three/fiber';
import { Suspense } from 'react';

interface ViewProps extends CanvasProps {
  lightColor?: string;
  orbitOptions?: OrbitControlsProps | boolean;
  envOptions?: EnvironmentProps;
}

const View: React.FC<ViewProps> = ({
  children,
  lightColor = '#ffffff',
  orbitOptions,
  envOptions,
  ...props
}) => {
  return (
    <Canvas {...props}>
      <Suspense fallback={null}>
        <group rotation={[0, Math.PI, 0]} position={[0, 1, 0]}>
          {children}
        </group>
        <Environment preset="city" {...envOptions} />
        {typeof orbitOptions !== 'undefined' ? (
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 2.2}
            maxPolarAngle={Math.PI / 2.2}
            {...(typeof orbitOptions === 'boolean' ? null : orbitOptions)}
          />
        ) : null}
        <Suspense fallback={null}>
          <pointLight color={lightColor} position={[-5, 4, -15]} intensity={1.5} />
          <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
        </Suspense>
      </Suspense>
    </Canvas>
  );
};

export default View;
