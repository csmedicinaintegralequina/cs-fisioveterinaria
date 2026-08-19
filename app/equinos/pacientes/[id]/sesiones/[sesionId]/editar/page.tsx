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
const sesionId = params.sesionId as string;
const [fechaSesion, setFechaSesion] = useState("");
  const [veterinario, setVeterinario] = useState("");
  const [lugar, setLugar] = useState("");
  const [evolucion, setEvolucion] = useState("3");
  const [observaciones, setObservaciones] = useState("");
  const [lugares, setLugares] = useState<any[]>([]);
  const [terapias, setTerapias] = useState<any[]>([]);
  const [parametros, setParametros] = useState<any[]>([]);
  const [protocolos, setProtocolos] = useState<any[]>([]);
const [parametrosProtocolo, setParametrosProtocolo] = useState<any[]>([]);
const [opcionesParametros, setOpcionesParametros] = useState<any[]>([]);
type TerapiaSel = {
  terapiaId: string;
  aplicaciones: any[];
};
const [pesoPaciente, setPesoPaciente] = useState("");
const [terapiasSeleccionadas, setTerapiasSeleccionadas] =
useState<TerapiaSel[]>([]);
const [estructuras, setEstructuras] = useState<any[]>([]);
const [valoresParametros, setValoresParametros] = useState<Record<string, string>>({});
const [parametrosCargados, setParametrosCargados] =
useState<Record<string, string>>({});
const [parametrosPorTerapia, setParametrosPorTerapia] =
useState<Record<string, any>>({});
const [estructuraPorTerapia, setEstructuraPorTerapia] =
useState<Record<string, string[]>>({});
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
    })
  );
}
useEffect(() => {

  if (!sesionId) return;

  cargarLugares();
  cargarTerapias();
  cargarEstructuras();
  cargarParametros();
  cargarOpcionesParametros();
  cargarSesion();
  cargarTerapiasSesion();
  cargarProtocolos();
  cargarParametrosProtocolo();

  const borrador =
    sessionStorage.getItem("sesionBorrador");

  const estructuraNueva =
    new URLSearchParams(window.location.search).get(
      "estructura"
    );

  if (borrador) {

    const borradorGuardado =
      JSON.parse(borrador);

    const terapiasGuardadas =
      borradorGuardado.terapias;

    const terapiaId =
      borradorGuardado.terapiaId;

    const aplicacionIndex =
      borradorGuardado.aplicacionIndex;

    if (estructuraNueva) {

      const terapiasActualizadas =
        terapiasGuardadas.map(
          (terapia: any) => {

            if (
              terapia.terapiaId !== terapiaId
            ) {
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

}, [sesionId]);
async function cargarSesion() {

  const { data, error } = await supabase
    .from("Sesiones")
    .select("*")
    .eq("id", sesionId)
    .single();

  if (error) {
    console.log("ERROR CARGANDO SESION:", error);
    return;
  }

  if (!data) return;

  setFechaSesion(data["Fecha de sesión"]);
setVeterinario(data["Veterinario actuante"] || "");

const lugarNuevoId =
  new URLSearchParams(window.location.search).get("lugar");

if (lugarNuevoId) {
  const { data: lugarNuevo } = await supabase
    .from("Lugares")
    .select("Nombre")
    .eq("id", lugarNuevoId)
    .single();

  if (lugarNuevo) {
    setLugar(lugarNuevo.Nombre);
  } else {
    setLugar(data["Lugar de atención"] || "");
  }
} else {
  setLugar(data["Lugar de atención"] || "");
}

setEvolucion(data.Evolución || "3");
setObservaciones(data.Observaciones || "");
setPesoPaciente(data.Peso || "");
}
async function cargarTerapiasSesion() {

  const { data } = await supabase
    .from("Sesión terapias")
    .select("*")
    .eq("Sesión id", sesionId);

  if (!data) return;

  console.log("TERAPIAS GUARDADAS:", data);

  const agrupadas: any = {};

  data.forEach((t) => {

    if (!agrupadas[t["Terapia id"]]) {
      agrupadas[t["Terapia id"]] = {
        terapiaId: t["Terapia id"],
        aplicaciones: [],
      };
    }

    agrupadas[t["Terapia id"]].aplicaciones.push({
      estructuras: t["Región anatómica"]
        ? [t["Región anatómica"]]
        : [],
      parametros: {},
      observaciones: "",
    });

  });


  const terapiasCargadas =
  Object.values(agrupadas) as TerapiaSel[];

setTerapiasSeleccionadas(
  terapiasCargadas
);

console.log(
  "TERAPIAS BASE:",
  terapiasCargadas
);

setTimeout(() => {
  cargarParametrosSesion(terapiasCargadas);
}, 500);
  console.log(
    "TERAPIAS CARGADAS:",
    Object.values(agrupadas)
  );
}
async function cargarLugares() {

  const { data, error } = await supabase
    .from("Lugares")
    .select("*");

  console.log("LUGARES:", data);
  console.log("ERROR LUGARES:", error);

  setLugares(data || []);

}
async function cargarTerapias() {
  const { data, error } = await supabase
    .from("Terapias")
    .select("*");

  console.log("TERAPIAS:", data);
  console.log("ERROR TERAPIAS:", error);

  if (data) {
  console.log("LISTA TERAPIAS:", data);
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
async function cargarParametrosSesion(
  terapiasActuales: TerapiaSel[]
) {

  const { data: terapiasSesion } = await supabase
    .from("Sesión terapias")
    .select("*")
    .eq("Sesión id", sesionId);

  if (!terapiasSesion) return;


  const ids = terapiasSesion.map(
    (t) => t.id
  );


  const { data: parametrosSesion } =
    await supabase
      .from("Sesión parámetros")
      .select("*")
      .in(
        "Sesión terapia id",
        ids
      );


  if (!parametrosSesion) return;


  const nuevasTerapias = terapiasActuales.map(
    (terapia) => {

      const aplicaciones = terapia.aplicaciones.map(
        (app, indice) => {

          const terapiaSesion =
            terapiasSesion.find(
              (ts) =>
                ts["Terapia id"] === terapia.terapiaId &&
                indice === 0
            );


          const parametros: Record<string,string> = {};


          parametrosSesion
            .filter(
              (p) =>
                p["Sesión terapia id"] === terapiaSesion?.id
            )
            .forEach(
              (p) => {
                parametros[p["Parámetro id"]] =
                  p["Valor seleccionado"];
              }
            );


          return {
            ...app,
            parametros,
          };

        }
      );


      return {
        ...terapia,
        aplicaciones,
      };

    }
  );


  setTerapiasSeleccionadas(nuevasTerapias);


  console.log(
    "TERAPIAS CON PARAMETROS:",
    nuevasTerapias
  );

}
async function guardarSesion() {
  console.log("ACTUALIZANDO SESIÓN:", sesionId);

  // 1. Actualizar los datos principales de la sesión
  const { data: sesionActualizada, error } = await supabase
    .from("Sesiones")
    .update({
      "Fecha de sesión": fechaSesion,
      "Veterinario actuante": veterinario,
      "Lugar de atención": lugar,
      Evolución: evolucion,
      Observaciones: observaciones,
    })
    .eq("id", sesionId)
    .select()
    .single();

  if (error) {
    console.error("ERROR ACTUALIZANDO SESIÓN:", error);
    return;
  }

  console.log("SESIÓN ACTUALIZADA:", sesionActualizada);

  // 2. Buscar las terapias actuales de esta sesión
  const { data: terapiasViejas, error: errorTerapiasViejas } =
    await supabase
      .from("Sesión terapias")
      .select("id")
      .eq("Sesión id", sesionId);

  if (errorTerapiasViejas) {
    console.error(
      "ERROR BUSCANDO TERAPIAS ANTERIORES:",
      errorTerapiasViejas
    );
    return;
  }

  // 3. Borrar los parámetros de las terapias anteriores
  if (terapiasViejas && terapiasViejas.length > 0) {
    const idsTerapias = terapiasViejas.map((t) => t.id);

    const { error: errorParametros } = await supabase
      .from("Sesión parámetros")
      .delete()
      .in("Sesión terapia id", idsTerapias);

    if (errorParametros) {
      console.error(
        "ERROR BORRANDO PARÁMETROS ANTERIORES:",
        errorParametros
      );
      return;
    }
  }

  // 4. Borrar las terapias anteriores
  const { error: errorBorradoTerapias } = await supabase
    .from("Sesión terapias")
    .delete()
    .eq("Sesión id", sesionId);

  if (errorBorradoTerapias) {
    console.error(
      "ERROR BORRANDO TERAPIAS ANTERIORES:",
      errorBorradoTerapias
    );
    return;
  }

  // 5. Volver a guardar las terapias actuales
  for (const item of terapiasSeleccionadas) {
    for (const aplicacion of item.aplicaciones) {
      const { data: terapiaCreada, error: errorTerapia } =
        await supabase
          .from("Sesión terapias")
          .insert([
            {
              "Sesión id": sesionId,
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
          "ERROR GUARDANDO TERAPIA:",
          errorTerapia
        );
        continue;
      }

      console.log(
        "TERAPIA ACTUALIZADA:",
        terapiaCreada
      );

      // 6. Guardar nuevamente los parámetros
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
          console.error(
            "ERROR GUARDANDO PARÁMETRO:",
            errorParametro
          );
        }
      }
    }
  }

  console.log(
    "✅ SESIÓN ACTUALIZADA CORRECTAMENTE"
  );

  router.push(
    `/equinos/pacientes/${pacienteId}`
  );
}
  console.log(
  "ESTADO ANTES DE MOSTRAR:",
  terapiasSeleccionadas
);
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

  <option value="__NUEVO_LUGAR__">
    ➕ Agregar nuevo lugar
  </option>
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
  pesoPaciente={pesoPaciente}
  protocolos={protocolos}
parametrosProtocolo={parametrosProtocolo}
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
  guardarBorrador={guardarBorradorSesion}
/>
          </div>
        )}

      </div>
    );
  })}
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
            💾 Actualizar Sesión
          </button>

        </div>

      </div>

    </main>
  );
}