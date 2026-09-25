"use client";

import { useState, useEffect } from "react";
import { AgentLiveLog } from "@/types/domain";

export function useAgentLiveStream(sessionKey: string, active: boolean = false) {
  const [logs, setLogs] = useState<AgentLiveLog[]>([]);
  const [currentStatus, setCurrentStatus] = useState<string>("IDLE");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  useEffect(() => {
    if (!active) return;

    setIsStreaming(true);
    setLogs([]);
    setCurrentStatus("INIT");

    const eventSource = new EventSource(`/api/agent/stream?domain=${encodeURIComponent(sessionKey)}`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setLogs((prev) => [...prev, data]);
        setCurrentStatus(data.status);

        if (data.status === "COMPLETED" || data.status === "FAILED") {
          setIsStreaming(false);
          eventSource.close();
        }
      } catch (err) {
        console.error("Error parsing SSE log event:", err);
      }
    };

    eventSource.onerror = () => {
      setIsStreaming(false);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [sessionKey, active]);

  return { logs, currentStatus, isStreaming };
}
