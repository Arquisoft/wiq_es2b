import { useEffect, useState } from "react";
import "../Timer.css";

export default function Timer() {
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [dot, setDot] = useState(0);
  const [text, setText] = useState("20");

  useEffect(() => {
    const interval = setInterval(() => {
      const secs = 20 - (new Date().getSeconds() % 21);

      const currentLoadingPercent = 440 - 440 * (secs / 20);
      setLoadingPercent(currentLoadingPercent);

      const currentDot = 360 * (secs / 20);
      setDot(currentDot);

      setText(secs >= 10 ? secs : `0${secs}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Timer">
      <div className="container">
        <div className="text">{text}</div>
        <div style={{ transform: `rotate(${dot}deg)` }} className="dot"></div>
        <svg>
          <circle cx="70" cy="70" r="70" />
          <circle strokeDashoffset={loadingPercent} cx="70" cy="70" r="70" />
        </svg>
      </div>
    </div>
  );
}
