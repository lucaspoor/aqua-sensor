"use client";

import { useEffect, useState } from "react";

export default function Home() {

  type SensorData = {
  id: string;
  nivel: number;
  timestamp: string;}


 const [datos, setDatos] = useState<SensorData[]>([]); 
 const NIVEL_CRITICO = 500;
 
 

  const fetchDatos = async () => {
    try {
      const res = await fetch("/api/aqua-sensor");
      const data = await res.json();
      setDatos(data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  async function resetSensorData() {
  try {
    const response = await fetch('/api/aqua-sensor', { // cambia la URL según tu endpoint
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Error al resetear los datos');
    }

    const result = await response.json();
    console.log(result.message); // "Datos reseteados"
    alert('Datos del sensor reseteados correctamente');
  } catch (error) {
    console.error(error);
    alert('No se pudo resetear los datos');
  }
}

  useEffect(() => {
    fetchDatos(); // obtener al cargar la página
    const interval = setInterval(fetchDatos, 5000); // actualizar cada 5s
    return () => clearInterval(interval);
  }, []);

  const ultimoDato = datos.length > 0 ? datos[datos.length - 1] : null;
  const nivel = ultimoDato ? ultimoDato.nivel : 0;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Monitor de Nivel de Agua</h1>
      <button className="p-4 my-4 rounded-lg font-bold bg-cyan-200" onClick={()=>{
        resetSensorData()
        setDatos([])
        }}>resetear</button>

      {/* Mini hero */}
      <div
        style={{
          padding: "15px",
          marginBottom: "20px",
          borderRadius: "10px",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "18px",
          textAlign: "center",
          backgroundColor: nivel < NIVEL_CRITICO ? "#e74c3c" : "#2ecc71",
        }}
      >
        {nivel < NIVEL_CRITICO
          ? `⚠ Nivel bajo (${ultimoDato?.nivel})`
          : `💧 Nivel suficiente (${ultimoDato?.nivel})`}
      </div>

      {/* Tabla de datos */}
      <table
        cellPadding="5"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>Dispositivo</th>
            <th>"Calidad de agua"</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.nivel}</td>
              <td>{item.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
