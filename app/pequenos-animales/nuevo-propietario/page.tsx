"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import EquinosHeader from "@/app/components/EquinosHeader";

export default function NuevoPropietario() {
  const [nombreApellido, setNombreApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");

  async function guardarPropietario() {
    const { data: propietarioCreado, error } =
  await supabase
    .from("Propietarios")
    .insert([
      {
        "Nombre y Apellido": nombreApellido,
        Telefono: telefono,
        Localidad: localidad,
        Dirección: direccion || null,
        Email: email || null,
      },
    ])
    .select()
    .single();

    if (error) {
      alert("Error al guardar: " + error.message);
      console.log(error);
      return;
    }

    alert("Propietario guardado correctamente");

window.location.href =
  `//pequenos-animales//paciente-existente?propietario=${propietarioCreado.id}`;
  }

  return (
    <main className="min-h-screen bg-[#F4F1EB] p-6">

      <EquinosHeader titulo="Nuevo Propietario" />

<div className="mb-8" />

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <div className="grid gap-5">

          <input
            type="text"
            placeholder="Nombre y Apellido"
            value={nombreApellido}
            onChange={(e) => setNombreApellido(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          />

          <input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          />

          <input
            type="text"
            placeholder="Localidad"
            value={localidad}
            onChange={(e) => setLocalidad(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          />

          <input
            type="text"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          />

          <button
            onClick={guardarPropietario}
            className="
              bg-[#0B6A74]
              text-white
              font-bold
              py-4
              rounded-2xl
              shadow-lg
              hover:scale-105
              transition-all
            "
          >
            💾 Guardar propietario
          </button>

        </div>

      </div>

    </main>
  );
}