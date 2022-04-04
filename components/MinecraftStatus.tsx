import styles from "../styles/Minecraft.module.css"

export default function MinecraftStatus({ status }) {
  return (
    <div className={styles.status}>
      <h3>{status.hostname}</h3>
      <div>Online: {status.online ? "🟢" : "🔴"}</div>
      {status.time ? status.time : null}
      <p>{status.motd.clean}</p>
      {status.gamemode ? <div>Gamemode: {status.gamemode}</div> : null}

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
