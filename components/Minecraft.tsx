import styles from "../styles/Minecraft.module.css"
import MinecraftStatus from "./MinecraftStatus"
import MinecraftMap from './MinecraftMap';
import type { MinecraftStatusType } from "../lib/minecraft";
import type { Properties, Regions } from "../lib/Unmined";
import useJavaTime from '../hooks/useJavaTime';

type MinecraftProps = {
  java_status: MinecraftStatusType,
  status: MinecraftStatusType,
  properties: Properties,
  regions: Regions
}

export default function Minecraft({
  java_status,
  status,
  properties,
  regions,
}: MinecraftProps) {
  const time = useJavaTime();

  return (
    <div className={styles.container}>
      <h2>Minecraft - mc.echobucket.com</h2>
      <div className={styles.minecraft}>
        <div className={styles.status}>
          <MinecraftStatus status={status} />
          <MinecraftStatus status={{ ...java_status, time }} />
        </div>
        <MinecraftMap properties={properties} regions={regions}/>
      </div>
    </div>
  )
}
