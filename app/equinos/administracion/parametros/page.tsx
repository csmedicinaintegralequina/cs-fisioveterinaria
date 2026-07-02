"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import EquinosHeader from "@/app/components/EquinosHeader";

export default function Estructuras() {

  const [parametros, setParametros] = useState<any[]>([]);
  const [terapias, setTerapias] = useState<any[]>([]);

  useEffect(() => {
  cargarParametros();
}, []);

  async function cargarParametros() {
const { data: terapiasData } = await supabase
  .from("Terapias")
  .select("*");

if (terapiasData) {
  setTerapias(terapiasData);
}
    const { data } = await supabase
  .from("Parámetros terapias")
  .select("*")
  .order("Nombre parámetro");

    if (data) {
      setParametros(data);
    }

  }
const terapiasOrdenadas = terapias.map((terapia) => ({
  ...terapia,
  parametros: parametros.filter(
    (p) => p["Terapia id"] === terapia.id
  ),
}));
  return (

    <main className="min-h-screen bg-[#F4F1EB] p-6">

      <EquinosHeader
        titulo="Parámetros"
        subtitulo="Administración"
      />

      <div className="max-w-4xl mx-auto mt-8">

        <Link
          href="/equinos/administracion/parametros/nueva"
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
          ➕ Nuevo parámetro
        </Link>

        <div className="space-y-3">

{terapiasOrdenadas.map((terapia) => (

  terapia.parametros.length > 0 && (

    <div key={terapia.id} className="mb-8">

      <h2 className="text-2xl font-bold text-[#0B6A74] mb-4">
        {terapia.Nombre}
      </h2>

      <div className="space-y-3">

        {terapia.parametros.map((parametro: any) => (

          <div
            key={parametro.id}
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

            <p className="font-semibold">
              {parametro["Nombre parámetro"]}
            </p>

            <div className="flex gap-4">

              <a
                href={`/equinos/administracion/parametros/${parametro.id}/editar`}
                className="text-xl"
              >
                ✏️
              </a>

              <a
                href={`/equinos/administracion/parametros/${parametro.id}/eliminar`}
                className="text-xl"
              >
                🗑️
              </a>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

))}

        </div>

      </div>

    </main>

  );

}