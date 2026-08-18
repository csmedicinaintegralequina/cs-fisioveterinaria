"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Razas() {

  const [razas, setRazas] = useState<any[]>([]);
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");


  useEffect(() => {
    cargarRazas();
  }, []);


  async function cargarRazas() {

    const { data, error } = await supabase
      .from("Razas")
      .select("*")
      .order("Especie")
      .order("Nombre");

    if (error) {
      console.log("ERROR RAZAS:", error);
      alert(error.message);
      return;
    }

    setRazas(data || []);
  }


async function agregarRaza() {

  if (!nombre.trim() || !especie) {
    alert("Completá nombre y especie");
    return;
  }

  const { error } = await supabase
    .from("Razas")
    .insert([
      {
        Nombre: nombre.trim(),
        Especie: especie,
      },
    ]);

  if (error) {
    console.log("ERROR AGREGANDO RAZA:", error);
    alert(error.message);
    return;
  }

  const volver = new URLSearchParams(
    window.location.search
  ).get("volver");

  if (volver === "paciente") {

    const borrador = sessionStorage.getItem(
      "pacienteFormBorrador"
    );

    if (borrador) {

      const datos = JSON.parse(borrador);

      datos.raza = nombre.trim();

      sessionStorage.setItem(
        "pacienteFormBorrador",
        JSON.stringify(datos)
      );

      router.push(
        datos.returnUrl || "/administracion"
      );

      return;
    }
  }

  setNombre("");
  setEspecie("");

  cargarRazas();
}


  async function eliminarRaza(id: string) {

    const confirmar = confirm(
      "¿Seguro que querés eliminar esta raza?"
    );

    if (!confirmar) return;


    const { error } = await supabase
      .from("Razas")
      .delete()
      .eq("id", id);


    if (error) {
      console.log("ERROR ELIMINANDO RAZA:", error);
      alert(error.message);
      return;
    }


    cargarRazas();
  }


  const especies = [
    {
      nombre: "Equinos",
      valor: "Equino",
      emoji: "🐴",
    },
    {
      nombre: "Caninos",
      valor: "Canino",
      emoji: "🐶",
    },
    {
      nombre: "Felinos",
      valor: "Felino",
      emoji: "🐱",
    },
  ];


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
              🐾 Razas
            </h1>

            <p className="text-gray-500 mt-2">
              Razas disponibles por especie
            </p>

          </div>


          <Link
            href="/administracion"
            className="
              text-sm
              font-semibold
              text-[#0B6A74]
              hover:underline
            "
          >
            ← Administración
          </Link>

        </div>


        {/* AGREGAR RAZA */}

        <div className="
          bg-gray-50
          rounded-2xl
          p-5
          mb-8
        ">

          <h2 className="
            text-lg
            font-bold
            text-[#0B6A74]
            mb-4
          ">
            ➕ Agregar raza
          </h2>


          <div className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-3
          ">

            <input
              type="text"
              placeholder="Nombre de la raza"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="
                p-3
                rounded-xl
                border
                border-gray-300
              "
            />


            <select
              value={especie}
              onChange={(e) => setEspecie(e.target.value)}
              className="
                p-3
                rounded-xl
                border
                border-gray-300
              "
            >

              <option value="">
                Seleccionar especie
              </option>

              {especies.map((item) => (

                <option
                  key={item.valor}
                  value={item.valor}
                >
                  {item.nombre}
                </option>

              ))}

            </select>


            <button
              onClick={agregarRaza}
              className="
                bg-[#0B6A74]
                text-white
                font-bold
                rounded-xl
                px-4
                py-3
                hover:opacity-90
              "
            >
              ➕ Agregar
            </button>

          </div>

        </div>


        {/* LISTADO */}

        <div className="grid gap-6">

          {especies.map((item) => {

            const razasEspecie = razas.filter(
              (raza) =>
                raza.Especie === item.valor
            );


            return (

              <div
                key={item.valor}
                className="
                  bg-gray-50
                  rounded-2xl
                  p-5
                "
              >

                <h2 className="
                  text-lg
                  font-bold
                  text-[#0B6A74]
                  mb-3
                ">
                  {item.emoji} {item.nombre}
                </h2>


                {razasEspecie.length === 0 ? (

                  <p className="
                    text-sm
                    text-gray-400
                  ">
                    No hay razas cargadas.
                  </p>

                ) : (

                  <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-2
                  ">

                    {razasEspecie.map(
                      (raza) => (

                        <div
                          key={raza.id}
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
                            gap-2
                          "
                        >

                          <span className="
                            text-gray-700
                            font-medium
                          ">
                            {raza.Nombre}
                          </span>


                          <button
                            onClick={() =>
                              eliminarRaza(raza.id)
                            }
                            className="
                              text-red-600
                              hover:scale-110
                              transition
                            "
                            title="Eliminar raza"
                          >
                            🗑️
                          </button>

                        </div>

                      )
                    )}

                  </div>

                )}

              </div>

            );

          })}

        </div>

      </div>

    </main>

  );
}