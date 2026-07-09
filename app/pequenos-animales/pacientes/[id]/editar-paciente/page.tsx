"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  modo: "nuevo" | "editar";
  especieInicial: "Equino" | "Canino" | "Felino";
  pacienteId?: string;
};

export default function PacienteForm({
  modo,
  especieInicial,
  pacienteId,
}: Props) {

  const [propietarios, setPropietarios] = useState<any[]>([]);
  const [lugares, setLugares] = useState<any[]>([]);

  const [propietarioId, setPropietarioId] = useState("");

  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState(especieInicial);
  const [raza, setRaza] = useState("");
  const [sexo, setSexo] = useState("Macho");

  const [castrado, setCastrado] = useState(false);

  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [edad, setEdad] = useState("");

  const [peso, setPeso] = useState("");

  const [color, setColor] = useState("");

  const [veterinarioDerivante, setVeterinarioDerivante] =
    useState("");

  const [lugarHabitual, setLugarHabitual] =
    useState("");

  const [estado, setEstado] =
    useState("Activo");

  const [tipoTratamiento, setTipoTratamiento] =
    useState("Rehabilitación");

  const [fotoUrl, setFotoUrl] =
    useState("");

  useEffect(() => {

    cargarPropietarios();
    cargarLugares();

    if (modo === "editar" && pacienteId) {
      cargarPaciente();
    }

  }, []);

  async function cargarPropietarios() {

    const { data } = await supabase
      .from("Propietarios")
      .select("*")
      .order("Nombre y Apellido");

    setPropietarios(data || []);

  }

  async function cargarLugares() {

    const { data } = await supabase
      .from("Lugares")
      .select("*")
      .order("Nombre");

    setLugares(data || []);

  }

  async function cargarPaciente() {

    const { data } = await supabase
      .from("Pacientes")
      .select("*")
      .eq("id", pacienteId)
      .single();

    if (!data) return;

    setPropietarioId(data["propietario id"] || "");

    setNombre(data.Nombre || "");

    setEspecie(data.Especie || especieInicial);

    setRaza(data.Raza || "");

    setSexo(data.Sexo || "Macho");

    setFechaNacimiento(
      data["Fecha Nacimiento"] || ""
    );

    setEdad(data.Edad || "");

    setPeso(data.Peso || "");

    setColor(data.Color || "");

    setVeterinarioDerivante(
      data["Veterinario derivante"] || ""
    );

    setLugarHabitual(
      data["Lugar Habitual"] || ""
    );

    setEstado(
      data.Estado || "Activo"
    );

    setTipoTratamiento(
      data["Tipo tratamiento"] ||
      "Rehabilitación"
    );

    setFotoUrl(
      data["foto url"] || ""
    );

    setCastrado(
      data.Castrado || false
    );
async function guardarPaciente() {

  const datos = {
    Nombre: nombre,
    Especie: especie,
    Raza: raza,
    Sexo: sexo,
    Castrado: castrado,

    "Fecha Nacimiento":
      fechaNacimiento || null,

    Edad: edad,

    Peso:
      peso === ""
        ? null
        : Number(peso),

    Color: color,

    "Veterinario derivante":
      veterinarioDerivante,

    "Lugar Habitual":
      lugarHabitual,

    Estado: estado,

    "Tipo tratamiento":
      tipoTratamiento,

    "foto url":
      fotoUrl,

    "propietario id":
      propietarioId,
  };

  if (modo === "nuevo") {

    const { error } =
      await supabase
        .from("Pacientes")
        .insert([datos]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Paciente creado");

  } else {

    const { error } =
      await supabase
        .from("Pacientes")
        .update(datos)
        .eq("id", pacienteId);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Paciente actualizado");

  }

}
  return (

<div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">

<div className="grid gap-5"></div>
<select
  value={propietarioId}
  onChange={(e) =>
    setPropietarioId(e.target.value)
  }
  className="p-4 rounded-2xl border border-gray-300"
>

  <option value="">
    Seleccionar propietario
  </option>

  {propietarios.map((p) => (

    <option
      key={p.id}
      value={p.id}
    >
      {p["Nombre y Apellido"]}
    </option>

  ))}

</select>
<input
  type="text"
  placeholder="Nombre del paciente"
  value={nombre}
  onChange={(e) =>
    setNombre(e.target.value)
  }
  className="p-4 rounded-2xl border border-gray-300"
/>
<select
  value={especie}
 onChange={(e) =>
  setEspecie(
    e.target.value as
      "Equino" | "Canino" | "Felino"
  )
}
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
  onChange={(e) =>
    setRaza(e.target.value)
  }
  className="p-4 rounded-2xl border border-gray-300"
/>
<select
  value={sexo}
  onChange={(e) =>
    setSexo(e.target.value)
  }
  className="p-4 rounded-2xl border border-gray-300"
>

<option>Macho</option>

<option>Hembra</option>

</select>
<div className="flex items-center justify-between border border-gray-300 rounded-2xl p-4">

  <span className="font-medium">
    Castrado
  </span>

  <button
    type="button"
    onClick={() => setCastrado(!castrado)}
    className={`

      w-16
      h-8
      rounded-full
      transition-all
      relative

      ${castrado
        ? "bg-[#0B6A74]"
        : "bg-gray-300"}

    `}
  >

    <div
      className={`

        absolute
        top-1
        w-6
        h-6
        rounded-full
        bg-white
        transition-all

        ${castrado
          ? "left-9"
          : "left-1"}

      `}
    />

  </button>

</div>
<input
  type="date"
  value={fechaNacimiento}
  onChange={(e) =>
    setFechaNacimiento(e.target.value)
  }
  className="p-4 rounded-2xl border border-gray-300"
/>
<input
  type="text"
  placeholder="Edad aproximada"
  value={edad}
  onChange={(e) =>
    setEdad(e.target.value)
  }
  className="p-4 rounded-2xl border border-gray-300"
/>
<input
  type="number"
  placeholder="Peso (kg)"
  value={peso}
  onChange={(e) =>
    setPeso(e.target.value)
  }
  className="p-4 rounded-2xl border border-gray-300"
/>
<input
  type="text"
  placeholder="Color / Pelaje"
  value={color}
  onChange={(e) =>
    setColor(e.target.value)
  }
  className="p-4 rounded-2xl border border-gray-300"
/>
<input
  type="text"
  placeholder="Veterinario derivante"
  value={veterinarioDerivante}
  onChange={(e) =>
    setVeterinarioDerivante(e.target.value)
  }
  className="p-4 rounded-2xl border border-gray-300"
/>
<select
  value={lugarHabitual}
  onChange={(e) =>
    setLugarHabitual(e.target.value)
  }
  className="p-4 rounded-2xl border border-gray-300"
>

  <option value="">
    Seleccionar lugar habitual
  </option>

  {lugares.map((lugar) => (

    <option
      key={lugar.id}
      value={lugar.Nombre}
    >
      {lugar.Nombre}
    </option>

  ))}

</select>
<select
  value={estado}
  onChange={(e) =>
    setEstado(e.target.value)
  }
  className="p-4 rounded-2xl border border-gray-300"
>

<option>🟢 Activo</option>

<option>🟡 Alta</option>

<option>🔴 Inactivo</option>

</select>
<select
  value={tipoTratamiento}
  onChange={(e) =>
    setTipoTratamiento(e.target.value)
  }
  className="p-4 rounded-2xl border border-gray-300"
>

<option>Rehabilitación</option>

<option>Mantenimiento</option>

</select>
<div className="border border-dashed border-gray-300 rounded-2xl p-6 text-center">

  <p className="font-semibold mb-3">
    Foto del paciente
  </p>

  <input
    type="file"
    accept="image/*"
  />

</div>
<button
  type="button"
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

  {modo === "nuevo"
    ? "💾 Guardar paciente"
    : "💾 Actualizar paciente"}

</button>
</div>

);

