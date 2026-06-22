"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NuevoDiagnostico() {
  const params = useParams();

  const pacienteId = params.id as string;

  const [diagnosticos, setDiagnosticos] = useState<any[]>([]);
  const [estructuras, setEstructuras] = useState<any[]>([]);

  const [diagnosticoId, setDiagnosticoId] = useState("");
  const [estructuraId, setEstructuraId] = useState("");
  const [miembro, setMiembro] = useState("");
  const [cara, setCara] = useState("");
  const [nivel, setNivel] = useState("");
  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
  const diagnosticosQuery = await supabase
    .from("Diagnósticos")
    .select("*");

  const estructurasQuery = await supabase
    .from("Estructuras anatómicas")
    .select("*");

  console.log("DIAGNOSTICOS QUERY", diagnosticosQuery);
  console.log("ESTRUCTURAS QUERY", estructurasQuery);

  setDiagnosticos(diagnosticosQuery.data || []);
  setEstructuras(estructurasQuery.data || []);
}

  async function guardarDiagnostico() {
    const { error } = await supabase
      .from("Diagnósticos paciente")
      .insert([
        {
          "Paciente id": pacienteId,
          "Diagnpostico id": diagnosticoId,
          "Estructura id": estructuraId,
          Miembro: miembro || null,
          Cara: cara || null,
          Nivel: nivel || null,
          Observaciones: observaciones || null,
        },
      ]);

    if (error) {
      alert("Error al guardar diagnóstico");
      console.log(error);
      return;
    }

    alert("Diagnóstico guardado");

    setDiagnosticoId("");
    setEstructuraId("");
    setMiembro("");
    setCara("");
    setNivel("");
    setObservaciones("");
  }

  return (
    <main className="min-h-screen bg-[#F4F1EB] p-6">

      <h1 className="text-5xl font-bold text-[#0B6A74] mb-2">
        🩺 Nuevo Diagnóstico
      </h1>

      <p className="text-[#6B7280] mb-8">
        Registrar diagnóstico del paciente
      </p>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <div className="grid gap-5">

               <select
            value={diagnosticoId}
            onChange={(e) => setDiagnosticoId(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          >
            <option value="">Seleccionar diagnóstico</option>

            {diagnosticos.map((diagnostico) => (
              <option key={diagnostico.id} value={diagnostico.id}>
                {diagnostico.Nombre}
              </option>
            ))}
          </select>

          <select
            value={estructuraId}
            onChange={(e) => setEstructuraId(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          >
            <option value="">Seleccionar estructura anatómica</option>

            {estructuras.map((estructura) => (
              <option key={estructura.id} value={estructura.id}>
                {estructura.Nombre}
              </option>
            ))}
          </select>

          <select
            value={miembro}
            onChange={(e) => setMiembro(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          >
            <option value="">Miembro (opcional)</option>
            <option>Anterior Derecho</option>
            <option>Anterior Izquierdo</option>
            <option>Posterior Derecho</option>
            <option>Posterior Izquierdo</option>
          </select>

          <select
            value={cara}
            onChange={(e) => setCara(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          >
            <option value="">Cara (opcional)</option>
            <option>Medial</option>
            <option>Lateral</option>
            <option>Dorsal</option>
            <option>Palmar</option>
            <option>Plantar</option>
            <option>Craneal</option>
            <option>Caudal</option>
          </select>

          <input
            type="text"
            placeholder="Nivel (opcional)"
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          />

          <textarea
            placeholder="Observaciones"
            rows={5}
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          />

          <button
            onClick={guardarDiagnostico}
            className="
              bg-[#0B6A74]
              text-white
              font-bold
              py-4
              rounded-2xl
              shadow-lg
              hover:scale-105
              transition-all
            "
          >
            💾 Guardar Diagnóstico
          </button>

        </div>

      </div>

    </main>
  );
}