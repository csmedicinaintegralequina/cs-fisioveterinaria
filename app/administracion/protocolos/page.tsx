"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Protocolos() {

  const [protocolos, setProtocolos] = useState<any[]>([]);


  useEffect(() => {

    cargarProtocolos();

  }, []);



  async function cargarProtocolos() {

  const { data: protocolosData, error: errorProtocolos } =
    await supabase
      .from("Protocolos")
      .select(`
        *,
        Terapias (
          Nombre
        )
      `)
      .order("Nombre");

  if (errorProtocolos) {
    console.log("ERROR PROTOCOLOS:", errorProtocolos);
    alert(errorProtocolos.message);
    return;
  }

  const { data: parametrosData, error: errorParametros } =
    await supabase
      .from("Parámetros protocolo")
      .select("*");

  if (errorParametros) {
    console.log(
      "ERROR PARÁMETROS PROTOCOLO:",
      errorParametros
    );
    alert(errorParametros.message);
    return;
  }

  const {
    data: parametrosTerapiasData,
    error: errorParametrosTerapias,
  } = await supabase
    .from("Parámetros terapias")
    .select("*");

  if (errorParametrosTerapias) {
    console.log(
      "ERROR PARÁMETROS TERAPIAS:",
      errorParametrosTerapias
    );
    alert(errorParametrosTerapias.message);
    return;
  }

  const protocolosConParametros =
    (protocolosData || []).map((protocolo: any) => ({
      ...protocolo,

      "Parámetros protocolo":
        (parametrosData || [])
          .filter(
            (parametro: any) =>
              parametro["Protocolo id"] === protocolo.id
          )
          .map((parametro: any) => {

            const parametroTerapia =
              (parametrosTerapiasData || []).find(
                (p: any) =>
                  p.id === parametro["Parámetro id"]
              );

            return {
              ...parametro,

              "Parámetros terapias":
                parametroTerapia || null,
            };
          }),
    }));

  console.log(
    "PROTOCOLOS COMPLETOS:",
    protocolosConParametros
  );

  setProtocolos(protocolosConParametros);
}



return (
  <main className="min-h-screen bg-[#F4F1EB] p-6">

    <div
      className="
        max-w-5xl
        mx-auto
        bg-white
        rounded-3xl
        shadow-xl
        p-8
      "
    >

      <div
        className="
          flex
          justify-between
          items-center
          mb-8
        "
      >

        <div>

          <h1
            className="
              text-3xl
              font-bold
              text-[#0B6A74]
            "
          >
            📋 Protocolos
          </h1>

          <p className="text-gray-500 mt-2">
            Protocolos terapéuticos creados
          </p>

        </div>


        <Link href="/administracion/protocolos/nueva">

          <button
            className="
              bg-[#0B6A74]
              text-white
              font-bold
              px-5
              py-3
              rounded-xl
              hover:scale-105
              transition
            "
          >
            ➕ Nuevo protocolo
          </button>

        </Link>

      </div>


      <div className="grid gap-6">

        {protocolos.length === 0 ? (

          <p className="text-gray-500 text-center py-8">
            Todavía no hay protocolos creados.
          </p>

        ) : (

          Object.entries(
            protocolos.reduce((grupos: any, protocolo: any) => {

              const terapia =
                protocolo.Terapias?.Nombre || "Sin terapia";

              if (!grupos[terapia]) {
                grupos[terapia] = [];
              }

              grupos[terapia].push(protocolo);

              return grupos;

            }, {})
          ).map(
            ([terapia, protocolosTerapia]: any) => (

              <div
                key={terapia}
                className="
                  bg-gray-50
                  rounded-2xl
                  p-5
                "
              >

                <h2
                  className="
                    text-lg
                    font-bold
                    text-[#0B6A74]
                    mb-3
                  "
                >
                  💡 {terapia}
                </h2>


                <div className="space-y-2">

                  {protocolosTerapia.map(
                    (protocolo: any) => (

                      <div
                        key={protocolo.id}
                        className="
                          bg-white
                          rounded-xl
                          px-4
                          py-3
                          border
                          border-gray-200
                          flex
                          items-center
                          justify-between
                          gap-4
                        "
                      >

                        <div className="flex-1">

                          <div
                            className="
                              font-semibold
                              text-gray-800
                            "
                          >
                            {protocolo.Nombre}
                          </div>


                          {protocolo["Parámetros protocolo"]?.length > 0 && (

                            <div
                              className="
                                mt-1
                                text-xs
                                text-gray-500
                              "
                            >

                              {protocolo["Parámetros protocolo"]
                                .map((parametro: any) => {

                                  const nombre =
                                    parametro[
                                      "Parámetros terapias"
                                    ]?.[
                                      "Nombre parámetro"
                                    ];

                                  const valor =
                                    parametro.valor;

                                  return `${nombre || "Parámetro"}: ${valor || "-"}`;

                                })
                                .join(" • ")}

                            </div>

                          )}

                        </div>


                        <Link
                          href={`/administracion/protocolos/eliminar?id=${protocolo.id}`}
                          className="
                            text-red-600
                            text-xl
                            hover:scale-110
                            transition
                            shrink-0
                          "
                          title="Eliminar protocolo"
                        >
                          🗑️
                        </Link>

                      </div>

                    )
                  )}

                </div>

              </div>

            )
          )

        )}

      </div>

    </div>

  </main>
);
}