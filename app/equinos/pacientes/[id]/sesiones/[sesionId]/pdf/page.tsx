import { supabase } from "@/lib/supabase";
import Image from "next/image";
import BotonDescargarPDF from "@/app/components/BotonDescargarPDF";
export default async function PDFSesion({
  params,
}: {
  params: Promise<{
    id: string;
    sesionId: string;
  }>;
}) {

  const { id, sesionId } = await params;


  console.log("ID PACIENTE:", id);
  console.log("ID SESION:", sesionId);
  // Sesión

  const { data: sesion } = await supabase
    .from("Sesiones")
    .select("*")
    .eq("id", sesionId)
    .single();
    console.log("SESION PDF:", sesion);
console.log(
  "NUMERO SESION PDF:",
  sesion?.["Número de sesión"]
);

const numeroSesion =
  sesion?.["Número de sesión"] ?? null;

  // Paciente

  const { data: paciente } = await supabase
    .from("Pacientes")
    .select("*")
    .eq("id", id)
    .single();



  // Propietario

 let propietario = null;


if (paciente) {

  console.log(
    "ID PROPIETARIO DEL PACIENTE:",
    paciente["propietario id"]
  );

  const { data, error } = await supabase
    .from("Propietarios")
    .select("*")
    .eq("id", paciente["propietario id"])
    .single();

  console.log("PROPIETARIO EN PDF:", data);
  console.log("ERROR PROPIETARIO PDF:", error);

  propietario = data;
}



  // Terapias de la sesión

  const { data: sesionesTerapias } = await supabase
  .from("Sesión terapias")
  .select(`
    *,
    Terapias (
      Nombre
    )
  `)
  .eq("Sesión id", sesionId);

console.log("ID PACIENTE:", id);
console.log("ID SESION:", sesionId);
console.log("SESION:", sesion);
console.log("PACIENTE:", paciente);
console.log("TERAPIAS:", sesionesTerapias);

return (

  <>
  <style>{`
  .pdf-hoja {
    width: 210mm;
    min-height: 297mm;
    padding: 18mm 16mm;
    background: white;
    box-sizing: border-box;
  }

  @media print {
    body {
      background: white;
    }

    .pdf-hoja {
      width: 210mm;
      min-height: 297mm;
      margin: 0;
      padding: 18mm 16mm;
      box-shadow: none;
      page-break-after: always;
    }
  }
`}</style>
    <div className="flex justify-end mb-6">
      <BotonDescargarPDF
        nombrePaciente={paciente?.Nombre}
        fecha={sesion?.["Fecha de sesión"]}
      />
    </div>


    <div
  id="contenido-pdf"
  className="
    flex
    flex-col
    items-center
    gap-8
    py-8
  "
>

  <main
    className="
      pdf-hoja
      bg-white
      text-gray-800
      shadow-lg
      box-border
    "
  >
{/* ENCABEZADO */}

<header
  className="
    text-center
    border-b-2
    border-[#0B6A74]
    pb-3
  "
>
  <div className="flex justify-center items-center h-[95px] w-full px-4">
    <img
  src="/pdf/logocs.png"
  alt="Logo Medicina Integral Equina"
  width={210}
  height={95}
  style={{
    width: "210px",
    height: "95px",
    objectFit: "contain",
    display: "block",
    margin: "0 auto",
  }}
/>
  </div>

<h1
className="
text-2xl
font-bold
text-[#0B6A74]
mt-2


"
>
Informe de sesión
</h1>


</header>



{/* DATOS */}

<section
className="
mt-4
grid
gap-2
"
>

<p className="text-sm">
<b>Paciente:</b> {paciente?.Nombre}
</p>


<p className="text-sm">
  <b>Propietario:</b> {propietario?.["Nombre y Apellido"]}
</p>


<p className="text-sm">
<b>Fecha:</b> {sesion?.["Fecha de sesión"]}
</p>


<p className="text-sm">
  <b>Sesión Nº:</b> {numeroSesion || "-"}
</p>


{paciente?.["Veterinario derivante"] && (

<p className="text-sm">
<b>Veterinario derivante:</b>{" "}
{paciente["Veterinario derivante"]}
</p>

)}


</section>





{/* EVALUACION */}

<section
className="
mt-5
"
>

<h3
className="
text-base
font-bold
text-[#0B6A74]
mb-3
"
>
Evaluación de control
</h3>


<p
className="
text-sm
whitespace-pre-line
"
>
{sesion?.Observaciones || ""}
</p>

</section>





{/* TERAPIAS */}

<section
className="
mt-5
"
>

<h3
className="
text-base
font-bold
text-[#0B6A74]
mb-3
"
>
Terapias realizadas
</h3>


{sesionesTerapias?.map((st:any)=>(

<div
key={st.id}
className="
mt-3
pb-2
"
>

<div
className="
font-bold
text-[#4FA8B8]
text-sm
"
>
• {st.Terapias?.Nombre}
</div>


{st["Región anatómica"] && (

<div
className="
text-[13px]
text-gray-600
mt-1
"
>
📍 {st["Región anatómica"]}
</div>

)}


{st.Observaciones && (

<div
className="
text-[12px]
italic
text-gray-500
mt-1
"
>
📝 {st.Observaciones}
</div>

)}

</div>

))}


</section>

{/* FIRMAS */}

<section
className="
mt-5
grid
grid-cols-3
gap-4
text-center
items-end
"
>

<div>

<div className="h-12 flex items-center justify-center">
<img
src="/pdf/firmajose.png"
alt="Firma Josefina"
className="
max-h-12
object-contain
"
/>
</div>

<p
className="
border-t
mt-0
pt-1
text-[11px]
font-semibold
"
>
M.V. Josefina Chayer
</p>

<p className="text-[10px]">
MP 16.214
</p>

</div>



<div>

<div className="h-12 flex items-center justify-center">

<img
src="/pdf/firmaflor.png"
alt="Firma Florencia"
className="
max-h-12
object-contain
"
/>

</div>

<p
className="
border-t
mt-0
pt-1
text-[11px]
font-semibold
"
>
M.V. Florencia Solano
</p>

<p className="text-[10px]">
MP 16.352
</p>

</div>




<div>

<div className="h-12 flex items-center justify-center">

<img
src="/pdf/firmatino.png"
alt="Firma Martín"
className="
max-h-12
object-contain
"
/>

</div>

<p
className="
border-t
mt-0
pt-1
text-[11px]
font-semibold
"
>
M.V. Martín Gerez
</p>

<p className="text-[10px]">
MP 16.511
</p>
</div>
 </section>

 </main>

    </div>

  </>

);}
