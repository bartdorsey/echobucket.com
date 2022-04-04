import { useState } from 'react';
import styles from "../styles/Minecraft.module.css"
import MinecraftStatus from "./MinecraftStatus"
import MinecraftMap from './MinecraftMap';
import { useInterval } from 'ahooks';
import axios from 'axios';
import type { MinecraftStatusType } from "../lib/minecraft";

type MinecraftProps = {
  java_status: MinecraftStatusType,
  status: MinecraftStatusType,
  properties: any,
  regions: any
}

export default function Minecraft({
  java_status,
  status,
  properties,
  regions,
}: MinecraftProps) {
  const [javaTime, setJavaTime] = useState('');

  useInterval(async () => {
    const { data } = await axios("/api/minecraft/javatime")
    setJavaTime(data.time);
  }, 2000, {
    immediate: true
  })

  return (
    <div className={styles.container}>
      <h2>Minecraft - mc.echobucket.com</h2>
      <div className={styles.minecraft}>
        <div className={styles.status}>
          <MinecraftStatus status={status} />
          <MinecraftStatus status={{ ...java_status, time: javaTime }} />
        </div>
        <MinecraftMap properties={properties} regions={regions}/>
      </div>
    </div>
  )
}
