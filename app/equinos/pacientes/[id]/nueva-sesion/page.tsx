"use client";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import EquinosHeader from "@/app/components/EquinosHeader";

export default function NuevaSesion() {
  const params = useParams();

  const pacienteId = params.id as string;

const fechaSesion = new Date().toISOString().split("T")[0];
  const [veterinario, setVeterinario] = useState("");
  const [lugar, setLugar] = useState("");
  const [evolucion, setEvolucion] = useState("3");
  const [observaciones, setObservaciones] = useState("");
  const [lugares, setLugares] = useState<any[]>([]);
  const [terapias, setTerapias] = useState<any[]>([]);
const [terapiasSeleccionadas, setTerapiasSeleccionadas] = useState<string[]>([]);
const [parametros, setParametros] = useState<any[]>([]);
const [opcionesParametros, setOpcionesParametros] = useState<any[]>([]);
const [valoresParametros, setValoresParametros] = useState<any>({});
const [estructuras, setEstructuras] = useState<any[]>([]);
const [estructuraPorTerapia, setEstructuraPorTerapia] = useState<Record<string, string>>({});
useEffect(() => {
  cargarLugares();
  cargarTerapias();
  cargarParametros();
  cargarEstructuras();
  cargarOpcionesParametros();
}, []);
async function cargarLugares() {
  const { data, error } = await supabase
    .from("Lugares")
    .select("*");

  console.log("LUGARES:", data);
  console.log("ERROR:", error);

  setLugares(data || []);
}
async function cargarTerapias() {
  const { data, error } = await supabase
    .from("Terapias")
    .select("*");

  console.log("TERAPIAS:", data);
  console.log("ERROR TERAPIAS:", error);

  if (data) {
    setTerapias(data);
  }
}
async function cargarEstructuras() {
  const { data, error } = await supabase
    .from("Estructuras anatómicas")
    .select("*")
    .eq("Activa", true);

  console.log("ESTRUCTURAS:", data);
  console.log("ERROR ESTRUCTURAS:", error);

  setEstructuras(data || []);
}
async function cargarParametros() {
  const { data } = await supabase
    .from("Parámetros terapias")
    .select("*");

  if (data) {
    setParametros(data);
  }
}
async function cargarOpcionesParametros() {
  const { data } = await supabase
    .from("Opciones parámetros")
    .select("*");

  if (data) {
    setOpcionesParametros(data);
  }
}
async function guardarSesion() {
  console.log("BOTON FUNCIONA");

const { data: sesionCreada, error } =
  await supabase
    .from("Sesiones")
    .insert([
      {
        "Paciente id": pacienteId,
        "Fecha de sesión": fechaSesion,
        "Veterinario actuante": veterinario,
        "Lugar de atención": lugar,
        Evolución: evolucion,
        Observaciones: observaciones,
      },
    ])
    .select()
    .single();

if (error) {
  console.log("ERROR COMPLETO:", error);
  alert(JSON.stringify(error));
  return;
}
console.log("SESION CREADA:", sesionCreada);
for (const terapiaId of terapiasSeleccionadas) {

const { data: terapiaCreada, error: errorTerapia } =
  await supabase
    .from("Sesión terapias")
    .insert([
      {
        "Sesión id": sesionCreada.id,
        "Terapia id": terapiaId,
        "Región anatómica":
          estructuraPorTerapia[terapiaId] || null,
      },
    ])
      .select()
      .single();

  if (errorTerapia) {
    console.log(
      "ERROR GUARDANDO TERAPIA:",
      errorTerapia
    );
    continue;
  }

  const parametrosDeEstaTerapia =
    parametros.filter(
      (p) => p["Terapia id"] === terapiaId
    );

  for (const parametro of parametrosDeEstaTerapia) {

    const valorSeleccionado =
      valoresParametros[parametro.id];

    if (!valorSeleccionado) continue;

    const { error: errorParametro } =
      await supabase
        .from("Sesión parámetros")
        .insert([
          {
            "Sesión terapia id":
              terapiaCreada.id,

            "Parámetro id":
              parametro.id,

            "Valor seleccionado":
              valorSeleccionado,
          },
        ]);

    if (errorParametro) {
      console.log(
        "ERROR PARAMETRO:",
        errorParametro
      );
    }
  }
}
console.log("PARAMETROS:", valoresParametros);
    alert("Sesión guardada");
  }
    return (
    <main className="min-h-screen bg-[#F4F1EB] p-6">

<EquinosHeader
  titulo="Nueva Sesión"
  subtitulo="Registrar sesión terapéutica"
/>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <div className="grid gap-5">

         <input
  type="date"
  value={fechaSesion}
  readOnly
  className="p-4 rounded-2xl border border-gray-300 bg-gray-100"
/>
          <input
            type="text"
            placeholder="Veterinario actuante"
            value={veterinario}
            onChange={(e) => setVeterinario(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          />

<select
  value={lugar}
  onChange={(e) => setLugar(e.target.value)}
  className="p-4 rounded-2xl border border-gray-300"
>
  <option value="">
    Seleccionar lugar de atención
  </option>

  {lugares.map((lugarItem) => (
    <option
      key={lugarItem.id}
      value={lugarItem.Nombre}
    >
      {lugarItem.Nombre}
    </option>
  ))}
</select>

          <div className="bg-gray-50 rounded-2xl p-4">

  <p className="font-semibold mb-3">
    Evolución
  </p>

  <div className="flex flex-col gap-2">

    <label>
      <input
        type="radio"
        name="evolucion"
        value="1"
        checked={evolucion === "1"}
        onChange={(e) => setEvolucion(e.target.value)}
      />
      {" "}🔴 Peor
    </label>

    <label>
      <input
        type="radio"
        name="evolucion"
        value="2"
        checked={evolucion === "2"}
        onChange={(e) => setEvolucion(e.target.value)}
      />
      {" "}🟠 Levemente peor
    </label>

    <label>
      <input
        type="radio"
        name="evolucion"
        value="3"
        checked={evolucion === "3"}
        onChange={(e) => setEvolucion(e.target.value)}
      />
      {" "}🟡 Igual
    </label>

    <label>
      <input
        type="radio"
        name="evolucion"
        value="4"
        checked={evolucion === "4"}
        onChange={(e) => setEvolucion(e.target.value)}
      />
      {" "}🟢 Levemente mejor
    </label>

    <label>
      <input
        type="radio"
        name="evolucion"
        value="5"
        checked={evolucion === "5"}
        onChange={(e) => setEvolucion(e.target.value)}
      />
      {" "}🟢🟢 Mejor
    </label>

  </div>

</div>
<div className="bg-gray-50 rounded-2xl p-4">

  <p className="font-semibold mb-3">
    Terapias realizadas
  </p>

  <div className="grid gap-2">

    {terapias.map((terapia) => (

      <label
        key={terapia.id}
        className="flex items-center gap-3"
      >
{terapiasSeleccionadas.includes(terapia.id) && (

  <div className="ml-8 mt-2 mb-4 bg-gray-50 p-4 rounded-xl">
<div className="mb-4">

  <p className="font-medium">
    Estructura anatómica
  </p>

  <select
    value={estructuraPorTerapia[terapia.id] || ""}
    onChange={(e) =>
      setEstructuraPorTerapia({
        ...estructuraPorTerapia,
        [terapia.id]: e.target.value,
      })
    }
    className="w-full mt-1 p-2 border rounded-xl"
  >
    <option value="">
      Seleccionar estructura
    </option>

    {estructuras.map((estructura) => (
      <option
        key={estructura.id}
        value={estructura.Nombre}
      >
        {estructura.Nombre}
      </option>
    ))}
  </select>

</div>
    {parametros
      .filter(
        (p) => p["Terapia id"] === terapia.id
      )
      .map((parametro) => (

        <div
          key={parametro.id}
          className="mb-3"
        >

          <p className="font-medium">
            {parametro["Nombre parámetro"]}
          </p>

        <select
  value={valoresParametros[parametro.id] || ""}
  onChange={(e) =>
    setValoresParametros({
      ...valoresParametros,
      [parametro.id]: e.target.value,
    })
  }
  className="w-full mt-1 p-2 border rounded-xl"
>
  <option value="">
    Seleccionar
  </option>

  {opcionesParametros
    .filter(
      (opcion) =>
        opcion["Parámetro id"] === parametro.id
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

)}
        <input
          type="checkbox"
          checked={terapiasSeleccionadas.includes(terapia.id)}
          onChange={(e) => {

            if (e.target.checked) {
              setTerapiasSeleccionadas([
                ...terapiasSeleccionadas,
                terapia.id,
              ]);
            } else {
              setTerapiasSeleccionadas(
                terapiasSeleccionadas.filter(
                  (id) => id !== terapia.id
                )
              );
            }
          }}
        />

        {terapia.Nombre}

      </label>

    ))}

  </div>

</div>
          <textarea
            rows={5}
            placeholder="Observaciones"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          />
                    <button
            onClick={guardarSesion}
            className="
              bg-[#0B6A74]
              text-white
              font-bold
              py-4
              rounded-2xl
              shadow-lg
            "
          >
            💾 Guardar Sesión
          </button>

        </div>

      </div>

    </main>
  );
}