import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '@/stores/scrollStore';

const PARTICLE_COUNT = 60;

/**
 * Celebration particle system that activates on the final delivery step (step 7).
 * Particles burst outward from center when the package reaches its destination.
 */
const ParticleSystem = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);

    const celebrationColors = [
      new THREE.Color('#F97316'), // orange
      new THREE.Color('#FFB347'), // light orange
      new THREE.Color('#FF6B35'), // dark orange
      new THREE.Color('#FCD34D'), // yellow
      new THREE.Color('#FFFFFF'), // white
      new THREE.Color('#60A5FA'), // blue accent
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Start at center
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      // Random velocity direction (burst)
      const angle = Math.random() * Math.PI * 2;
      const elevation = (Math.random() - 0.5) * Math.PI;
      const speed = 0.02 + Math.random() * 0.04;
      velocities[i * 3] = Math.cos(angle) * Math.cos(elevation) * speed;
      velocities[i * 3 + 1] = Math.sin(elevation) * speed + 0.01; // slight upward bias
      velocities[i * 3 + 2] = Math.sin(angle) * Math.cos(elevation) * speed;

      // Random celebration color
      const color = celebrationColors[Math.floor(Math.random() * celebrationColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = 0.03 + Math.random() * 0.05;
    }

    velocitiesRef.current = velocities;

    return { positions, colors, sizes };
  }, []);

  useFrame(() => {
    if (!pointsRef.current || !velocitiesRef.current) return;

    const { activeStep, stepProgress } = useScrollStore.getState();
    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
    const sizeAttr = geometry.getAttribute('size') as THREE.BufferAttribute;

    // Animate on the final delivery step (index 6 or 7) during the celebration phase
    const isActive = (activeStep === 6 || activeStep === 7) && stepProgress > 0.35;

    if (!isActive) {
      // Reset particles to center and hide
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        posAttr.setXYZ(i, 0, 0, 0);
        sizeAttr.setX(i, 0);
      }
      posAttr.needsUpdate = true;
      sizeAttr.needsUpdate = true;
      pointsRef.current.visible = false;
      return;
    }

    pointsRef.current.visible = true;

    // Progress within the celebration phase (0→1)
    const celebProgress = Math.min((stepProgress - 0.35) / 0.3, 1);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const vx = velocitiesRef.current[i * 3];
      const vy = velocitiesRef.current[i * 3 + 1];
      const vz = velocitiesRef.current[i * 3 + 2];

      // Particles expand outward based on progress
      const px = vx * celebProgress * 60;
      const py = vy * celebProgress * 60 - celebProgress * celebProgress * 0.5; // gravity
      const pz = vz * celebProgress * 60;

      posAttr.setXYZ(i, px, py, pz);

      // Fade out toward end
      const fadeOut = celebProgress > 0.7 ? 1 - (celebProgress - 0.7) / 0.3 : 1;
      sizeAttr.setX(i, sizes[i] * fadeOut);
    }

    posAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} visible={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={PARTICLE_COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.9}
        size={0.08}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default ParticleSystem;
