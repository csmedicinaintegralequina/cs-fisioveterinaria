"use client";

import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EliminarSesion() {
  const params = useParams();

  const pacienteId = params.id as string;
  const sesionId = params.sesionId as string;

  async function eliminarSesion() {
    const { data: terapias } = await supabase
      .from("Sesión terapias")
      .select("id")
      .eq("Sesión id", sesionId);

    if (terapias?.length) {
      const ids = terapias.map((t: any) => t.id);

      await supabase
        .from("Sesión parámetros")
        .delete()
        .in("Sesión terapia id", ids);
    }

    await supabase
      .from("Sesión terapias")
      .delete()
      .eq("Sesión id", sesionId);

    await supabase
      .from("Sesiones")
      .delete()
      .eq("id", sesionId);

    window.location.href =
      `/equinos/pacientes/${pacienteId}`;
  }

  return (
    <main className="min-h-screen bg-[#F4F1EB] p-8">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-red-600 mb-4">
          🗑 Eliminar sesión
        </h1>

        <p className="mb-6">
          Esta acción no se puede deshacer.
        </p>

        <button
          onClick={eliminarSesion}
          className="
            bg-red-600
            text-white
            px-6
            py-4
            rounded-2xl
            font-bold
          "
        >
          Confirmar eliminación
        </button>

      </div>
    </main>
  );
}