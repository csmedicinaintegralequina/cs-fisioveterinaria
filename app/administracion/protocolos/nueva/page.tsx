"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProtocolosAdmin() {

  const [terapias, setTerapias] = useState<any[]>([]);
  const [terapiaSeleccionada, setTerapiaSeleccionada] = useState("");
const [opcionesParametros, setOpcionesParametros] = useState<any[]>([]);
const [valoresSeleccionados, setValoresSeleccionados] = useState<Record<string,string>>({});
const [nombreProtocolo, setNombreProtocolo] = useState("");
  const [parametros, setParametros] = useState<any[]>([]);


  useEffect(() => {

    cargarTerapias();

  }, []);



  async function cargarTerapias() {

    const { data, error } = await supabase
      .from("Terapias")
      .select("*")
      .eq("Activa", true)
      .order("Nombre");


    if (error) {
      console.log(error);
      return;
    }


    setTerapias(data || []);

  }



  async function cargarParametros(terapiaId:string) {


    const { data, error } = await supabase
      .from("Parámetros terapias")
      .select("*")
      .eq("Terapia id", terapiaId);



    if (error) {
      console.log(error);
      return;
    }


    setParametros(data || []);
cargarOpciones(data || []);
  }
async function cargarOpciones(parametros:any[]) {

  const ids = parametros.map(
    (p)=>p.id
  );


  const { data, error } = await supabase
    .from("Opciones parámetros")
    .select("*")
    .in("Parámetro id", ids);


  if(error){
    console.log(error);
    return;
  }


  setOpcionesParametros(data || []);

}
async function guardarProtocolo() {

  if (!terapiaSeleccionada) {
    alert("Seleccioná una terapia");
    return;
  }


  if (!nombreProtocolo) {
    alert("Poné un nombre al protocolo");
    return;
  }



  // Crear protocolo

  const { data: protocolo, error } =
    await supabase
      .from("Protocolos")
      .insert([
        {
          "Terapia id": terapiaSeleccionada,
          "Nombre": nombreProtocolo,
        },
      ])
      .select()
      .single();



  if (error) {

    console.log(error);
    alert(error.message);
    return;

  }



  // Crear parámetros del protocolo

  const parametrosGuardar =
    Object.entries(valoresSeleccionados)
    .map(([parametroId, valor]) => ({

      "Protocolo id": protocolo.id,

      "Parámetro id": parametroId,

      "valor": valor,

    }));



  if (parametrosGuardar.length > 0) {


    const { error: errorParametros } =
      await supabase
        .from("Parámetros protocolo")
        .insert(parametrosGuardar);



    if (errorParametros) {

      console.log(errorParametros);

      alert(errorParametros.message);

      return;

    }

  }



  alert("Protocolo guardado correctamente");
window.location.href =
  "/administracion/protocolos";

  // limpiar

  setNombreProtocolo("");

  setValoresSeleccionados({});


}

  return (

    <main className="min-h-screen bg-[#F4F1EB] p-6">


      <div className="
        max-w-4xl
        mx-auto
        bg-white
        rounded-3xl
        shadow-xl
        p-8
      ">


        <h1 className="
          text-3xl
          font-bold
          text-[#0B6A74]
          mb-6
        ">
          ⚙️ Crear protocolo
        </h1>



        <label className="font-semibold">
          Terapia
        </label>


        <select

          className="
            w-full
            mt-2
            p-3
            border
            rounded-xl
          "


          value={terapiaSeleccionada}


          onChange={(e)=>{

            const id = e.target.value;

            setTerapiaSeleccionada(id);

            cargarParametros(id);

          }}

        >

          <option value="">
            Seleccionar terapia
          </option>


          {terapias.map((terapia)=>(

            <option
              key={terapia.id}
              value={terapia.id}
            >
              {terapia.Nombre}
            </option>

          ))}


        </select>

<div className="mt-6">

<label className="font-semibold">
Nombre del protocolo
</label>

<input
  value={nombreProtocolo}
  onChange={(e)=>
    setNombreProtocolo(e.target.value)
  }
  className="
    w-full
    mt-2
    p-3
    border
    rounded-xl
  "
  placeholder="Ej: Muscular 8 Hz"
/>

</div>

        <div className="mt-6">


          <h2 className="
            text-xl
            font-bold
            text-[#0B6A74]
          ">
            Parámetros disponibles
          </h2>



{parametros.map((parametro) => (

  <div
    key={parametro.id}
    className="mt-4"
  >

    <label className="font-medium">
      {parametro["Nombre parámetro"]}
    </label>

    <select
      className="
        w-full
        mt-2
        p-3
        border
        rounded-xl
      "
      value={
        valoresSeleccionados[parametro.id] || ""
      }
      onChange={(e) =>
        setValoresSeleccionados({
          ...valoresSeleccionados,
          [parametro.id]: e.target.value,
        })
      }
    >

      <option value="">
        Seleccionar
      </option>

      {opcionesParametros
        .filter(
          (o) =>
            o["Parámetro id"] === parametro.id
        )
        .map((opcion) => (

          <option
            key={opcion.id}
            value={opcion.Valor}
          >
            {opcion.Valor}
          </option>

        ))}

    </select>

  </div>

))}



        </div>
<button

onClick={guardarProtocolo}

className="
mt-8
w-full
bg-[#0B6A74]
text-white
font-bold
p-4
rounded-xl
hover:scale-105
transition
"

>

💾 Guardar protocolo

</button>

      </div>


    </main>

  );

}