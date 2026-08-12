"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import EquinosHeader from "@/app/components/EquinosHeader";

export default function Lugares() {
  const [lugares, setLugares] = useState<any[]>([]);

  useEffect(() => {
    cargarLugares();
  }, []);

  async function cargarLugares() {
    const { data } = await supabase
      .from("Lugares")
      .select("*")
      .order("Nombre");

    if (data) {
      setLugares(data);
    }
  }

  return (
    <main className="min-h-screen bg-[#F4F1EB] p-6">

      <EquinosHeader
        titulo="Lugares de atención"
        subtitulo="Administración"
      />

      <div className="max-w-4xl mx-auto mt-8">

        <Link
          href="/administracion/lugares/nueva"
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
          ➕ Nuevo lugar
        </Link>

        <div className="space-y-3">

          {lugares?.map((lugar) => (

            <div
              key={lugar.id}
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
                {lugar.Nombre}
              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}