import styles from "../styles/Minecraft.module.css"
import MinecraftStatus from "./MinecraftStatus"
import MinecraftMap from './MinecraftMap';
import { useInterval, useRequest } from 'ahooks';
import axios from 'axios';
import type { MinecraftStatusType } from "../lib/minecraft";
import type { Properties, Regions } from "../lib/Unmined";

type MinecraftProps = {
  java_status: MinecraftStatusType,
  status: MinecraftStatusType,
  properties: Properties,
  regions: Regions
}

type Response = {
  time: string
}

export default function Minecraft({
  java_status,
  status,
  properties,
  regions,
}: MinecraftProps) {
  const { data, run } = useRequest<Response, []>(async () => {
    const { data } = await axios("/api/minecraft/javatime");
    return data;
  }, {
    manual: true
  });

  useInterval(async () => {
    run();
  }, 2000, {
    immediate: true
  })

  return (
    <div className={styles.container}>
      <h2>Minecraft - mc.echobucket.com</h2>
      <div className={styles.minecraft}>
        <div className={styles.status}>
          <MinecraftStatus status={status} />
          <MinecraftStatus status={{ ...java_status, time: data?.time }} />
        </div>
        <MinecraftMap properties={properties} regions={regions}/>
      </div>
    </div>
  )
}
