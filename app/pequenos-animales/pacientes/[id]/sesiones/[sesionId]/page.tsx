import { supabase } from "@/lib/supabase";
import PequenosHeader from "@/app/components/PequenosHeader";
export default async function DetalleSesion({
  params,
}: {
  params: Promise<{
    id: string;
    sesionId: string;
  }>;
}) {
  const { id, sesionId } = await params;
  const { data: sesion } = await supabase
    .from("Sesiones")
    .select("*")
    .eq("id", sesionId)
    .single();

  const { data: sesionesTerapias } = await supabase
    .from("Sesión terapias")
    .select("*")
    .eq("Sesión id", sesionId);

  const { data: terapias } = await supabase
    .from("Terapias")
    .select("*");

  const { data: parametrosSesion } = await supabase
    .from("Sesión parámetros")
    .select("*");

  const { data: parametros } = await supabase
    .from("Parámetros terapias")
    .select("*");

    const { data: paciente } = await supabase
  .from("Pacientes")
  .select("*")
  .eq("id", id)
  .maybeSingle();

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

  return (
    <main className="min-h-screen bg-[#F4F1EB] p-6">
      <PequenosHeader
        titulo={paciente?.Nombre ?? "Paciente"}
        subtitulo="Ficha clínica"
      />  
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-[#0B6A74] mb-6">
          🏥 Detalle de sesión
        </h1>

        <div className="grid gap-2 mb-8">

          <div>
            <strong>Fecha:</strong>{" "}
            {sesion?.["Fecha de sesión"]}
          </div>

          <div>
            <strong>Veterinario:</strong>{" "}
            {sesion?.["Veterinario actuante"]}
          </div>

          <div>
            <strong>Lugar:</strong>{" "}
            {sesion?.["Lugar de atención"]}
          </div>

          <div>
            <strong>Evolución:</strong>{" "}
            {evolucionTexto(sesion?.Evolución)}
          </div>

          <div>
            <strong>Observaciones:</strong>{" "}
            {sesion?.Observaciones}
          </div>

        </div>

        <h2 className="text-2xl font-bold text-[#0B6A74] mb-4">
          Terapias realizadas
        </h2>

        <div className="grid gap-6">

          {sesionesTerapias?.map((sesionTerapia) => {

            const terapia = terapias?.find(
              (t) =>
                t.id === sesionTerapia["Terapia id"]
            );

            const parametrosDeLaSesion =
              parametrosSesion?.filter(
                (p) =>
                  p["Sesión terapia id"] ===
                  sesionTerapia.id
              );

            return (
              <div
                key={sesionTerapia.id}
                className="
                  border
                  rounded-2xl
                  p-5
                  bg-gray-50
                "
              >

                <h3 className="font-bold text-lg">
  {terapia?.Nombre}
</h3>

{sesionTerapia["Región anatómica"] && (
  <div className="text-sm text-gray-600 mb-3">
    📍 {sesionTerapia["Región anatómica"]}
  </div>
)}

                <div className="grid gap-2">

                  {parametrosDeLaSesion?.map(
                    (paramSesion) => {

                      const parametro =
                        parametros?.find(
                          (p) =>
                            p.id ===
                            paramSesion["Parámetro id"]
                        );

                      return (
                        <div
                          key={paramSesion.id}
                        >
                          <strong>
                            {
                              parametro?.[
                                "Nombre parámetro"
                              ]
                            }
                            :
                          </strong>{" "}
                          {
                            paramSesion[
                              "Valor seleccionado"
                            ]
                          }
                        </div>
                      );
                    }
                  )}

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </main>
  );
}