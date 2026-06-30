import Link from "next/link";
import Image from "next/image";

export default function Equinos() {
  return (
    <main className="min-h-screen bg-[#F4F1EB] p-6">

     {/* Header */}

<div className="relative h-48 md:h-64 rounded-3xl overflow-hidden mb-8 shadow-xl">

  <Image
    src="/caballosalto.jpg"
    alt="Equinos"
    fill
    className="object-cover"
  />

  <div className="absolute inset-0 bg-black/40" />

  <div className="absolute inset-0 flex flex-col justify-center items-center text-white">

<h1 className="text-4xl md:text-6xl font-bold text-center">
      Equinos
    </h1>

<p className="text-base md:text-xl mt-2 text-center px-4">
      Medicina Integral Equina
    </p>

  </div>

</div>

      {/* Menú */}
      <div className="max-w-xl mx-auto flex flex-col gap-4">

        <Link href="/equinos/nuevo-propietario">
          <div
            className="
            bg-[#2E8B96]
            text-white
            rounded-3xl
            p-5 md:p-6
            shadow-xl
            hover:scale-105
            hover:shadow-2xl
            transition-all
            cursor-pointer
          "
          >
            <div className="text-3xl md:text-4xl mb-2">👤</div>

            <h2 className="text-xl md:text-2xl font-bold">
              Nuevo propietario
            </h2>

            <p className="text-sm md:text-base">
              Crear ficha del propietario
            </p>
          </div>
        </Link>

        <Link href="/equinos/nuevo-paciente">
          <div
            className="
            bg-[#0B6A74]
            text-white
            rounded-3xl
            p-5 md:p-6
            shadow-xl
            hover:scale-105
            hover:shadow-2xl
            transition-all
            cursor-pointer
          "
          >
            <div className="text-3xl md:text-4xl mb-2">🐴</div>

            <h2 className="text-xl md:text-2xl font-bold">
              Nuevo paciente
            </h2>

            <p className="text-sm md:text-base"> 
              Crear ficha clínica
            </p>
          </div>
        </Link>

        <Link href="/equinos/pacientes">
          <div
            className="
            bg-[#5D8A93]
            text-white
            rounded-3xl
            p-5 md:p-6
            shadow-xl
            hover:scale-105
            hover:shadow-2xl
            transition-all
            cursor-pointer
          "
          >
            <div className="text-3xl md:text-4xl mb-2">🔎</div>

            <h2 className="text-xl md:text-2xl font-bold">
              Buscar pacientes
            </h2>

            <p className="text-sm md:text-base"> 
              Buscar y editar pacientes
            </p>
          </div>
        </Link>

        <Link href="/equinos/frecuentes">
          <div
            className="
            bg-[#6CB4BE]
            text-white
            rounded-3xl
            p-5 md:p-6
            shadow-xl
            hover:scale-105
            hover:shadow-2xl
            transition-all
            cursor-pointer
          "
          >
            <div className="text-3xl md:text-4xl mb-2">⭐</div>

            <h2 className="text-xl md:text-2xl font-bold">
              Pacientes frecuentes
            </h2>

            <p className="text-sm md:text-base"> 
              Acceso rápido
            </p>
          </div>
        </Link>

      </div>

    </main>
  );
}