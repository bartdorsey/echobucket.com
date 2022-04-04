import { useRef, useEffect } from 'react';
import Unmined from "../lib/Unmined"
import { Properties, Regions, Markers, Marker } from '../lib/Unmined';

const markerDefault: Marker = {
  imageScale: 0.25,
  imageAnchor: [0.5, 0.75],
  textColor: "white",
  offsetX: 0,
  offsetY: 20,
  font: "bold 1rem minecraftfont",
  x: 0,
  z: 0,
  m: [],
  image: "",
  text: ""
}

const markers: Markers = [
  {
    ...markerDefault,
    x: 9,
    z: 34,
    image: "/images/spawn.gif",
    text: "Spawn",
    
  },
  {
    ...markerDefault,
    x: 118,
    z: 85,
    image: "/images/custom.pin.png",
    text: "Spawn Village"
  }, {
    ...markerDefault,
    x: 735,
    z: -223,
    image: "images/custom.pin.png",
    text: "Savannah Village",
  }
]

export default function useUnmined(properties: Properties, regions: Regions) {
  const unminedRef = useRef<Unmined>();
  
  useEffect(() => {
    if (unminedRef.current) {
      return;
    }
    properties.markers = markers;
    unminedRef.current = new Unmined();
    unminedRef.current.map(
      "map",
      properties,
      regions
    );
  }, [properties, regions]);

  return;
}