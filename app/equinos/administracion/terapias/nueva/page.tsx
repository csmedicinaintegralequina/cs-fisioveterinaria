"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import EquinosHeader from "@/app/components/EquinosHeader";

export default function NuevaTerapia() {

  const router = useRouter();

  const [nombre, setNombre] = useState("");

  async function guardar() {

    const { error } = await supabase
      .from("Terapias")
      .insert([
        {
          Nombre: nombre,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/equinos/administracion/terapias");
  }

  return (
    <main className="min-h-screen bg-[#F4F1EB] p-6">

      <EquinosHeader
        titulo="Nueva terapia"
        subtitulo="Administración"
      />

      <div className="max-w-xl mx-auto mt-8 bg-white rounded-3xl shadow-xl p-8">

        <label className="font-semibold">
          Nombre
        </label>

        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border rounded-xl p-3 mt-2 mb-6"
        />

        <button
          onClick={guardar}
          className="
            bg-[#0B6A74]
            text-white
            px-6
            py-4
            rounded-2xl
            font-bold
            hover:scale-105
            transition-all
          "
        >
          Guardar
        </button>

      </div>

    </main>
  );
}