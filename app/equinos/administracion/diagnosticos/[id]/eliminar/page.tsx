"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EquinosHeader from "@/app/components/EquinosHeader";

export default function EliminarDiagnóstico({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  const [id, setId] = useState("");

  useEffect(() => {
    async function cargar() {
      const { id } = await params;
      setId(id);
    }

    cargar();
  }, [params]);

  async function eliminar() {
    const { error } = await supabase
      .from("Diagnósticos")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/equinos/administracion/diagnosticos");
  }

  return (
    <main className="min-h-screen bg-[#F4F1EB] p-6">

      <EquinosHeader
        titulo="Eliminar diagnóstico"
        subtitulo="Administración"
      />

      <div className="max-w-xl mx-auto mt-8 bg-white rounded-3xl shadow-xl p-8">

        <p className="mb-6 text-lg">
          ¿Seguro que querés eliminar este diagnóstico?
        </p>

        <button
          onClick={eliminar}
          className="bg-red-600 text-white px-6 py-4 rounded-2xl font-bold"
        >
          Eliminar
        </button>

      </div>

    </main>
  );
}