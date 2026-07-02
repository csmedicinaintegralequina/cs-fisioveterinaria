"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import EquinosHeader from "@/app/components/EquinosHeader";

export default function Estructuras() {

  const [diagnosticos, setDiagnosticos] = useState<any[]>([]);

  useEffect(() => {
  cargarDiagnosticos();
}, []);

  async function cargarDiagnosticos() {

    const { data } = await supabase
  .from("Diagnósticos")
  .select("*")
  .order("Nombre");

    if (data) {
      setDiagnosticos(data);
    }

  }

  return (

    <main className="min-h-screen bg-[#F4F1EB] p-6">

      <EquinosHeader
        titulo="Diagnósticos"
        subtitulo="Administración"
      />

      <div className="max-w-4xl mx-auto mt-8">

        <Link
          href="/equinos/administracion/diagnosticos/nueva"
          className="
            inline-block
            bg-[#0B6A74]
            text-white
            px-6
            py-4
            rounded-2xl
            font-bold
            shadow-lg
            hover:scale-105
            transition-all
            mb-8
          "
        >
          ➕ Nuevo diagnóstico
        </Link>

        <div className="space-y-3">

         {diagnosticos?.map((diagnostico) => (

            <div
              key={diagnostico.id}
              className="
                bg-white
                rounded-2xl
                shadow
                p-5
                flex
                justify-between
                items-center
              "
            >

              <div className="font-semibold text-lg">
                {diagnostico.Nombre}
              </div>

              <div className="flex gap-4">

                <a
                  href={`/equinos/administracion/diagnosticos/${diagnostico.id}/editar`}
                  className="text-xl"
                >
                  ✏️
                </a>

                <a
                  href={`/equinos/administracion/diagnosticos/${diagnostico.id}/eliminar`}
                  className="text-xl"
                >
                  🗑️
                </a>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>

  );

}