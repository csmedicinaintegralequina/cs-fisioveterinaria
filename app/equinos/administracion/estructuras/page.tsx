"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import EquinosHeader from "@/app/components/EquinosHeader";

export default function Estructuras() {

  const [estructuras, setEstructuras] = useState<any[]>([]);

  useEffect(() => {
    cargarEstructuras();
  }, []);

  async function cargarEstructuras() {

    const { data } = await supabase
      .from("Estructuras anatómicas")
      .select("*")
      .order("Nombre");

    if (data) {
      setEstructuras(data);
    }

  }

  return (

    <main className="min-h-screen bg-[#F4F1EB] p-6">

      <EquinosHeader
        titulo="Estructuras anatómicas"
        subtitulo="Administración"
      />

      <div className="max-w-4xl mx-auto mt-8">

        <Link
          href="/equinos/administracion/estructuras/nueva"
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
          ➕ Nueva estructura
        </Link>

        <div className="space-y-3">

          {estructuras?.map((estructura) => (

            <div
              key={estructura.id}
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
                {estructura.Nombre}
              </div>

              <div className="flex gap-4">

                <a
                  href={`/equinos/administracion/estructuras/${estructura.id}/editar`}
                  className="text-xl"
                >
                  ✏️
                </a>

                <a
                  href={`/equinos/administracion/estructuras/${estructura.id}/eliminar`}
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