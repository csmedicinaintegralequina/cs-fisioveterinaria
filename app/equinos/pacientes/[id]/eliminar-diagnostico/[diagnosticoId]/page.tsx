"use client";

import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EliminarDiagnostico() {
  const params = useParams();
  const router = useRouter();

  const diagnosticoId = params.diagnosticoId as string;
  const pacienteId = params.id as string;

  async function eliminarDiagnostico() {
    const { error } = await supabase
      .from("Diagnósticos paciente")
      .delete()
      .eq("id", diagnosticoId);

    if (error) {
      alert("Error al eliminar diagnóstico");
      console.log(error);
      return;
    }

    alert("Diagnóstico eliminado");

    router.push(`/equinos/pacientes/${pacienteId}`);
  }

  return (
    <main className="min-h-screen bg-[#F4F1EB] p-6 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center">

        <h1 className="text-3xl font-bold text-red-600 mb-6">
          🗑️ Eliminar Diagnóstico
        </h1>

        <p className="mb-8 text-gray-700">
          ¿Estás seguro de que querés eliminar este diagnóstico?
        </p>

        <div className="flex justify-center gap-4">

          <button
            onClick={() => router.back()}
            className="
              px-6
              py-3
              rounded-2xl
              border
              border-gray-300
            "
          >
            Cancelar
          </button>

          <button
            onClick={eliminarDiagnostico}
            className="
              px-6
              py-3
              rounded-2xl
              bg-red-600
              text-white
              font-bold
            "
          >
            Confirmar eliminación
          </button>

        </div>

      </div>
    </main>
  );
}