import { useRef } from 'react';
import styles from '../styles/Minecraft.module.css';
export default function BlueMap() {
  const mapRef = useRef();
  return (
    <iframe ref={mapRef.current} className={styles.map} src="http://javamcmap.echobucket.com"/>
  )
}