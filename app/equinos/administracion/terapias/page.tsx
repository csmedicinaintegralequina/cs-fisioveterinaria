"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import EquinosHeader from "@/app/components/EquinosHeader";

export default function Estructuras() {

  const [terapias, setTerapias] = useState<any[]>([]);

  useEffect(() => {
  cargarTerapias();
}, []);

  async function cargarTerapias() {

    const { data } = await supabase
  .from("Terapias")
  .select("*")
  .order("Nombre");

    if (data) {
      setTerapias(data);
    }

  }

  return (

    <main className="min-h-screen bg-[#F4F1EB] p-6">

      <EquinosHeader
        titulo="Terapias"
        subtitulo="Administración"
      />

      <div className="max-w-4xl mx-auto mt-8">

        <Link
          href="/equinos/administracion/terapias/nueva"
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
          ➕ Nueva terapia
        </Link>

        <div className="space-y-3">

         {terapias?.map((terapia) => (

            <div
              key={terapia.id}
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
                {terapia.Nombre}
              </div>

              <div className="flex gap-4">

                <a
                  href={`/equinos/administracion/terapias/${terapia.id}/editar`}
                  className="text-xl"
                >
                  ✏️
                </a>

                <a
                  href={`/equinos/administracion/terapias/${terapia.id}/eliminar`}
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