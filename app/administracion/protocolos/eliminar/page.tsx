"use client";

import {
  useEffect,
  useState,
  Suspense,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { supabase } from "@/lib/supabase";


function EliminarProtocoloContenido() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const [protocolo, setProtocolo] = useState<any>(null);
  const [cargando, setCargando] = useState(true);


  useEffect(() => {

    if (!id) return;

    cargarProtocolo();

  }, [id]);


  async function cargarProtocolo() {

    const { data, error } = await supabase
      .from("Protocolos")
      .select(`
        *,
        Terapias (
          Nombre
        )
      `)
      .eq("id", id)
      .single();

    if (error) {

      console.log("ERROR:", error);

      return;
    }

    setProtocolo(data);
    setCargando(false);
  }


  async function eliminarProtocolo() {

    if (!id) return;

    const confirmar = confirm(
      "¿Seguro que querés eliminar este protocolo?"
    );

    if (!confirmar) return;


    const { error } = await supabase
      .from("Protocolos")
      .delete()
      .eq("id", id);


    if (error) {

      console.log(
        "ERROR ELIMINANDO:",
        error
      );

      alert(
        "No se pudo eliminar el protocolo. Puede tener parámetros asociados."
      );

      return;
    }


    alert("Protocolo eliminado");

    router.push(
      "/administracion/protocolos"
    );
  }


  if (cargando) {

    return (
      <main className="min-h-screen bg-[#F4F1EB] p-6">

        <div className="max-w-3xl mx-auto">

          <p className="text-gray-500">
            Cargando...
          </p>

        </div>

      </main>
    );

  }


  return (

    <main className="min-h-screen bg-[#F4F1EB] p-6">

      <div
        className="
          max-w-3xl
          mx-auto
          bg-white
          rounded-3xl
          shadow-xl
          p-8
        "
      >

        <h1
          className="
            text-2xl
            font-bold
            text-red-600
            mb-6
          "
        >
          🗑️ Eliminar protocolo
        </h1>


        <p className="text-gray-600 mb-2">
          ¿Querés eliminar este protocolo?
        </p>


        <div
          className="
            bg-gray-50
            rounded-2xl
            p-5
            mb-6
          "
        >

          <p
            className="
              font-bold
              text-[#0B6A74]
              text-lg
            "
          >
            {protocolo?.Nombre}
          </p>


          <p className="text-gray-500 mt-1">
            Terapia:{" "}
            {protocolo?.Terapias?.Nombre || "-"}
          </p>

        </div>


        <div className="flex gap-3">

          <button
            onClick={() =>
              router.push(
                "/administracion/protocolos"
              )
            }
            className="
              flex-1
              border
              border-gray-300
              rounded-xl
              py-3
              font-semibold
            "
          >
            Cancelar
          </button>


          <button
            onClick={eliminarProtocolo}
            className="
              flex-1
              bg-red-600
              text-white
              rounded-xl
              py-3
              font-bold
              hover:bg-red-700
            "
          >
            🗑️ Eliminar
          </button>

        </div>


      </div>

    </main>

  );
}


export default function EliminarProtocolo() {

  return (

    <Suspense
      fallback={
        <main className="min-h-screen bg-[#F4F1EB] p-6">

          <div className="max-w-3xl mx-auto">

            <p className="text-gray-500">
              Cargando...
            </p>

          </div>

        </main>
      }
    >

      <EliminarProtocoloContenido />

    </Suspense>

  );
}