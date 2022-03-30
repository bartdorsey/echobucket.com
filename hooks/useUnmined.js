import { useRef, useEffect } from 'react';
import Unmined from "../lib/Unmined"

const markerDefaults = {
  imageScale: 0.25,
  imageAnchor: [0.5, 0.75],
  textColor: "white",
  offsetX: 0,
  offsetY: 20,
  font: "bold 1rem minecraftfont",
}

const markers = [
  {
    x: 9,
    z: 34,
    image: "/images/spawn.gif",
    text: "Spawn",
    ...markerDefaults
  },
  {
    x: 118,
    z: 85,
    image: "/images/custom.pin.png",
    text: "Spawn Village",
    ...markerDefaults
  }, {
    x: 735,
    z: -223,
    image: "images/custom.pin.png",
    text: "Savannah Village",
    ...markerDefaults
  }
]

export default function useUnmined(properties, regions) {
  const unminedRef = useRef();
  
  useEffect(() => {
    properties.markers = markers;
    console.log(properties);
    unminedRef.current = new Unmined();
    unminedRef.current.map(
      "map",
      properties,
      regions
    );
  }, [properties, regions]);

  return;
}