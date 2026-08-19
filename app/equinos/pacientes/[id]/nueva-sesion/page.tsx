"use client";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import EquinosHeader from "@/app/components/EquinosHeader";
import TerapiaCard from "@/app/components/TerapiaCard";

export default function NuevaSesion() {
  const params = useParams();
const router = useRouter();
  const pacienteId = params.id as string;
const [pesoPaciente, setPesoPaciente] = useState("");
const [numeroSesion, setNumeroSesion] = useState(1);
const [fechaSesion, setFechaSesion] =
  useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [veterinario, setVeterinario] = useState("");
  const [lugar, setLugar] = useState("");
  const [evolucion, setEvolucion] = useState("3");
  const [observaciones, setObservaciones] = useState("");
  const [lugares, setLugares] = useState<any[]>([]);
  const [veterinarios, setVeterinarios] = useState<any[]>([]);
  const [terapias, setTerapias] = useState<any[]>([]);
  const [parametros, setParametros] = useState<any[]>([]);
const [opcionesParametros, setOpcionesParametros] = useState<any[]>([]);
const [parametrosProtocolo, setParametrosProtocolo] = useState<any[]>([]);
const [protocolos, setProtocolos] = useState<any[]>([]);
type TerapiaSel = {
  terapiaId: string;
  aplicaciones: any[];
};

const [terapiasSeleccionadas, setTerapiasSeleccionadas] = useState<TerapiaSel[]>([]);
function guardarBorradorSesion(
  terapiaId: string,
  aplicacionIndex: number
) {
  sessionStorage.setItem(
    "sesionBorrador",
    JSON.stringify({
      terapias: terapiasSeleccionadas,
      terapiaId,
      aplicacionIndex,
      veterinario,
      lugar,
      evolucion,
      observaciones,
    })
  );
}
const [estructuras, setEstructuras] = useState<any[]>([]);
const [valoresParametros, setValoresParametros] = useState<Record<string, string>>({});
const [estructuraPorTerapia, setEstructuraPorTerapia] = useState<Record<string, string>>({});
useEffect(() => {
  cargarLugares();
  cargarVeterinarios();
  cargarTerapias();
  cargarEstructuras();
  cargarParametros();
  cargarOpcionesParametros();
  cargarPesoPaciente();
  cargarNumeroSesion();
  cargarProtocolos();
  cargarParametrosProtocolo();

  const guardado =
    sessionStorage.getItem("sesionBorrador");

  const estructuraNueva =
    new URLSearchParams(window.location.search).get(
      "estructura"
    );

  if (guardado) {
  const borradorGuardado =
    JSON.parse(guardado);

  const terapiasGuardadas =
    borradorGuardado.terapias;

  const terapiaId =
    borradorGuardado.terapiaId;

  const aplicacionIndex =
    borradorGuardado.aplicacionIndex;
const veterinarioGuardado =
  borradorGuardado.veterinario;

const lugarGuardado =
  borradorGuardado.lugar;

const evolucionGuardada =
  borradorGuardado.evolucion;

const observacionesGuardadas =
  borradorGuardado.observaciones;
if (veterinarioGuardado !== undefined) {
  setVeterinario(veterinarioGuardado);
}

if (lugarGuardado !== undefined) {
  setLugar(lugarGuardado);
}

if (evolucionGuardada !== undefined) {
  setEvolucion(evolucionGuardada);
}

if (observacionesGuardadas !== undefined) {
  setObservaciones(observacionesGuardadas);
}

  if (estructuraNueva) {
    const terapiasActualizadas =
      terapiasGuardadas.map(
        (terapia: any) => {

          if (terapia.terapiaId !== terapiaId) {
            return terapia;
          }

          return {
            ...terapia,
            aplicaciones:
              terapia.aplicaciones.map(
                (
                  aplicacion: any,
                  index: number
                ) => {

                  if (
                    index !== aplicacionIndex
                  ) {
                    return aplicacion;
                  }

                  if (
                    aplicacion.estructuras.includes(
                      estructuraNueva
                    )
                  ) {
                    return aplicacion;
                  }

                  return {
                    ...aplicacion,
                    estructuras: [
                      ...aplicacion.estructuras,
                      estructuraNueva,
                    ],
                  };
                }
              ),
          };
        }
      );

    setTerapiasSeleccionadas(
      terapiasActualizadas
    );
  } else {
    setTerapiasSeleccionadas(
      terapiasGuardadas
    );
  }

  sessionStorage.removeItem(
    "sesionBorrador"
  );

  window.history.replaceState(
    {},
    "",
    window.location.pathname
  );
}
}, []);
async function cargarLugares() {
  const { data, error } = await supabase
    .from("Lugares")
    .select("*");

  console.log("LUGARES:", data);
  console.log("ERROR:", error);

  const lista = data || [];

  setLugares(lista);

  const ultimoLugar = localStorage.getItem("ultimoLugar");

  if (ultimoLugar) {
    const existe = lista.some(
      (lugarItem: any) =>
        lugarItem.Nombre === ultimoLugar
    );

    if (existe) {
      setLugar(ultimoLugar);
    }
  }
}
async function cargarVeterinarios() {
  const { data, error } = await supabase
    .from("Veterinarios")
    .select("*");

  console.log("VETERINARIOS:", data);
  console.log("ERROR VETERINARIOS:", error);

  setVeterinarios(data || []);
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

  setParametros(data || []);
}

async function cargarOpcionesParametros() {
  const { data } = await supabase
    .from("Opciones parámetros")
    .select("*");

  setOpcionesParametros(data || []);
}
async function cargarProtocolos() {
  const { data, error } = await supabase
    .from("Protocolos")
    .select("*");

  if (error) {
    console.log(error);
    return;
  }

  setProtocolos(data || []);
}
async function cargarParametrosProtocolo() {
  const { data, error } = await supabase
    .from("Parámetros protocolo")
    .select("*");

  if (error) {
    console.log(error);
    return;
  }

  setParametrosProtocolo(data || []);
}
async function cargarPesoPaciente() {
  const { data, error } = await supabase
    .from("Pacientes")
    .select("Peso")
    .eq("id", pacienteId)
    .single();

  if (!error && data) {
    setPesoPaciente(data.Peso?.toString() || "");
  }
}
async function cargarNumeroSesion() {
  const { data, error } = await supabase
    .from("Sesiones")
    .select('"Número de sesión"')
    .eq("Paciente id", pacienteId);

  console.log("SESIONES DEL PACIENTE:", data);
  console.log("ERROR:", error);

  if (error) {
    console.log("ERROR CARGANDO NÚMERO DE SESIÓN:", error);
    return;
  }

  if (!data || data.length === 0) {
    setNumeroSesion(1);
    return;
  }

  const numerosExistentes = data
    .map((sesion: any) =>
      sesion["Número de sesión"]
    )
    .filter(
      (numero: any) =>
        numero !== null &&
        numero !== undefined
    )
    .map((numero: any) => Number(numero));

  if (numerosExistentes.length > 0) {
    const mayorNumero =
      Math.max(...numerosExistentes);

    setNumeroSesion(mayorNumero + 1);
  } else {
    // Sesiones antiguas que todavía no tenían número
    setNumeroSesion(data.length + 1);
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
        "Número de sesión": numeroSesion,
      },
    ])
    .select()
    .single();

