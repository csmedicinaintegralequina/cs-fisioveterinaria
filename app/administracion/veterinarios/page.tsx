"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import EquinosHeader from "@/app/components/EquinosHeader";

export default function Veterinarios() {
  const [veterinarios, setVeterinarios] = useState<any[]>([]);

  useEffect(() => {
    cargarVeterinarios();
  }, []);

  async function cargarVeterinarios() {
    const { data, error } = await supabase
      .from("Veterinarios")
      .select("*")
      .order("Nombre", { ascending: true });

    if (error) {
      console.log("ERROR:", error);
      return;
    }

    setVeterinarios(data || []);
  }

  return (
    <main className="min-h-screen bg-[#F4F1EB] p-6">

      <EquinosHeader
        titulo="Veterinarios actuantes"
        subtitulo="Administración de veterinarios"
      />

      <div className="max-w-4xl mx-auto mt-8">

        <div className="flex justify-end mb-6">
          <Link
            href="/equinos/administracion/veterinarios/nuevo"
            className="
              bg-[#0B6A74]
              text-white
              px-5
              py-3
              rounded-2xl
              font-bold
              shadow-lg
              hover:scale-105
              transition-all
            "
          >
            ➕ Nuevo veterinario
          </Link>
        </div>

        <div className="grid gap-4">

          {veterinarios.map((veterinario) => (

            <div
              key={veterinario.id}
              className="
                bg-white
                rounded-3xl
                shadow-xl
                p-5
                flex
                items-center
                justify-between
              "
            >

              <div>
                <h2 className="text-xl font-bold text-[#0B6A74]">
                  {veterinario.Nombre}
                </h2>
              </div>

              <Link
                href={`/equinos/administracion/veterinarios/${veterinario.id}/editar`}
                className="
                  text-amber-600
                  font-semibold
                  hover:underline
                "
              >
                ✏️ Editar
              </Link>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}