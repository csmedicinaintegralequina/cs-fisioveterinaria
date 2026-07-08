"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import EquinosHeader from "@/app/components/EquinosHeader";

export default function EditarParametro({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const router = useRouter();

  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [terapiaId, setTerapiaId] = useState("");
const [terapias, setTerapias] = useState<any[]>([]);

  useEffect(() => {
  async function cargar() {

    const { id } = await params;

    setId(id);

    const { data } = await supabase
      .from("Parámetros terapias")
      .select("*")
      .eq("id", id)
      .single();

    if (data) {
      setNombre(data["Nombre parámetro"]);
      setTerapiaId(data["Terapia id"]);
    }

    const { data: terapiasData } = await supabase
      .from("Terapias")
      .select("*")
      .order("Nombre");

    if (terapiasData) {
      setTerapias(terapiasData);
    }

  }

  cargar();
}, [params]);

  async function guardar() {

    const { error } = await supabase
  .from("Parámetros terapias")
  .update({
    "Nombre parámetro": nombre,
    "Terapia id": terapiaId,
  })
  .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/administracion/parametros");
  }

  return (
    <main className="min-h-screen bg-[#F4F1EB] p-6">

      <EquinosHeader
        titulo="Editar parámetro"
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
<label className="font-semibold">
  Terapia
</label>

<select
  value={terapiaId}
  onChange={(e) => setTerapiaId(e.target.value)}
  className="w-full border rounded-xl p-3 mt-2 mb-6"
>

  <option value="">
    Seleccione una terapia
  </option>

  {terapias.map((terapia) => (
    <option
      key={terapia.id}
      value={terapia.id}
    >
      {terapia.Nombre}
    </option>
  ))}

</select>
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