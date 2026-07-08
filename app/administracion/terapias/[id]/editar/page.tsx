"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import EquinosHeader from "@/app/components/EquinosHeader";

export default function EditarTerapia({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const router = useRouter();

  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    async function cargar() {

      const { id } = await params;

      setId(id);

      const { data } = await supabase
        .from("Terapias")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setNombre(data.Nombre);
      }

    }

    cargar();
  }, [params]);

  async function guardar() {

    const { error } = await supabase
      .from("Terapias")
      .update({
        Nombre: nombre,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/administracion/terapias");
  }

  return (
    <main className="min-h-screen bg-[#F4F1EB] p-6">

      <EquinosHeader
        titulo="Editar terapia"
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
          "
        >
          Guardar cambios
        </button>

      </div>

    </main>
  );
}