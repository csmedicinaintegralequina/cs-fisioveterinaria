"use client";

import { useEffect, useState } from "react";
import Link from "next/link";


export default function Navbar() {
  useEffect(() => {

  function cerrarMenu(e: MouseEvent) {

    const target = e.target as HTMLElement;

    if (!target.closest("nav")) {
      setMenuAbierto("");
    }

  }

  document.addEventListener("click", cerrarMenu);

  return () =>
    document.removeEventListener(
      "click",
      cerrarMenu
    );

}, []);
  const [menuAbierto, setMenuAbierto] = useState("");
  return (
    <nav className="bg-[#0B6A74] text-white shadow-lg">

      <div className="flex justify-center items-center gap-6 py-4 font-semibold">

        <Link href="/">
          Inicio
        </Link>

        {/* EQUINOS */}

<div className="relative">

  <button
    onClick={() =>
      setMenuAbierto(
        menuAbierto === "equinos" ? "" : "equinos"
      )
    }
  >
    Equinos ▼
  </button>

  {menuAbierto === "equinos" && (

    <div
      className="
        absolute
        left-0
        top-full
        mt-2
        flex
        flex-col
        bg-white
        text-gray-800
        rounded-xl
        shadow-xl
        min-w-[220px]
        z-50
      "
    >

      <Link
        href="/equinos"
        onClick={() => setMenuAbierto("")}
        className="px-4 py-3 hover:bg-gray-100 rounded-t-xl"
      >
        Inicio Equinos
      </Link>

      <Link
        href="/equinos/nuevo-propietario"
        onClick={() => setMenuAbierto("")}
        className="px-4 py-3 hover:bg-gray-100"
      >
        Nuevo propietario
      </Link>

      <Link
        href="/equinos/nuevo-paciente"
        onClick={() => setMenuAbierto("")}
        className="px-4 py-3 hover:bg-gray-100"
      >
        Nuevo paciente
      </Link>

      <Link
        href="/equinos/pacientes"
        onClick={() => setMenuAbierto("")}
        className="px-4 py-3 hover:bg-gray-100"
      >
        Buscar pacientes
      </Link>

      <Link
        href="/equinos/frecuentes"
        onClick={() => setMenuAbierto("")}
        className="px-4 py-3 hover:bg-gray-100 rounded-b-xl"
      >
        Pacientes frecuentes
      </Link>

    </div>

  )}

</div>

        {/* PEQUEÑOS */}

        <div className="relative">

  <button
    onClick={() =>
      setMenuAbierto(
        menuAbierto === "pequenos"
          ? ""
          : "pequenos"
      )
    }
  >
    Pequeños ▼
  </button>

  {menuAbierto === "pequenos" && (

    <div
      className="
        absolute
        left-0
        top-full
        mt-2
        flex
        flex-col
        bg-white
        text-gray-800
        rounded-xl
        shadow-xl
        min-w-[220px]
        z-50
      "
    >

      <Link
        href="/pequenos-animales"
        onClick={() => setMenuAbierto("")}
        className="px-4 py-3 hover:bg-gray-100 rounded-t-xl"
      >
        Inicio Pequeños
      </Link>

      <Link
        href="/pequenos-animales/nuevo-propietario"
        onClick={() => setMenuAbierto("")}
        className="px-4 py-3 hover:bg-gray-100"
      >
        Nuevo propietario
      </Link>

      <Link
        href="/pequenos-animales/nuevo-paciente"
        onClick={() => setMenuAbierto("")}
        className="px-4 py-3 hover:bg-gray-100"
      >
        Nuevo paciente
      </Link>

      <Link
        href="/pequenos-animales/pacientes"
        onClick={() => setMenuAbierto("")}
        className="px-4 py-3 hover:bg-gray-100 rounded-b-xl"
      >
        Buscar pacientes
      </Link>

    </div>

  )}

</div>

        {/* ADMINISTRACION */}

       <div className="relative">

  <button
    onClick={() =>
      setMenuAbierto(
        menuAbierto === "administracion"
          ? ""
          : "administracion"
      )
    }
  >
    Administración ▼
  </button>

  {menuAbierto === "administracion" && (

    <div
      className="
        absolute
        left-0
        top-full
        mt-2
        flex
        flex-col
        bg-white
        text-gray-800
        rounded-xl
        shadow-xl
        min-w-[240px]
        z-50
      "
    >

      <Link
        href="/administracion"
        onClick={() => setMenuAbierto("")}
        className="px-4 py-3 hover:bg-gray-100 rounded-t-xl"
      >
        Inicio Administración
      </Link>

      <Link
        href="/administracion/terapias"
        onClick={() => setMenuAbierto("")}
        className="px-4 py-3 hover:bg-gray-100"
      >
        Terapias
      </Link>

      <Link
        href="/administracion/parametros"
        onClick={() => setMenuAbierto("")}
        className="px-4 py-3 hover:bg-gray-100"
      >
        Parámetros
      </Link>

      <Link
        href="/administracion/diagnosticos"
        onClick={() => setMenuAbierto("")}
        className="px-4 py-3 hover:bg-gray-100"
      >
        Diagnósticos
      </Link>

      <Link
        href="/administracion/estructuras"
        onClick={() => setMenuAbierto("")}
        className="px-4 py-3 hover:bg-gray-100"
      >
        Estructuras
      </Link>

    </div>

  )}

</div>

      </div>

    </nav>
  );
}