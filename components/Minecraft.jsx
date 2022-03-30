import { useRef } from "react"
import styles from "../styles/Minecraft.module.css"
import MinecraftStatus from "./MinecraftStatus"
import useUnmined from "../hooks/useUnmined"

export default function Minecraft({status, properties, regions}) {
  useUnmined(properties, regions);
  const map = useRef()

  return (
    <div className={styles.container}>
      <h2>Minecraft - mc.echobucket.com</h2>
      <div className={styles.minecraft}>
        <MinecraftStatus status={status} />
        <div ref={map.current} id="map" className={styles.map}></div>
      </div>
    </div>
  )
}
