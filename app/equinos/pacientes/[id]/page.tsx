import { supabase } from "@/lib/supabase";
import EquinosHeader from "@/app/components/EquinosHeader";
import ArchivosPaciente from "@/app/components/ArchivosPaciente";
export default async function FichaPaciente({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: paciente } = await supabase
    .from("Pacientes")
    .select("*")
    .eq("id", id)
    .single();

  const { data: propietario } = await supabase
    .from("Propietarios")
    .select("*")
    .eq("id", paciente?.["propietario id"])
    .single();
const { data: historia } = await supabase
  .from("HistoriasClinicas")
  .select("*")
  .eq("paciente id", id)
  .maybeSingle();
const {
  data: diagnosticosPaciente,
  error: errorDiagnosticos,
} = await supabase
  .from("Diagnósticos paciente")
  .select("*")
  .eq("Paciente id", id);

  const { data: diagnosticos } = await supabase
  .from("Diagnósticos")
  .select("*");

const { data: estructuras } = await supabase
  .from("Estructuras anatómicas")
  .select("*");
  const { data: sesiones } = await supabase
  .from("Sesiones")
  .select("*")
  .eq("Paciente id", id)
  .order("Fecha de sesión", {
    ascending: true,
  });
  const { data: sesionesTerapias } = await supabase
  .from("Sesión terapias")
  .select("*");

const { data: sesionesParametros } = await supabase
  .from("Sesión parámetros")
  .select("*");

const { data: terapias } = await supabase
  .from("Terapias")
  .select("*");

const { data: parametrosTerapias } = await supabase
  .from("Parámetros terapias")
  .select("*");
  if (!paciente) {
    return (
      <main className="min-h-screen bg-[#F4F1EB] p-6">
        <h1 className="text-3xl font-bold text-red-600">
          Paciente no encontrado
        </h1>
      </main>
    );
  }
function evolucionTexto(valor: string) {
  switch (valor) {
    case "1":
      return "🔴 Peor";

    case "2":
      return "🟠 Levemente peor";

    case "3":
      return "🟡 Igual";

    case "4":
      return "🟢 Levemente mejor";

    case "5":
      return "🟢🟢 Mejor";

    default:
      return "-";
  }
}
function formatearFecha(fecha: string) {

  const d = new Date(fecha);

  const meses = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  return `${d.getDate()}-${meses[d.getMonth()]}-${d.getFullYear()}`;
}

  return (
    <main className="min-h-screen bg-[#F4F1EB] p-6">
      <EquinosHeader
  titulo={paciente.Nombre}
  subtitulo="Ficha clínica"
/>

<div className="mb-8" />

      {propietario && (
        <div className="max-w-4xl mx-auto mb-6 bg-white rounded-3xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
  <h2 className="text-xl font-bold text-[#0B6A74]">
    👤 Propietario
  </h2>

  <a
    href={`/equinos/propietarios/${propietario.id}/editar-propietario`}
className="
  text-sm
  font-semibold
  text-amber-600
  hover:text-amber-700
  hover:underline
  transition-all
"
  >
    ✏️ Editar
  </a>
</div>

          <div className="grid gap-2">
            <div>
              <strong>Nombre:</strong>{" "}
              {propietario["Nombre y Apellido"]}
            </div>

            <div>
              <strong>Teléfono:</strong>{" "}
              {propietario.Telefono}
            </div>

            <div>
              <strong>Localidad:</strong>{" "}
              {propietario.Localidad}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
  <h2 className="text-xl font-bold text-[#0B6A74]">
    🐴 Datos del paciente
  </h2>

  <a
    href={`/equinos/pacientes/${paciente.id}/editar-paciente`}
className="
  text-sm
  font-semibold
  text-amber-600
  hover:text-amber-700
  hover:underline
  transition-all
"
  >
    ✏️ Editar
  </a>
</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  <div>
    <strong>Especie:</strong> {paciente.Especie}
  </div>

  <div>
    <strong>Raza:</strong> {paciente.Raza}
  </div>

  <div>
    <strong>Sexo:</strong> {paciente.Sexo}
  </div>

  <div>
    <strong>Castrado:</strong>{" "}
    {paciente.Castrado ? "Sí" : "No"}
  </div>

  <div>
    <strong>Edad:</strong>{" "}
    {paciente.Edad || "-"}
  </div>

  <div>
    <strong>Fecha nacimiento:</strong>{" "}
    {paciente["Fecha Nacimiento"] || "-"}
  </div>

  <div>
    <strong>Peso:</strong>{" "}
    {paciente.Peso ? `${paciente.Peso} kg` : "-"}
  </div>

  <div>
    <strong>Color / Pelaje:</strong>{" "}
    {paciente.Color || "-"}
  </div>

  <div>
    <strong>Estado:</strong>{" "}
    {paciente.Estado || "-"}
  </div>

  <div>
    <strong>Tipo tratamiento:</strong>{" "}
    {paciente["Tipo tratamiento"] || "-"}
  </div>

</div>
      </div>
         
   <div className="max-w-4xl mx-auto mt-6 bg-white rounded-3xl shadow-xl p-6 md:p-8">
 <div className="flex items-center justify-between mb-6">
  <h2 className="text-2xl font-bold text-[#0B6A74]">
    📋 Historia Clínica
  </h2>

  {historia && (
    <a
      href={`/equinos/pacientes/${paciente.id}/editar-historia`}
      className="
        text-sm
        font-semibold
        text-amber-600
        hover:text-amber-700
        hover:underline
        transition-all
      "
    >
      ✏️ Editar
    </a>
  )}
</div>

  {historia ? (
    <>
      <div className="grid gap-4">

        <div>
          <strong>Motivo de consulta:</strong>
          <p>{historia["Motivo Consulta"]}</p>
        </div>

        <div>
          <strong>Anamnesis:</strong>
          <p>{historia.Anamnesis}</p>
        </div>

        <div>
          <strong>Examen físico:</strong>
          <p>{historia["Examen Fisico"]}</p>
        </div>

 <div>
          <strong>Tratamientos médicos:</strong>
          <p>{historia["Tratamientos"]}</p>
        </div>

        <div>
          <strong>Observaciones:</strong>
          <p>{historia.Observaciones}</p>
        </div>

      </div>


    </>
  ) : (
    <a
      href={`/equinos/pacientes/${paciente.id}/historia-clinica`}
      className="
        inline-block
        bg-[#0B6A74]
        text-white
        font-bold
        px-5 md:px-6
py-3 md:py-4
        rounded-2xl
        shadow-lg
        hover:scale-105
        transition-all
      "
    >
      ➕ Crear Historia Clínica
    </a>
  )}
</div>
<ArchivosPaciente
  pacienteId={paciente.id}
/>
      <div className="max-w-4xl mx-auto mt-6 bg-white rounded-3xl shadow-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-[#0B6A74] mb-6">
          🩺 Diagnósticos
        </h2>

       <a
  href={`/equinos/pacientes/${paciente.id}/nuevo-diagnostico`}
  className="
    inline-block
    bg-[#0B6A74]
    text-white
    font-bold
    px-5 md:px-6
py-3 md:py-4
    rounded-2xl
    shadow-lg
    hover:scale-105
    transition-all
  "
>
  ➕ Agregar Diagnóstico
</a>


{diagnosticosPaciente && diagnosticosPaciente.length > 0 && (
  <div className="mt-8 space-y-4">

{diagnosticosPaciente.map((diag) => {
  const diagnostico = diagnosticos?.find(
    (d) => d.id === diag["Diagnpostico id"]
  );

  const estructura = estructuras?.find(
    (e) => e.id === diag["Estructura id"]
  );
  return (
    <div
      key={diag.id}
      className="border rounded-2xl p-4 bg-gray-50 shadow-sm"
    >
      <div className="flex justify-between items-start gap-6">

        <div>
    <p className="font-bold text-xl text-[#0B6A74] mb-2">
  {diagnostico?.Nombre || "Diagnóstico"}
</p>

          <p>
            <strong>Estructura:</strong>{" "}
            {estructura?.Nombre || "-"}
          </p>

          {diag.Miembro && (
            <p>
              <strong>Miembro:</strong> {diag.Miembro}
            </p>
          )}

          {diag.Cara && (
            <p>
              <strong>Cara:</strong> {diag.Cara}
            </p>
          )}

          {diag.Nivel && (
            <p>
              <strong>Nivel:</strong> {diag.Nivel}
            </p>
          )}

          {diag.Observaciones && (
            <p>
              <strong>Observaciones:</strong>{" "}
              {diag.Observaciones}
            </p>
          )}
        </div>

        <div className="flex flex-col items-center gap-4 shrink-0">

  <a
    href={`/equinos/pacientes/${paciente.id}/editar-diagnostico/${diag.id}`}
    className="text-2xl hover:scale-110 transition"
    title="Editar"
  >
    ✏️
  </a>

  <a
    href={`/equinos/pacientes/${paciente.id}/eliminar-diagnostico/${diag.id}`}
    className="text-2xl hover:scale-110 transition"
    title="Eliminar"
  >
    🗑️
  </a>

</div>

      </div>
    </div>
  );
})}
      </div>
)}
</div>
     
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-3xl shadow-xl p-6 md:p-8">

  <div className="flex items-center justify-between mb-6">

    <h2 className="text-xl font-bold text-[#0B6A74]">
      🏥 Fisioterapia
    </h2>

    <a
  href={`/equinos/pacientes/${paciente.id}/nueva-sesion`}
      className="
        bg-[#0B6A74]
        text-white
        px-4
        py-2
        rounded-xl
        font-semibold
        hover:opacity-90
      "
    >
      ➕ Nueva sesión
    </a>

  </div>

  {!sesiones || sesiones.length === 0 ? (

    <p className="text-gray-500">
      No hay sesiones registradas.
    </p>

  ) : (

    <div className="grid gap-3">

{sesiones.map((sesion) => (

  <a
    href={`/equinos/pacientes/${id}/sesiones/${sesion.id}`}
    key={sesion.id}
    className="
      block
      border
      rounded-2xl
      p-4
      hover:bg-gray-50
      transition-all
      shadow-sm
    "
  >

    <div>

 <strong>
  {formatearFecha(
    sesion["Fecha de sesión"]
  )}
</strong>

</div>
<div className="mt-3 text-sm">

  {(() => {

    const terapiasDeLaSesion =
      sesionesTerapias?.filter(
        (st) => st["Sesión id"] === sesion.id
      ) || [];

    const terapiasAgrupadas = terapiasDeLaSesion.reduce(
      (acc: any, st: any) => {

        const terapiaId = st["Terapia id"];

        if (!acc[terapiaId]) {
          acc[terapiaId] = [];
        }

        acc[terapiaId].push(st);

        return acc;

      },
      {}
    );

    return Object.entries(terapiasAgrupadas).map(
      ([terapiaId, aplicaciones]: any) => {

        const terapia = terapias?.find(
          (t) => t.id === terapiaId
        );

        return (

          <div
            key={terapiaId}
            className="mb-4"
          >

            <div className="font-semibold text-[#0B6A74]">
              {terapia?.Nombre}
            </div>

            {aplicaciones.map(
              (st: any, indice: number) => {

                const parametrosDeLaAplicacion =
                  sesionesParametros?.filter(
                    (sp) =>
                      sp["Sesión terapia id"] === st.id
                  );

                return (

                  <div
                    key={st.id}
                    className="ml-4 mt-2 border-l-2 border-gray-200 pl-3"
                  >

                    <div className="text-xs font-semibold text-gray-500">
                      Aplicación {indice + 1}
                    </div>

                    {st["Región anatómica"] && (
                      <div className="text-gray-600 text-xs">
                        📍 {st["Región anatómica"]}
                      </div>
                    )}

                    <div className="text-xs text-gray-500">

                      {parametrosDeLaAplicacion
                        ?.map(
                          (sp: any) =>
                            sp["Valor seleccionado"]
                        )
                        .join(" • ")}

                    </div>

                    {st.Observaciones && (
                      <div className="text-xs italic text-gray-500 mt-1">
                        📝 {st.Observaciones}
                      </div>
                    )}

                  </div>

                );

              }
            )}

          </div>

        );

      }
    );

  })()}

</div>
<div className="text-xs text-gray-500 mt-2">
  {evolucionTexto(sesion.Evolución)}
</div>
<div className="mt-3 flex justify-end gap-4">

  <a
    href={`/equinos/pacientes/${id}/sesiones/${sesion.id}`}
    className="
      text-sm
      text-[#0B6A74]
      font-semibold
    "
  >
    👁 Ver
  </a>

<a
  href={`/equinos/pacientes/${id}/sesiones/${sesion.id}/editar`}
  className="text-sm text-amber-600 font-semibold"
>
  ✏️
</a>

<a
  href={`/equinos/pacientes/${id}/sesiones/${sesion.id}/eliminar`}
  className="text-sm text-red-600 font-semibold"
>
  🗑
</a>

</div>
  </a>

))}

    </div>

  )}

</div>
<div className="max-w-4xl mx-auto mt-8 bg-white rounded-3xl shadow-xl p-6 md:p-8">

  <h2 className="text-xl font-bold text-[#0B6A74] mb-6">
    📈 Evolución temporal
  </h2>

  {!sesiones || sesiones.length === 0 ? (

    <p className="text-gray-500">
      No hay sesiones registradas.
    </p>

  ) : (

    <div className="space-y-4">

      {sesiones.map((sesion) => (

        <div
          key={sesion.id}
          className="
            flex
            items-center
            gap-4
            border-l-4
            border-[#0B6A74]
            pl-4
          "
        >

          <div className="font-semibold min-w-[120px]">
            {sesion["Fecha de sesión"]}
          </div>

          <div>
            {evolucionTexto(
              sesion.Evolución
            )}
          </div>

        </div>

      ))}

    </div>

  )}

</div>
    </main>
  );
}
