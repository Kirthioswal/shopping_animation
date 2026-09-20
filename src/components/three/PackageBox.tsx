import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollStore } from '@/stores/scrollStore';
import logoTexture from '@/assets/logo.png';

/**
 * 3D cardboard box that animates based on scroll state.
 * Hidden during hero section (per user requirement) and enters when scrolling starts.
 */
const PackageBox = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Load the Jiffy logo for one face of the box
  const logo = useTexture(logoTexture);

  // Create cardboard-colored materials for each face
  const materials = useMemo(() => {
    const cardboardColor = new THREE.Color('#c4956a');
    const tapeColor = new THREE.Color('#d4a574');

    const baseMaterial = new THREE.MeshStandardMaterial({
      color: cardboardColor,
      roughness: 0.85,
      metalness: 0.0,
    });

    const tapeMaterial = new THREE.MeshStandardMaterial({
      color: tapeColor,
      roughness: 0.7,
      metalness: 0.05,
    });

    const logoMaterial = new THREE.MeshStandardMaterial({
      map: logo,
      roughness: 0.8,
      metalness: 0.0,
      transparent: true,
    });

    // 6 faces: +X, -X, +Y, -Y, +Z (front/logo), -Z
    return [
      baseMaterial,   // right
      baseMaterial,   // left
      tapeMaterial,   // top (tape strip)
      baseMaterial,   // bottom
      logoMaterial,   // front (logo face)
      baseMaterial,   // back
    ];
  }, [logo]);

  useFrame(() => {
    if (!meshRef.current) return;

    // The unified DeliveryPackage in DOM handles the 7-step journey with consistent design and e-commerce UI
    meshRef.current.visible = false;
    return;

    // Direction alternates: even steps L→R, odd steps R→L
    const isLeftToRight = activeStep % 2 === 0;
    const offscreenX = 6; // How far offscreen
    const p = stepProgress;

    let x: number;
    let scale: number;

    // Animation phases for journey steps:
    // 0.00 → 0.15: Enter from side
    // 0.15 → 0.40: Scale up
    // 0.40 → 0.60: Hold at center
    // 0.60 → 0.85: Scale down
    // 0.85 → 1.00: Exit to opposite side

    if (p < 0.15) {
      // Enter phase
      const t = p / 0.15;
      const easedT = t * t * (3 - 2 * t); // smoothstep
      if (isLeftToRight) {
        x = THREE.MathUtils.lerp(-offscreenX, 0, easedT);
      } else {
        x = THREE.MathUtils.lerp(offscreenX, 0, easedT);
      }
      scale = THREE.MathUtils.lerp(0.2, 0.4, easedT);
    } else if (p < 0.40) {
      // Scale up phase
      const t = (p - 0.15) / 0.25;
      const easedT = t * t * (3 - 2 * t);
      x = 0;
      scale = THREE.MathUtils.lerp(0.4, 1.5, easedT);
    } else if (p < 0.60) {
      // Hold at center
      x = 0;
      scale = 1.5;
    } else if (p < 0.85) {
      // Scale down phase
      const t = (p - 0.60) / 0.25;
      const easedT = t * t * (3 - 2 * t);
      x = 0;
      scale = THREE.MathUtils.lerp(1.5, 0.4, easedT);
    } else {
      // Exit phase
      const t = (p - 0.85) / 0.15;
      const easedT = t * t * (3 - 2 * t);
      if (isLeftToRight) {
        x = THREE.MathUtils.lerp(0, offscreenX, easedT);
      } else {
        x = THREE.MathUtils.lerp(0, -offscreenX, easedT);
      }
      scale = THREE.MathUtils.lerp(0.4, 0.2, easedT);
    }

    // Subtle continuous rotation
    const rotY = p * Math.PI * 0.5 + activeStep * Math.PI * 0.25;
    const rotZ = Math.sin(p * Math.PI * 2) * 0.08;

    meshRef.current.position.x = x;
    meshRef.current.position.y = Math.sin(p * Math.PI) * 0.15; // slight arc
    meshRef.current.scale.setScalar(scale);
    meshRef.current.rotation.y = rotY;
    meshRef.current.rotation.z = rotZ;
    meshRef.current.visible = true;
  });

  return (
    <RoundedBox
      ref={meshRef}
      args={[1.4, 1, 1]}
      radius={0.05}
      smoothness={4}
      material={materials}
    >
      {/* Materials are applied via the material prop array */}
    </RoundedBox>
  );
};

export default PackageBox;
