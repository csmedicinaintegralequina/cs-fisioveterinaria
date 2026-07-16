"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditarHistoriaClinica() {
  const params = useParams();

  const pacienteId = params.id as string;

  const [historiaId, setHistoriaId] = useState("");
  const [motivoConsulta, setMotivoConsulta] = useState("");
  const [anamnesis, setAnamnesis] = useState("");
  const [examenFisico, setExamenFisico] = useState("");
    const [Tratamiento, setTratamiento] = useState("");
  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    cargarHistoria();
  }, []);

  async function cargarHistoria() {
    const { data, error } = await supabase
      .from("HistoriasClinicas")
      .select("*")
      .eq("paciente id", pacienteId)
      .single();

    if (error || !data) {
      console.log(error);
      return;
    }

    setHistoriaId(data.id);

    setMotivoConsulta(
      data["Motivo Consulta"] || ""
    );

    setAnamnesis(
      data.Anamnesis || ""
    );

    setExamenFisico(
      data["Examen Fisico"] || ""
    );

 setTratamiento(
      data["Tratamiento"] || ""
    );

    setObservaciones(
      data.Observaciones || ""
    );
  }

  async function guardarCambios() {
    const { error } = await supabase
      .from("HistoriasClinicas")
      .update({
        "Motivo Consulta": motivoConsulta,
        Anamnesis: anamnesis,
        "Examen Fisico": examenFisico,
        Tratamiento: Tratamiento,
        Observaciones: observaciones,
      })
      .eq("id", historiaId);

    if (error) {
      alert("Error al actualizar");
      console.log(error);
      return;
    }

    alert("Historia clínica actualizada");
  }

  return (
    <main className="min-h-screen bg-[#F4F1EB] p-6">

      <h1 className="text-5xl font-bold text-[#0B6A74] mb-2">
        ✏️ Editar Historia Clínica
      </h1>

      <p className="text-[#6B7280] mb-8">
        Modificar información existente
      </p>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <div className="grid gap-5">
          <textarea
            placeholder="Motivo de consulta"
            rows={4}
            value={motivoConsulta}
            onChange={(e) => setMotivoConsulta(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          />

          <textarea
            placeholder="Anamnesis"
            rows={6}
            value={anamnesis}
            onChange={(e) => setAnamnesis(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          />

          <textarea
            placeholder="Examen físico"
            rows={6}
            value={examenFisico}
            onChange={(e) => setExamenFisico(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          />

<textarea
            placeholder="Tratamiento"
            rows={6}
            value={examenFisico}
            onChange={(e) => setTratamiento(e.target.value)}
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
            onClick={guardarCambios}
            className="
              bg-amber-600
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
