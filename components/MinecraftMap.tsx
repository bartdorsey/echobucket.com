import { useRef } from "react"
import useUnmined from "../hooks/useUnmined"
import styles from "../styles/Minecraft.module.css"
import { Properties, Regions } from '../lib/Unmined';

type MinecraftMapProps = {
  properties: Properties,
  regions: Regions
}

export default function MinecraftMap({ 
  properties, regions
}: MinecraftMapProps) {
  useUnmined(properties, regions)
  const map = useRef();

  return (
    <div ref={map.current} id="map" className={styles.map}></div>
  )
}