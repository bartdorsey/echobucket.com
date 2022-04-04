import { useRequest, useInterval } from "ahooks";
import axios from 'axios';

type Response = {
  time: string
}
export default function useJavaTime() {
  const { data, run } = useRequest<Response, []>(async () => {
    const { data } = await axios("/api/minecraft/javatime");
    return data;
  }, {
    manual: true
  });

  useInterval(async () => {
    run();
  }, 2000, {
    immediate: true
  })
  return data?.time;
}