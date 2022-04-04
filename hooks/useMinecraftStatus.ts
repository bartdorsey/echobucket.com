import { useRequest } from "ahooks"
import type { MinecraftStatusType } from "../lib/minecraft";
import axios from 'axios';

type Result = {
  status?: MinecraftStatusType,
  error?: Error,
  loading: boolean
}

export default function useMinecraftStatus(): Result {
  const { data, error, loading } = useRequest<MinecraftStatusType, []>(async () => {
    const { data } = await axios.get('/api/minecraft/status');
    return data;
  });

  return { status: data, error, loading };
}