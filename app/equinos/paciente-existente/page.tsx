"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useSearchParams } from "next/navigation";
import EquinosHeader from "@/app/components/EquinosHeader";

export default function NuevoPaciente() {
  const [propietarios, setPropietarios] = useState<any[]>([]);
  const [propietarioId, setPropietarioId] = useState("");

  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("Equino");
  const [raza, setRaza] = useState("");
  const [sexo, setSexo] = useState("Macho");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [color, setColor] = useState("");
  const searchParams = useSearchParams();

const propietarioPreseleccionado =
  searchParams.get("propietario");

  useEffect(() => {
    cargarPropietarios();
  }, []);
useEffect(() => {
  if (propietarioPreseleccionado) {
    setPropietarioId(propietarioPreseleccionado);
  }
}, [propietarioPreseleccionado]);
  async function cargarPropietarios() {
    const { data, error } = await supabase
      .from("Propietarios")
      .select("*")
      .order("Nombre y Apellido");

    if (error) {
      console.log(error);
      return;
    }

    setPropietarios(data || []);
  }

  async function guardarPaciente() {
    const { error } = await supabase
      .from("Pacientes")
      .insert([
        {
          Nombre: nombre,
          Especie: especie,
          Raza: raza,
          Sexo: sexo,
          Color: color,
          "Fecha Nacimiento": fechaNacimiento || null,
          "propietario id": propietarioId,
        },
      ]);

    if (error) {
      alert("Error al guardar: " + error.message);
      console.log(error);
      return;
    }

    alert("Paciente guardado correctamente");

    setNombre("");
    setEspecie("Equino");
    setRaza("");
    setSexo("Macho");
    setFechaNacimiento("");
    setColor("");
    setPropietarioId("");
  }

  return (
    <main className="min-h-screen bg-[#F4F1EB] p-6">

      <EquinosHeader
  titulo="Nuevo Paciente"
/>

<div className="mb-8" />

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <div className="grid gap-5">

          <select
            value={propietarioId}
            onChange={(e) => setPropietarioId(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          >
            <option value="">
              Seleccionar propietario
            </option>

            {propietarios.map((p) => (
              <option key={p.id} value={p.id}>
                {p["Nombre y Apellido"]}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Nombre del paciente"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          />

          <select
            value={especie}
            onChange={(e) => setEspecie(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          >
            <option>Equino</option>
            <option>Canino</option>
            <option>Felino</option>
            <option>Otro</option>
          </select>

          <input
            type="text"
            placeholder="Raza"
            value={raza}
            onChange={(e) => setRaza(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          />

          <select
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          >
            <option>Macho</option>
            <option>Hembra</option>
          </select>

          <input
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          />

          <input
            type="text"
            placeholder="Color / Pelaje"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="p-4 rounded-2xl border border-gray-300"
          />

          <button
            onClick={guardarPaciente}
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
            💾 Guardar paciente
          </button>

        </div>

      </div>

    </main>
  );
}