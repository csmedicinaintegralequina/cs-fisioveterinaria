"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import PequenosHeader from "@/app/components/PequenosHeader";
import { useEffect } from "react";



export default function HistoriaClinica() {
  const params = useParams();

  const pacienteId = params.id as string;
  const router = useRouter();
  const [motivoConsulta, setMotivoConsulta] = useState("");
  const [anamnesis, setAnamnesis] = useState("");
  const [examenFisico, setExamenFisico] = useState("");
  const [observaciones, setObservaciones] = useState("");
const [paciente, setPaciente] = useState<any>(null);

useEffect(() => {
  const fetchPaciente = async () => {
    const { data } = await supabase
      .from("Pacientes")
      .select("*")
      .eq("id", pacienteId)
      .maybeSingle();

    setPaciente(data);
  };

  fetchPaciente();
}, [pacienteId]);
  async function guardarHistoria() {
    const { error } = await supabase
      .from("HistoriasClinicas")
      .insert([
        {
          "paciente id": pacienteId,
          "Motivo Consulta": motivoConsulta,
          Anamnesis: anamnesis,
          "Examen Fisico": examenFisico,
          Observaciones: observaciones,
        },
      ]);

    if (error) {
      alert("Error al guardar: " + error.message);
      console.log(error);
      return;
    }

    alert("Historia clínica guardada");

router.push(`/pequenos-animales/pacientes/${pacienteId}`);
  }

  return (
    <main className="min-h-screen bg-[#F4F1EB] p-6">
 <div className="mb-8">
<PequenosHeader
  titulo={paciente?.Nombre ?? "Paciente"}
  subtitulo="Historia clínica"
/>
</div>
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
            placeholder="Observaciones"
            rows={5}
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          />

          <button
            onClick={guardarHistoria}
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
            💾 Guardar Historia Clínica
          </button>

        </div>

      </div>

    </main>
  );
}