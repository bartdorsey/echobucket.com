import { useRequest } from "ahooks"
import axios from 'axios';
export default function useMinecraftStatus() {
  const { data, error, loading } = useRequest(async () => {
    const { data } = await axios.get('/api/minecraft/status');
    return data;
  });

  return { status: data, error, loading };
}