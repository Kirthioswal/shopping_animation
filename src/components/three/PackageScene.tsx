import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import PackageBox from './PackageBox';
import ParticleSystem from './ParticleSystem';

/**
 * Fixed-position Three.js canvas that overlays the entire page.
 * Contains the 3D package box and celebration particle system.
 * Uses orthographic camera for precise viewport-percentage sizing.
 * pointer-events-none ensures scroll events pass through to the DOM.
 */
const PackageScene = () => {
  return (
    <div
      className="fixed inset-0 z-30 pointer-events-none"
      style={{ width: '100vw', height: '100vh' }}
    >
      <Canvas
        orthographic
        camera={{ zoom: 100, position: [0, 0, 5], near: 0.1, far: 100 }}
        frameloop="always"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.8}
          color="#FFB347"
          castShadow={false}
        />
        <directionalLight
          position={[-3, 2, 4]}
          intensity={0.3}
          color="#FFFFFF"
        />

        <Suspense fallback={null}>
          <PackageBox />
          <ParticleSystem />
          <Environment preset="studio" environmentIntensity={0.3} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default PackageScene;
