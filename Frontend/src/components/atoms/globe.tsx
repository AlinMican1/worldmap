import createGlobe from "cobe";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { GetGeoLocation } from "../../../helper/GetLocation";

interface GlobeUIProps extends HTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;
}

const GlobeUI = ({ width, height }: GlobeUIProps) => {
  const [geoLocation, setGeoLocation] = useState({
    latitude: 37.7595,
    longtitude: -122.4367,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimension, setDimension] = useState({
    widthX: width,
    heightY: height,
  });

  // Fetch geolocation on mount
  useEffect(() => {
    (async () => {
      try {
        const [lat, lng] = await GetGeoLocation(true);
        setGeoLocation({ latitude: lat, longtitude: lng });
      } catch (error) {
        console.error("Failed to get geolocation:", error);
      }
    })();
  }, []);

  // Update dimensions when props change
  useEffect(() => {
    setDimension({
      widthX: width,
      heightY: height,
    });
  }, [width, height]);

  // Initialize globe
  useEffect(() => {
    // Guard clause: ensure canvas ref exists
    if (!canvasRef.current) {
      console.warn("Canvas ref is not available yet");
      return;
    }

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
      markers: [
        {
          location: [geoLocation.latitude, geoLocation.longtitude],
          size: 0.1,
        },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01 * 0.2;
      },
    });

    // Cleanup function
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
