import { useState } from "react"
import styles from "../styles/Minecraft.module.css"
import MinecraftStatus from "./MinecraftStatus"
import MinecraftMap from "./MinecraftMap"
import type { MinecraftStatusType } from "../lib/minecraft"
import type { Properties, Regions } from "../lib/Unmined"
import useJavaTime from "../hooks/useJavaTime"
import BlueMap from './BlueMap';

type MinecraftProps = {
  java_status: MinecraftStatusType
  status: MinecraftStatusType
  properties: Properties
  regions: Regions
}

enum View {
  JAVA,
  BEDROCK,
}

export default function Minecraft({
  java_status,
  status,
  properties,
  regions,
}: MinecraftProps) {
  const [activeView, setActiveView] = useState(View.BEDROCK)
  const time = useJavaTime()

  return (
    <div className={styles.container}>
      <h2>Minecraft Server Status - echobucket.com</h2>
      <div className={styles.minecraft}>
        <div className={styles.status}>
          <MinecraftStatus
            active={activeView === View.BEDROCK}
            status={status}
            onClick={() => setActiveView(View.BEDROCK)}
          />
          <MinecraftStatus
            active={activeView === View.JAVA}
            status={{ ...java_status, time }}
            onClick={() => setActiveView(View.JAVA)}
          />
        </div>
        {activeView === View.BEDROCK ? (
          <MinecraftMap properties={properties} regions={regions} />
        ) : <BlueMap/>}
      </div>
    </div>
  )
}
