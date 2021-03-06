import styles from "../styles/Minecraft.module.css"
import { MinecraftStatusType } from "../lib/minecraft"

type MinecraftStatusProps = {
  status: MinecraftStatusType,
  onClick: () => void,
  active: boolean
}

export default function MinecraftStatus({ status, onClick, active }: MinecraftStatusProps) {
  return (
    <div onClick={onClick} className={`${styles.status} ${active ? styles.active : ''}`}>
      <h3>{status.name}</h3>
      <div>Online: {status.online ? "🟢" : "🔴"}</div>
      {status.time ? status.time : null}
      <p>{status.motd}</p>
      {status.gameMode ? <div>Gamemode: {status.gameMode}</div> : null}

      <div>Version: {status.version}</div>
      <div>
        Players: {status.players.online}/{status.players.max}
        {status.players?.list ? (
          <ul className={styles.players}>
            {
              status.players.list.map(player => {
                return (
                  <li key={player}>{player}</li>
                )
              })
            }
          </ul>
        ) : null}
      </div>
    </div>
  )
}
