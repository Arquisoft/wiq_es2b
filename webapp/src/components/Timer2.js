import { useEffect, useState } from "react";
import "../Timer.css";

function Timer2() {
  const [time, setTime] = useState(20); // Comenzar desde 20 segundos en lugar de 0

  useEffect(() => {
    const id = setInterval(() => {
      setTime((prev) => {
        if (prev > 0) {
          return prev - 1; // Decrementar el tiempo
        } else {
          return 20; // Reiniciar el tiempo a 20 segundos cuando llega a 0
        }
      });
    }, 1000);

    return () => clearInterval(id); // Limpiar el intervalo cuando el componente se desmonta
  }, []);

  // Calcular el porcentaje de tiempo transcurrido para el círculo
  const percentage = ((20 - time) / 20) * 100; // Calcular el porcentaje en base al tiempo restante

  return (
    <div className="Timer">
      <div className="container">
        <div className="text">{time}</div>
        <div
          style={{ transform: `rotate(${percentage * 3.6}deg)` }}
          className="dot"
        ></div>
        <svg>
          <circle cx="70" cy="70" r="70" />
          <circle
            strokeDashoffset={440 - (percentage / 100) * 440}
            cx="70"
            cy="70"
            r="70"
          />
        </svg>
      </div>
      <br></br>
      <div className="controls">
        {/* No se necesita botón de pausa */}
        <button onClick={() => setTime(20)}>Reset</button> {/* Botón para reiniciar el temporizador */}
      </div>
    </div>
  );
}

export default Timer2;
