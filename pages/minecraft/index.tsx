import type { NextPage } from 'next'
import Minecraft from '../../components/Minecraft';
import mc from 'minecraft-server-status-simple';
import axios from 'axios';
const BACKEND_URL = process.env.BACKEND_URL;

export async function getProperties() {
  const { data } = await axios.get(
    `${BACKEND_URL}/minecraft/unmined.map.properties.js`
  )
  try {
    const properties = new Function(`
    ${data}
    return UnminedMapProperties;
  `)()
    return properties;
  } catch (e) {
    console.error(e);
  }
}

export async function getRegions() {
  const { data } = await axios.get(
    `${BACKEND_URL}/minecraft/unmined.map.regions.js`
  )
  try {
    const regions = new Function(`
    ${data}
    return UnminedRegions;
  `)()
    return regions;
  } catch (e) {
    console.error(e);
  }
}

export async function getServerSideProps() {
  const status = await mc.status("bedrock", "mc.echobucket.com", 19132)

  const properties = await getProperties();
  const regions = (await getRegions()).map((region: any) => {
    return {
      x: region.x,
      z: region.z,
      m: Array.from(region.m)
    }
  })

  return {
    props: {
      properties,
      regions,
      status
    }
  }
}

type MinecraftPageProps = {
  status: any,
  properties: any,
  regions: any
}


const MinecraftPage: NextPage<MinecraftPageProps> = ({status, properties, regions}) => {
  return (
    <main style={{ height: '100vh' }}>
      <Minecraft status={status} properties={properties} regions={regions}/>
    </main>
  )
}

export default MinecraftPage;