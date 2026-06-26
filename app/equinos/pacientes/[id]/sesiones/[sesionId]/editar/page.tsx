"use client";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import EquinosHeader from "@/app/components/EquinosHeader";

export default function NuevaSesion() {
const params = useParams();

const pacienteId = params.id as string;
const sesionId = params.sesionId as string;

const [fechaSesion, setFechaSesion] = useState("");
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
  cargarSesion();
  cargarTerapiasSesion();
  cargarParametrosSesion();
}, []);
async function cargarSesion() {

  const { data } = await supabase
    .from("Sesiones")
    .select("*")
    .eq("id", sesionId)
    .single();

  if (!data) return;

  setFechaSesion(data["Fecha de sesión"]);
  setVeterinario(data["Veterinario actuante"] || "");
  setLugar(data["Lugar de atención"] || "");
  setEvolucion(data.Evolución || "3");
  setObservaciones(data.Observaciones || "");

}
async function cargarTerapiasSesion() {

  const { data } = await supabase
    .from("Sesión terapias")
    .select("*")
    .eq("Sesión id", sesionId);

  if (!data) return;

  setTerapiasSeleccionadas(
    data.map((t) => t["Terapia id"])
  );

  const estructuras: Record<string, string> = {};

  data.forEach((t) => {
    estructuras[t["Terapia id"]] =
      t["Región anatómica"] || "";
  });

  setEstructuraPorTerapia(estructuras);
}
async function cargarParametrosSesion() {

  const { data: terapiasSesion } = await supabase
    .from("Sesión terapias")
    .select("*")
    .eq("Sesión id", sesionId);

  if (!terapiasSesion) return;

  const idsTerapiasSesion =
    terapiasSesion.map((t) => t.id);

  const { data: parametrosSesion } =
    await supabase
      .from("Sesión parámetros")
      .select("*")
      .in(
        "Sesión terapia id",
        idsTerapiasSesion
      );

  if (!parametrosSesion) return;

  const valores: any = {};

  parametrosSesion.forEach((p) => {
    valores[p["Parámetro id"]] =
      p["Valor seleccionado"];
  });

  setValoresParametros(valores);
}
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
async function actualizarSesion(){
  console.log("BOTON FUNCIONA");

const { error } = await supabase
  .from("Sesiones")
  .update({
    "Fecha de sesión": fechaSesion,
    "Veterinario actuante": veterinario,
    "Lugar de atención": lugar,
    Evolución: evolucion,
    Observaciones: observaciones,
  })
  .eq("id", sesionId);

if (error) {
  console.log("ERROR COMPLETO:", error);

  return;
}
const { data: terapiasViejas } = await supabase
  .from("Sesión terapias")
  .select("id")
  .eq("Sesión id", sesionId);

if (terapiasViejas?.length) {

  const idsTerapiasViejas =
    terapiasViejas.map((t) => t.id);

  await supabase
    .from("Sesión parámetros")
    .delete()
    .in(
      "Sesión terapia id",
      idsTerapiasViejas
    );

  await supabase
    .from("Sesión terapias")
    .delete()
    .eq("Sesión id", sesionId);
}
for (const terapiaId of terapiasSeleccionadas) {

  const { data: terapiaCreada, error: errorTerapia } =
    await supabase
      .from("Sesión terapias")
      .insert([
        {
          "Sesión id": sesionId,
          "Terapia id": terapiaId,
          "Región anatómica":
            estructuraPorTerapia[terapiaId] || null,
        },
      ])
      .select()
      .single();

  if (errorTerapia || !terapiaCreada) {
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
}

}

alert("Sesión actualizada");
}
    return (
    <main className="min-h-screen bg-[#F4F1EB] p-6">

      <EquinosHeader
  titulo="Editar Sesión"
  subtitulo="Modificar sesión terapéutica"
/>

<div className="mb-8" />

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
            onClick={actualizarSesion}
            className="
              bg-[#0B6A74]
              text-white
              font-bold
              py-4
              rounded-2xl
              shadow-lg
            "
          >
            💾 Actualizar Sesión
          </button>

        </div>

      </div>

    </main>
  );
}