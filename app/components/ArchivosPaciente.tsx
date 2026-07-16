"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  pacienteId: string;
};

export default function ArchivosPaciente({
  pacienteId,
}: Props) {

  const [archivos, setArchivos] = useState<any[]>([]);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [categoria, setCategoria] = useState("Otros");
  const [subiendo, setSubiendo] = useState(false);
const [cargandoArchivos, setCargandoArchivos] = useState(false);

  useEffect(() => {
    cargarArchivos();
  }, []);


  async function cargarArchivos() {

  setCargandoArchivos(true);

  const { data, error } = await supabase
    .from("Archivos pacientes")
    .select("*")
    .eq("Paciente id", pacienteId)
    .order("Fecha subida", {
      ascending: false,
    });


  if (error) {
    console.log("ERROR CARGANDO ARCHIVOS:", error);
    setCargandoArchivos(false);
    return;
  }


  setArchivos(data || []);

  setCargandoArchivos(false);
}
async function eliminarArchivo(archivo:any){

  const nombreStorage =
    archivo.URL.split("/").pop();


  await supabase.storage
    .from("archivos-pacientes")
    .remove([
      nombreStorage
    ]);


  const { error } =
    await supabase
      .from("Archivos pacientes")
      .delete()
      .eq("id", archivo.id);


  if(error){
    console.log(
      "ERROR ELIMINANDO:",
      error
    );
    return;
  }


  cargarArchivos();

}
  async function subirArchivo() {

    if (!archivo) return;


    setSubiendo(true);


    const extension =
      archivo.name.split(".").pop();


    const nombreArchivo =
      `${Date.now()}.${extension}`;



    const { error: errorStorage } =
      await supabase.storage
        .from("archivos-pacientes")
        .upload(
          nombreArchivo,
          archivo
        );


    if (errorStorage) {

      console.log(
        "ERROR SUBIENDO ARCHIVO:",
        errorStorage
      );

      setSubiendo(false);
      return;
    }



    const { data } =
      supabase.storage
        .from("archivos-pacientes")
        .getPublicUrl(nombreArchivo);



    await supabase
      .from("Archivos pacientes")
      .insert([
        {
          "Paciente id": pacienteId,
          "Nombre archivo": archivo.name,
          URL: data.publicUrl,
          Categoría: categoria,
          "Tipo archivo": archivo.type,
          "Fecha subida":
            new Date()
              .toISOString()
              .split("T")[0],
        },
      ]);



    setArchivo(null);
    setCategoria("Otros");

    await cargarArchivos();

    setSubiendo(false);

  }



  return (

    <div
      className="
        bg-white
        rounded-3xl
        shadow-xl
        p-6
        mt-6
      "
    >

      <h2
        className="
          text-xl
          font-bold
          text-[#0B6A74]
          mb-5
        "
      >
        📎 Archivos del paciente
      </h2>


      <div className="grid gap-4">


        <select
          value={categoria}
          onChange={(e)=>
            setCategoria(e.target.value)
          }
          className="
            p-3
            border
            rounded-xl
          "
        >

          <option>
            Radiografías
          </option>

          <option>
            Ecografías
          </option>

          <option>
            Análisis de sangre
          </option>

          <option>
            Videos
          </option>

          <option>
            Fotos
          </option>

          <option>
            Otros
          </option>

        </select>



        <input
          type="file"
          onChange={(e)=>
            setArchivo(
              e.target.files?.[0] || null
            )
          }
          className="
            p-3
            border
            rounded-xl
          "
        />



        <button
          onClick={subirArchivo}
          disabled={subiendo}
          className="
            bg-[#0B6A74]
            text-white
            font-bold
            p-3
            rounded-xl
            hover:scale-105
            transition
          "
        >

          {subiendo
            ? "Subiendo..."
            : "⬆️ Subir archivo"}

        </button>


      </div>

<div className="mt-6">

<h3 className="text-lg font-bold text-[#0B6A74] mb-4">
  📂 Archivos guardados
</h3>


{
  Object.entries(
    archivos.reduce((acc:any, archivo:any) => {

      const categoria = archivo.Categoría || "Otros";

      if (!acc[categoria]) {
        acc[categoria] = [];
      }

      acc[categoria].push(archivo);

      return acc;

    }, {})
  ).map(([categoria, archivosCategoria]:any) => (

    <div
      key={categoria}
      className="mb-5"
    >

      <h4 className="font-bold text-gray-700 mb-2">
        {categoria}
      </h4>


      <div className="grid gap-2">

      {archivosCategoria.map((archivo:any)=>(

        <div
          key={archivo.id}
          className="
            bg-gray-50
            rounded-xl
            p-3
            flex
            justify-between
            items-center
          "
        >

          <div>

            <p className="font-medium">
              📄 {archivo["Nombre archivo"]}
            </p>

            <p className="text-xs text-gray-500">
              {archivo["Fecha subida"]}
            </p>

          </div>


          <div className="flex gap-3">

            <a
              href={archivo.URL}
              target="_blank"
              className="
                text-[#0B6A74]
                font-semibold
                text-sm
              "
            >
              Abrir
            </a>


            <button
              onClick={() => eliminarArchivo(archivo)}
              className="
                text-red-500
                hover:text-red-700
              "
            >
              🗑️
            </button>


          </div>

        </div>

      ))}

      </div>

    </div>

  ))
}

</div>

    </div>

  );
}