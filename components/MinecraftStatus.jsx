import styles from "../styles/Minecraft.module.css";

export default function MinecraftStatus({ status }) {
  return (
    <div className={styles.status}>
      <div>Online: {status.online ? "🟢" : "🔴"}</div>
      <p>{status.motd.clean}</p>
      <div>Gamemode: {status.gamemode}</div>
      <div>Version: {status.version}</div>
      <div>
        Players: {status.players.online}/{status.players.max}
      </div>
    </div>
  );
}
