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
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { GetGeoLocation } from "../../../helper/GetLocation";
import { GetGeoInfo } from "../../../helper/GetLocation";
interface GlobeUIProps extends HTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;
}

const GlobeUI = ({ width, height }: GlobeUIProps) => {
  const [geoLocation, setGeoLocation] = useState({
    latitude: 37.7595,
    longtitude: -122.4367,
  });
  console.log(geoLocation.latitude, geoLocation.longtitude);
  useEffect(() => {
    (async () => {
      const [lat, lng] = await GetGeoLocation(true);
      setGeoLocation({ latitude: lat, longtitude: lng });
    })();
  }, []);

  const canvasRef = useRef<any>("");
  const [dimension, setDimension] = useState({
    widthX: width,
    heightY: height,
  });

  useEffect(() => {
    setDimension({
      widthX: width,
      heightY: height,
    });
  }, [width, height]);
  useEffect(() => {
    setDimension({
      widthX: width,
      heightY: height,
    });
  }, [width, height]);
  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 900 * 2,
      height: 900 * 2,
      phi: 0,
      theta: 0,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 68000,
      mapBrightness: 6,
      baseColor: [0.1, 0.2, 0.7],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      offset: [dimension.widthX * 0.05, dimension.heightY * 1.3],
      markers: [{ location: [geoLocation.latitude, geoLocation.longtitude], size: 0.1 }],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.01 * 0.2;
      },
    });

    return () => {
      globe.destroy();
    };
  }, [geoLocation, dimension]);
  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100vw",
        height: "100vh",
        maxWidth: "100%",
        aspectRatio: 1,
      }}
    />
  );
};
export default GlobeUI;
