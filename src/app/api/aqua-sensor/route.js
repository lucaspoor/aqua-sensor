// src/app/api/aqua-sensor/route.js

let sensorData = [];

export async function POST(req) {
  try {
    const data = await req.json(); // parsea JSON del ESP32
    console.log("Datos recibidos del ESP32:", data);

    sensorData.push({
      ...data,
      timestamp: new Date().toISOString()
    });

    return new Response(JSON.stringify({ status: "OK", received: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ status: "error", message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function GET() {
  return new Response(JSON.stringify(sensorData), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}

// ✅ DELETE corregido
export async function DELETE() {
  sensorData.length = 0; // vacía el array global
  return new Response(JSON.stringify({ message: "Datos reseteados" }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
