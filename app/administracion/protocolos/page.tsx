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

    const { data, error } = await supabase
  .from("Protocolos")
  .select(`
  *,
  Terapias (
    Nombre
  ),
  Parámetros protocolo (
    id,
    valor,
    Parámetros terapias (
      "Nombre parámetro"
    )
  )
`)
  .order("Nombre");


   if (error) {

  console.log("ERROR PROTOCOLOS");
  console.log(error);

  alert(error.message);

  return;
}

console.log("DATA:", data);

    setProtocolos(data || []);
console.log(data);
  }



  return (

    <main className="min-h-screen bg-[#F4F1EB] p-6">


      <div className="
        max-w-5xl
        mx-auto
        bg-white
        rounded-3xl
        shadow-xl
        p-8
      ">


        <div className="
          flex
          justify-between
          items-center
          mb-8
        ">


          <div>

            <h1 className="
              text-3xl
              font-bold
              text-[#0B6A74]
            ">
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



        <div className="grid gap-4">


          {protocolos.map((protocolo)=>(


            <div
              key={protocolo.id}
              className="
                bg-gray-50
                rounded-2xl
                p-5
              "
            >


              <h2 className="
                text-xl
                font-bold
                text-[#0B6A74]
              ">

                {protocolo.Nombre}

              </h2>



              <p className="text-gray-600 mt-2">

                {protocolo.Terapias?.Nombre}

              </p>
<div className="mt-4">

<p className="
font-semibold
text-gray-700
">
Parámetros:
</p>


<ul className="mt-2 text-gray-600">

{
protocolo["Parámetros protocolo"]?.map(
(parametro:any)=>(
  
<li key={parametro.id}>

• {parametro["Parámetros terapias"]?.["Nombre parámetro"]}: {parametro.valor}

</li>

))
}

</ul>

</div>

            </div>


          ))}



          {protocolos.length === 0 && (

            <p className="text-gray-500 text-center py-8">

              Todavía no hay protocolos creados.

            </p>

          )}



        </div>



      </div>


    </main>

  );

}