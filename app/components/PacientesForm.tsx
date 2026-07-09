"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
const router = useRouter();
  const [propietarios, setPropietarios] = useState<any[]>([]);
  const [lugares, setLugares] = useState<any[]>([]);

  const [propietarioId, setPropietarioId] = useState("");
const [busquedaPropietario, setBusquedaPropietario] = useState("")
const [nombrePropietarioSeleccionado, setNombrePropietarioSeleccionado] = useState("")
  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState(especieInicial);
  const [raza, setRaza] = useState("");
  const [sexo, setSexo] = useState("Macho");

  const [castrado, setCastrado] = useState(false);

  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [edad, setEdad] = useState("");
useEffect(() => {

  if (fechaNacimiento) {

    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();

    let años = hoy.getFullYear() - nacimiento.getFullYear();

    const mes =
      hoy.getMonth() - nacimiento.getMonth();

    if (
      mes < 0 ||
      (mes === 0 &&
        hoy.getDate() < nacimiento.getDate())
    ) {
      años--;
    }

    setEdad(String(años));
  }

}, [fechaNacimiento]);
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

}, [modo, pacienteId]);

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
}
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

    const { data, error } =
  await supabase
    .from("Pacientes")
    .insert([datos])
    .select()
    .single();

if (error) {
  alert(error.message);
  return;
}

alert("Paciente creado");


if (especie === "Equino") {
  router.push(`/equinos/pacientes/${data.id}`);
} else {
  router.push(`/pequenos-animales/pacientes/${data.id}`);
}
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

    if (especie === "Equino") {
      router.push(`/equinos/pacientes/${pacienteId}`);
    } else {
      router.push(`/pequenos-animales/pacientes/${pacienteId}`);
    }

}
}
  return (


<div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">

<div className="grid gap-5">
    <div className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-4">
        <div className="relative">
            <input
            type="text"
             placeholder="Propietario..."
            value={nombrePropietarioSeleccionado || busquedaPropietario}
             onChange={(e) => setBusquedaPropietario(e.target.value)}
             className="p-3 rounded-xl border border-gray-300 w-full"
    
  />

  {busquedaPropietario && (
    <div className="absolute z-10 bg-white border border-gray-200 rounded-xl w-full mt-1 shadow-lg max-h-48 overflow-y-auto">

      {propietarios
        .filter((p) =>
          p["Nombre y Apellido"]
            .toLowerCase()
            .includes(busquedaPropietario.toLowerCase())
        )
        .map((p) => (

         <div
  key={p.id}
  onMouseDown={(e) => {
  e.preventDefault()
  setPropietarioId(p.id)
  setNombrePropietarioSeleccionado(p["Nombre y Apellido"])
  setBusquedaPropietario("")
}}
  className="p-3 hover:bg-gray-100 cursor-pointer"
>
  {p["Nombre y Apellido"]}
</div>

        ))}

    </div>
  )}
</div>
<input
  type="text"
  placeholder="Nombre del paciente"
  value={nombre}
  onChange={(e) =>
    setNombre(e.target.value)
  }
  className="p-3 rounded-xl border border-gray-300"
/>
<select
  value={especie}
 onChange={(e) =>
  setEspecie(
    e.target.value as
      "Equino" | "Canino" | "Felino"
  )
}
  className="p-3 rounded-xl border border-gray-300"
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
  className="p-3 rounded-xl border border-gray-300"
/>
</div>
<div className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
<select
  value={sexo}
  onChange={(e) =>
    setSexo(e.target.value)
  }
  className="p-3 rounded-xl border border-gray-300"
>

<option>Macho</option>

<option>Hembra</option>

</select>
<div>

</div>
<div className="mt-4">
  <label className="block mb-2 font-medium">
    Castrado
  </label>

  <select
    value={castrado ? "Si" : "No"}
    onChange={(e) => setCastrado(e.target.value === "Si")}
    className="p-3 rounded-xl border border-gray-300 "
  >
    <option value="No">
      No
    </option>

    <option value="Si">
      Sí
    </option>

  </select>
</div>
</div>
<div className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
<input
  type="date"
  value={fechaNacimiento}
  onChange={(e) =>
    setFechaNacimiento(e.target.value)
  }
  className="p-3 rounded-xl border border-gray-300"
/>
<input
  type="text"
  placeholder="Edad aproximada"
  value={edad}
  onChange={(e) =>
    setEdad(e.target.value)
  }
  className="p-3 rounded-xl border border-gray-300"
/>
<input
  type="number"
  placeholder="Peso (kg)"
  value={peso}
  onChange={(e) =>
    setPeso(e.target.value)
  }
  className="p-3 rounded-xl border border-gray-300"
/>
<input
  type="text"
  placeholder="Color / Pelaje"
  value={color}
  onChange={(e) =>
    setColor(e.target.value)
  }
  className="p-3 rounded-xl border border-gray-300"
/>
</div>
<div className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
<input
  type="text"
  placeholder="Veterinario derivante"
  value={veterinarioDerivante}
  onChange={(e) =>
    setVeterinarioDerivante(e.target.value)
  }
  className="p-3 rounded-xl border border-gray-300"
/>
<select
  value={lugarHabitual}
  onChange={(e) =>
    setLugarHabitual(e.target.value)
  }
  className="p-3 rounded-xl border border-gray-300"
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
</div>
<div className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
<select
  value={estado}
  onChange={(e) =>
    setEstado(e.target.value)
  }
  className="p-3 rounded-xl border border-gray-300"
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
  className="p-3 rounded-xl border border-gray-300"
>

<option>Rehabilitación</option>

<option>Mantenimiento</option>

</select>
</div>
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
</div>
); 
}