if (error) {
  console.log("ERROR COMPLETO:", error);

  return;
}
localStorage.setItem("ultimoLugar", lugar);
console.log("SESION CREADA:", sesionCreada);
console.log(
  "NUMERO SESION GUARDADO:",
  sesionCreada?.["Número de sesión"]
);
for (const item of terapiasSeleccionadas) {

  for (const aplicacion of item.aplicaciones) {

    const { data: terapiaCreada, error: errorTerapia } =
      await supabase
        .from("Sesión terapias")
        .insert([
          {
            "Sesión id": sesionCreada.id,
            "Terapia id": item.terapiaId,
            "Región anatómica":
              aplicacion.estructuras.join(", "),
            Observaciones:
              aplicacion.observaciones,
          
          },
        ])
        .select()
        .single();

    if (errorTerapia) {
  console.error(
    "❌ ERROR GUARDANDO TERAPIA:",
    errorTerapia
  );

  alert(
    "ERROR GUARDANDO TERAPIA: " +
      errorTerapia.message
  );

  continue;
}

console.log(
  "✅ TERAPIA GUARDADA:",
  terapiaCreada
);

    for (const parametroId in aplicacion.parametros) {

      const { error: errorParametro } =
        await supabase
          .from("Sesión parámetros")
          .insert([
            {
              "Sesión terapia id":
                terapiaCreada.id,

              "Parámetro id":
                parametroId,

              "Valor seleccionado":
                aplicacion.parametros[parametroId],
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

}

console.log("PARAMETROS:", terapiasSeleccionadas);

router.push(`/equinos/pacientes/${pacienteId}`);
  }
    return (
    <main className="min-h-screen bg-[#F4F1EB] p-6">

<EquinosHeader
  titulo="Nueva Sesión"
  subtitulo="Registrar sesión terapéutica"
/>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <div className="grid gap-5">

<div>
  <label className="block font-semibold mb-2">
    Fecha de sesión
  </label>

  <input
    type="date"
    value={fechaSesion}
    onChange={(e) =>
      setFechaSesion(e.target.value)
    }
    className="p-4 rounded-2xl border border-gray-300 w-full"
  />
</div>

<div>
  <label className="block font-semibold mb-2">
    Número de sesión
  </label>

  <input
    type="number"
    min="1"
    value={numeroSesion}
    onChange={(e) =>
      setNumeroSesion(Number(e.target.value))
    }
    className="p-4 rounded-2xl border border-gray-300 w-full"
  />
</div>

<div>
  <label className="block font-semibold mb-2">
    Veterinario actuante
  </label>

  <select
    value={veterinario}
    onChange={(e) =>
      setVeterinario(e.target.value)
    }
    className="p-4 rounded-2xl border border-gray-300 w-full"
  >
    <option value="">
      Seleccionar veterinario
    </option>

    {veterinarios.map((veterinarioItem) => (
      <option
        key={veterinarioItem.id}
        value={veterinarioItem.Nombre}
      >
        {veterinarioItem.Nombre}
      </option>
    ))}
  </select>
</div>

<div>
  <label className="block font-semibold mb-2">
    Lugar de atención
  </label>

  <select
    value={lugar}
    onChange={(e) => {
      if (e.target.value === "__NUEVO_LUGAR__") {
        const rutaActual = window.location.pathname;

        window.location.href =
          `/administracion/lugares/nueva?returnTo=${encodeURIComponent(
            rutaActual
          )}`;

        return;
      }

      setLugar(e.target.value);
    }}
    className="p-4 rounded-2xl border border-gray-300 w-full"
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

    <option value="__NUEVO_LUGAR__">
      ➕ Agregar nuevo lugar
    </option>
  </select>
</div>

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
<textarea
            rows={5}
            placeholder="Evaluación de control"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          />
<div className="bg-gray-50 rounded-2xl p-4">

  <p className="font-semibold mb-3">
    Terapias realizadas
  </p>

 <div className="grid gap-2">

  {terapias.map((terapia) => {

    const seleccionada = terapiasSeleccionadas.some(
      (t) => t.terapiaId === terapia.id
    );

    return (
      <div key={terapia.id} className="w-full">

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={seleccionada}
            onChange={(e) => {

              if (e.target.checked) {

                setTerapiasSeleccionadas((prev) => [
                  ...prev.filter((t) => t.terapiaId !== terapia.id),
                  {
                    terapiaId: terapia.id,
                    aplicaciones: [
                      {
                        estructuras: [],
                        parametros: {},
                        observaciones: "",
                      },
                    ],
                  },
                ]);

              } else {

                setTerapiasSeleccionadas((prev) =>
                  prev.filter((t) => t.terapiaId !== terapia.id)
                );

              }
            }}
          />

          {terapia.Nombre}

        </label>

        {seleccionada && (
          <div className="ml-8 w-full">
            <TerapiaCard
  terapia={terapia}
  estructuras={estructuras}
  parametros={parametros}
  opcionesParametros={opcionesParametros}
   protocolos={protocolos}
   parametrosProtocolo={parametrosProtocolo}
  pesoPaciente={pesoPaciente}
  mostrarJeringas={true}
  aplicaciones={
    terapiasSeleccionadas.find(
      (t) => t.terapiaId === terapia.id
    )?.aplicaciones || []
  }
  onChange={(apps) =>
    setTerapiasSeleccionadas((prev) =>
      prev.map((t) =>
        t.terapiaId === terapia.id
          ? {
              ...t,
              aplicaciones: apps,
            }
          : t
      )
    )
    }
    guardarBorrador={
  guardarBorradorSesion
}
/>
          </div>
        )}

      </div>
    );
  })}
  </div>
</div>
          
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