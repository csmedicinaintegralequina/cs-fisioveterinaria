"use client";
import { Suspense } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import EquinosHeader from "@/app/components/EquinosHeader";

export default function NuevaOpcion() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <NuevaOpcionContenido />
    </Suspense>
  );
}


function NuevaOpcionContenido() {

  const router = useRouter();
  const searchParams = useSearchParams();
const volver = searchParams.get("volver");
  const parametroId =
    searchParams.get("parametro");

  const [valor, setValor] = useState("");

  async function guardarOpcion() {

    if (!valor.trim()) {
      alert("Ingresá un valor.");
      return;
    }

    const { error } = await supabase
      .from("Opciones parámetros")
      .insert([
        {
          "Parámetro id": parametroId,
          Valor: valor,
        },
      ]);

    if (error) {
      console.log(error);
      alert("Error al guardar.");
      return;
    }

    if (volver) {
  router.push(volver);
} else {
  router.back();
}

  }

  return (

    <main className="min-h-screen bg-[#F4F1EB] p-6">

      <EquinosHeader
        titulo="Nueva opción"
        subtitulo="Agregar opción al parámetro"
      />

      <div className="max-w-xl mx-auto mt-8 bg-white rounded-3xl shadow-xl p-8">

        <div className="grid gap-6">

          <input
            type="text"
            placeholder="Valor"
            value={valor}
            onChange={(e) =>
              setValor(e.target.value)
            }
            className="
              p-4
              rounded-2xl
              border
              border-gray-300
            "
          />

          <button
            onClick={guardarOpcion}
            className="
              bg-[#0B6A74]
              text-white
              font-bold
              py-4
              rounded-2xl
              shadow-lg
            "
          >
            💾 Guardar opción
          </button>

        </div>

      </div>

    </main>

  );

}