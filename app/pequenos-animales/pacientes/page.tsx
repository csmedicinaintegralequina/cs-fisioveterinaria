"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarPacientes();
  }, []);

  async function cargarPacientes() {
   const { data, error } = await supabase
  .from("Pacientes")
  .select("*")
  .in("Especie", ["Canino", "Felino"])
  .order("Nombre");

    if (error) {
      console.log(error);
      return;
    }

    setPacientes(data || []);
  }

  const pacientesFiltrados = pacientes.filter((paciente) =>
    paciente.Nombre?.toLowerCase().includes(
      busqueda.toLowerCase()
    )
  );

  return (
    <main className="min-h-screen bg-[#F4F1EB] p-6">

      <h1 className="text-5xl font-bold text-[#0B6A74] mb-2">
        🔎 Buscar Pacientes
      </h1>

      <p className="text-[#6B7280] mb-8">
        Buscar y acceder a fichas clínicas
      </p>

      <div className="max-w-4xl mx-auto">

        <input
          type="text"
          placeholder="Buscar paciente..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="
            w-full
            p-4
            rounded-2xl
            border
            border-gray-300
            bg-white
            shadow-md
            mb-6
          "
        />

        <div className="flex flex-col gap-4">

         {pacientesFiltrados.map((paciente) => {
  const icono =
  paciente.Especie === "Canino"
    ? "🐶"
    : paciente.Especie === "Felino"
    ? "🐱"
    : "🐾";
  return (
    <Link
      key={paciente.id}
      href={`/pequenos-animales/pacientes/${paciente.id}`}
    >
      <div
  className="
    bg-white
    rounded-3xl
    p-5
    shadow-lg
    hover:shadow-2xl
    hover:scale-[1.02]
    transition-all
    cursor-pointer
    flex
    items-center
    gap-5
  "
>
{paciente["foto url"] ? (
  <img
    src={paciente["foto url"]}
    alt={paciente.Nombre}
    className="
      w-20
      h-20
      rounded-full
      object-cover
      border-4
      border-[#0B6A74]
      shadow-md
      flex-shrink-0
    "
  />
) : (
  <div
    className="
      w-20
      h-20
      rounded-full
      bg-[#E6F3F1]
      border-4
      border-[#0B6A74]
      shadow-md
      flex-shrink-0
      flex
      items-center
      justify-center
      text-4xl
    "
  >
    {icono}
  </div>
)}


  <div>

    <h2 className="text-2xl font-bold text-[#45B8AC]">
      {icono} {paciente.Nombre}
    </h2>

    <p className="text-gray-600 mt-2">
      {paciente.Raza}
    </p>

    <p className="text-gray-500">
      {paciente.Color}
    </p>

  </div>

</div>
    </Link>
  );
})}

        </div>

      </div>

    </main>
  );
}