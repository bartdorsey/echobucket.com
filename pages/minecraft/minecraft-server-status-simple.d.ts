declare module 'minecraft-server-status-simple' {
  export function status(type: string, ip: string, port: number | null) : any
}