import { useRef } from 'react';
import styles from '../styles/Minecraft.module.css';
const BLUEMAP_URL = process.env.NEXT_PUBLIC_BLUEMAP_URL ?? 'http://javamcmap.echobucket.com'
export default function BlueMap() {
  const mapRef = useRef();
  return (
    <iframe ref={mapRef.current} className={styles.map} src={BLUEMAP_URL} />
  )
}