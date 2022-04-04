import type { NextPage } from "next"
import Minecraft from "../../components/Minecraft"
import axios from "axios"
import { getJavaStatus, getBedrockStatus } from "../../lib/minecraft"
const BACKEND_URL = process.env.BACKEND_URL

async function getProperties() {
  const { data } = await axios.get(
    `${BACKEND_URL}/minecraft/unmined.map.properties.js`
  )
  try {
    const properties = new Function(`
    ${data}
    return UnminedMapProperties;
  `)()
    return properties
  } catch (e) {
    console.error(e)
  }
}

async function getRegions() {
  const { data } = await axios.get(
    `${BACKEND_URL}/minecraft/unmined.map.regions.js`
  )
  try {
    const regions = new Function(`
    ${data}
    return UnminedRegions;
  `)()
    return regions
  } catch (e) {
    console.error(e)
  }
}

export async function getServerSideProps() {
  const bedrock_status = await getBedrockStatus()
  const java_status = await getJavaStatus()
  const properties = await getProperties()
  const regions = (await getRegions()).map((region: any) => {
    return {
      x: region.x,
      z: region.z,
      m: Array.from(region.m),
    }
  })

  return {
    props: {
      properties,
      regions,
      status: bedrock_status,
      java_status,
    },
  }
}

type MinecraftPageProps = {
  status: any
  properties: any
  regions: any
  java_status: any
}

const MinecraftPage: NextPage<MinecraftPageProps> = (props) => {
  return (
    <main style={{ height: "100vh" }}>
      <Minecraft {...props} />
    </main>
  )
}

export default MinecraftPage
