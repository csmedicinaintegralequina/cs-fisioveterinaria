import { supabase } from "@/lib/supabase";
import Image from "next/image";
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



  // Paciente

  const { data: paciente } = await supabase
    .from("Pacientes")
    .select("*")
    .eq("id", id)
    .single();



  // Propietario

 let propietario = null;


if (paciente) {

  const { data } = await supabase
    .from("Propietarios")
    .select("*")
    .eq("id", paciente["propietario id"])
    .single();


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

<main
className="
min-h-screen
bg-white
max-w-4xl
mx-auto
p-10
text-gray-800
"
>


{/* ENCABEZADO */}

<header
className="
text-center
border-b
pb-6
"
>

<Image
  src="/pdf/logocs.png"
  alt="Logo Medicina Integral Equina"
  width={300}
  height={150}
  className="mx-auto object-contain"
/>


<h1
className="
text-3xl
font-bold
text-[#0B6A74]
mt-4
"
>
Informe de sesión
</h1>


</header>



{/* DATOS */}

<section
className="
mt-8
grid
gap-2
"
>

<p>
<b>Paciente:</b> {paciente?.Nombre}
</p>


<p>
<b>Propietario:</b> {propietario?.Nombre}
</p>


<p>
<b>Fecha:</b> {sesion?.["Fecha de sesión"]}
</p>


<p>
<b>Sesión Nº:</b> {sesion?.["Número de sesión"] || "-"}
</p>


{paciente?.["Veterinario derivante"] && (

<p>
<b>Veterinario derivante:</b>{" "}
{paciente["Veterinario derivante"]}
</p>

)}


</section>





{/* EVALUACION */}

<section
className="
mt-10
"
>

<h3
className="
text-xl
font-bold
text-[#0B6A74]
border-b
pb-2
"
>
Evaluación de control
</h3>


<p
className="
mt-4
whitespace-pre-line
"
>
{sesion?.Observaciones || ""}
</p>


</section>





{/* TERAPIAS */}

<section
className="
mt-10
"
>


<h3
className="
text-xl
font-bold
text-[#0B6A74]
border-b
pb-2
"
>
Terapias realizadas
</h3>



{sesionesTerapias?.map((terapia:any)=>(


<div
key={terapia.id}
className="
mt-6
border-b
pb-4
"
>


<h4
className="
font-bold
text-lg
"
>
{terapia.Terapias?.Nombre}
</h4>


<p>
<b>Estructura:</b>{" "}
{terapia["Región anatómica"] || "-"}
</p>


<p
className="
mt-2
italic
"
>
<b>Observaciones:</b>{" "}
{terapia.Observaciones || ""}
</p>


</div>


))}



</section>





{/* FIRMAS */}

<section
className="
mt-20
grid
grid-cols-3
gap-8
text-center
items-end
"
>

<div>

<div className="h-20 flex items-center justify-center">
<img
src="/pdf/firmajose.png"
alt="Firma Josefina"
className="
max-h-20
object-contain
"
/>
</div>

<p className="
border-t
mt-2
pt-2
">
M.V. Josefina Chayer
</p>

<p className="text-sm">
MP 16.214
</p>

</div>



<div>

<div className="h-20 flex items-center justify-center">

<img
src="/pdf/firmaflor.png"
alt="Firma Florencia"
className="
max-h-20
object-contain
"
/>

</div>

<p className="
border-t
mt-2
pt-2
">
M.V. Florencia Solano
</p>
<p className="text-sm">
MP 16.352
</p>

</div>



<div>

<img
src="/pdf/firmatino.png"
alt="Firma Martín"
className="
mx-auto
h-20
object-contain
"
/>

<p className="
border-t
mt-2
pt-2
">
M.V. Martín Gerez
</p>

<p className="text-sm">
MP 16.511
</p>

</div>


</section>



</main>

);}
