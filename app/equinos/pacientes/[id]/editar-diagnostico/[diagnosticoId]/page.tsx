"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditarDiagnostico() {
  const params = useParams();
  const router = useRouter();

  const diagnosticoPacienteId = params.diagnosticoId as string;
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

    const diagnosticoPacienteQuery = await supabase
      .from("Diagnósticos paciente")
      .select("*")
      .eq("id", diagnosticoPacienteId)
      .single();

    setDiagnosticos(diagnosticosQuery.data || []);
    setEstructuras(estructurasQuery.data || []);

    const diag = diagnosticoPacienteQuery.data;

    if (diag) {
      setDiagnosticoId(diag["Diagnpostico id"] || "");
      setEstructuraId(diag["Estructura id"] || "");
      setMiembro(diag.Miembro || "");
      setCara(diag.Cara || "");
      setNivel(diag.Nivel || "");
      setObservaciones(diag.Observaciones || "");
    }
  }
    async function guardarCambios() {
    const { error } = await supabase
      .from("Diagnósticos paciente")
      .update({
        "Diagnpostico id": diagnosticoId,
        "Estructura id": estructuraId,
        Miembro: miembro || null,
        Cara: cara || null,
        Nivel: nivel || null,
        Observaciones: observaciones || null,
      })
      .eq("id", diagnosticoPacienteId);

    if (error) {
      console.log(error);
      alert("Error al actualizar diagnóstico");
      return;
    }

    alert("Diagnóstico actualizado");

    router.push(`/equinos/pacientes/${pacienteId}`);
  }

  return (
    <main className="min-h-screen bg-[#F4F1EB] p-6">
      <h1 className="text-5xl font-bold text-[#0B6A74] mb-2">
        ✏️ Editar Diagnóstico
      </h1>

      <p className="text-[#6B7280] mb-8">
        Modificar diagnóstico del paciente
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
            rows={5}
            placeholder="Observaciones"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          />
                    <button
            onClick={guardarCambios}
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
            💾 Guardar Cambios
          </button>

        </div>

      </div>

    </main>
  );
}