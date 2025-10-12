import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useInView } from 'react-intersection-observer';

interface ParticleFieldProps {
  count: number;
  color?: string;
  size?: number;
  speed?: number;
  density?: number;
}

const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 1000,
  color = '#9D4EDD',
  size = 0.02,
  speed = 0.1,
  density = 20,
}) => {
  const mesh = useRef<THREE.Points>(null);
  const [, inView] = useInView({ threshold: 0.1 });

  // Create particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * density;
      const y = (Math.random() - 0.5) * density;
      const z = (Math.random() - 0.5) * density;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [count, density]);

  useFrame(() => {
    if (!mesh.current || !inView) return;
    
    mesh.current.rotation.x += speed * 0.01;
    mesh.current.rotation.y += speed * 0.005;

    // Create a wave-like motion
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    const time = Date.now() * 0.001;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      
      // Add subtle wave motion
      positions[i + 1] = y + Math.sin(time + x) * 0.02;
      positions[i + 2] = z + Math.cos(time + y) * 0.02;
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={size}
        sizeAttenuation
        color={color}
        transparent
        opacity={0.8}
      />
    </points>
  );
};

export default ParticleField;