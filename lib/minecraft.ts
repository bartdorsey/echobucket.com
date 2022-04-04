const JAVA_HOST = process.env.JAVA_HOST ?? 'localhost';
const JAVA_PORT = Number(process.env.JAVA_PORT ?? 25565);
const QUERY_PORT = Number(process.env.QUERY_PORT ?? 25566);
const BEDROCK_HOST = process.env.BEDROCK_HOST ?? 'localhost';
const BEDROCK_PORT = Number(process.env.BEDROCK_PORT ?? 19132);

import { queryFull, queryBasic, statusBedrock } from "minecraft-server-util"
export enum ServerType {
  BEDROCK,
  JAVA
}
export type MinecraftStatusType = {
  name?: string,
  online: boolean,
  type: ServerType,
  version: string
  players: {
    online: number
    max: number
    list?: string[]
  }
  gameMode?: string
  motd: string
  hostname: string
  port: number,
  time?: string
}

export async function getJavaStatus() {
  let java_status: MinecraftStatusType
  try {
    const java_info = await queryFull(JAVA_HOST, QUERY_PORT);
    const basic_info = await queryBasic(JAVA_HOST, QUERY_PORT);
    console.log(java_info);

    java_status = {
      type: ServerType.JAVA,
      online: true,
      version: java_info.version,
      players: java_info.players,
      hostname: JAVA_HOST,
      port: JAVA_PORT,
      name: "mcjava.echobucket.com",
      motd: java_info.motd.clean,
    }
  } catch (e) {
    console.error(e)
    java_status = {
      type: ServerType.JAVA,
      online: false,
      version: "Unknown",
      players: { max: 0, online: 0 },
      hostname: JAVA_HOST,
      port: JAVA_PORT,
      name: "mcjava.echobucket.com",
      motd: "Server appears to be down",
    }
    return java_status
  }
  return java_status
}

export async function getBedrockStatus() {
  let bedrock_status: MinecraftStatusType
  try {
    const bedrock_response = await statusBedrock(BEDROCK_HOST, BEDROCK_PORT)

    bedrock_status = {
      online: true,
      type: ServerType.BEDROCK,
      version: bedrock_response.version.name,
      players: bedrock_response.players,
      gameMode: bedrock_response.gameMode,
      hostname: BEDROCK_HOST,
      port: BEDROCK_PORT,
      motd: bedrock_response.motd.clean,
    }
  } catch (e) {
    console.error(e)
    bedrock_status = {
      type: ServerType.BEDROCK,
      online: false,
      version: "Unknown",
      players: {
        online: 0,
        max: 0,
      },
      hostname: BEDROCK_HOST,
      port: BEDROCK_PORT,
      motd: "Server appears to be down",
    }
  }
  return bedrock_status
}