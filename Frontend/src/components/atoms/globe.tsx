// "use client";

// import React, { useRef, useState } from "react";
// import { Canvas, useFrame, ThreeElements, useLoader } from "@react-three/fiber";
// import * as THREE from "three";

// const Globe: React.FC<ThreeElements["mesh"]> = (props) => {
//   const meshRef = useRef<THREE.Mesh>(null!);

//   const [hovered, setHover] = useState(false);
//   const [active, setActive] = useState(false);
//   const texture = useLoader(THREE.TextureLoader, "/worldmap.jpg");

//   useFrame((_, delta) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.y += delta * 0.1;
//       meshRef.current.rotation.x = (0 * Math.PI) / 180;
//     }
//   });

//   return (
//     <mesh
//       {...props}
//       ref={meshRef}
//       rotation={[Math.PI / 6, Math.PI / 1, 0]} // tilted axis
//       scale={active ? 2 : 1}
//       onClick={() => setActive(!active)}
//       onPointerOver={() => setHover(true)}
//       onPointerOut={() => setHover(false)}
//     >
//       <sphereGeometry args={[2.5, 64, 64]} />
//       <meshPhysicalMaterial
//         map={texture}
//         roughness={1}
//         metalness={0}
//         color={"white"}
//         clearcoat={1} // glossy layer for edge highlights
//         clearcoatRoughness={1} // smooth highlight
//       />
//     </mesh>
//   );
// };

// const GlobeUI = () => (
//   <Canvas>
//     <ambientLight intensity={0.3} /> {/* soft base light */}
//     <directionalLight position={[5, 5, 5]} intensity={1} />
//     <Globe position={[0, 0, 0]} />
//   </Canvas>
// );

// export default GlobeUI;

import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";

const GlobeUI = () => {
  const canvasRef = useRef<any>("");
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    // Run only on client
    setSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 68000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      offset: [0, 0],
      markers: [
        // longitude latitude
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.01 * 0.1;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);
  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          width: size.width - 500,
          height: size.height,
          maxWidth: "100%",
          aspectRatio: 1,
        }}
      />
    </div>
  );
};
export default GlobeUI;
