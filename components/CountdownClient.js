"use client";
import { useEffect, useState } from "react";

export default function CountdownClient({ endsAt }) {
  const [parts, setParts] = useState({ d: "00", h: "00", m: "00", s: "00" });

  useEffect(() => {
    const end = new Date(endsAt).getTime();
    function tick() {
      const diff = Math.max(0, end - Date.now());
      setParts({
        d: String(Math.floor(diff / 86400000)).padStart(2, "0"),
        h: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0"),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0"),
        s: String(Math.floor((diff % 60000) / 1000)).padStart(2, "0"),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  const box = {
    background: "rgba(255,255,255,.15)", borderRadius: 8,
    padding: "10px 14px", fontSize: 22, fontWeight: 800, minWidth: 52, textAlign: "center",
  };

  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center", marginTop: 24 }}>
      <div style={box}>{parts.d}</div>
      <span style={{ fontSize: 20, opacity: .7 }}>:</span>
      <div style={box}>{parts.h}</div>
      <span style={{ fontSize: 20, opacity: .7 }}>:</span>
      <div style={box}>{parts.m}</div>
      <span style={{ fontSize: 20, opacity: .7 }}>:</span>
      <div style={box}>{parts.s}</div>
    </div>
  );
}
