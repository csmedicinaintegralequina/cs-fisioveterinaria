import Link from "next/link";
import Image from "next/image";

export default function PequenosAnimales() {
  return (
    <main className="min-h-screen bg-[#F4F1EB] p-6">

      {/* Header */}
      <div className="relative h-48 md:h-64 rounded-3xl overflow-hidden mb-8 shadow-xl">

        <Image
          src="/perro-gato.webp"
          alt="Pequeños animales"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">

          <h1 className="text-4xl md:text-6xl font-bold text-center">
            Pequeños Animales
          </h1>

          <p className="text-base md:text-xl mt-2 text-center px-4">
            Medicina Integral • Fisioterapia • Rehabilitación
          </p>

        </div>

      </div>

      {/* Menú */}
      <div className="max-w-xl mx-auto flex flex-col gap-4">

        <Link href="/pequenos-animales/nuevo-propietario">
          <div
            className="
              bg-gradient-to-r
              from-[#6ED3C7]
              to-[#45B8AC]
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

        <Link href="/pequenos-animales/nuevo-paciente">
          <div
            className="
              bg-gradient-to-r
              from-[#62CCC0]
              to-[#38B2A6]
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
            <div className="text-3xl md:text-4xl mb-2">🐶</div>

            <h2 className="text-xl md:text-2xl font-bold">
              Nuevo paciente
            </h2>

            <p className="text-sm md:text-base">
              Crear ficha clínica
            </p>
          </div>
        </Link>

        <Link href="/pequenos-animales/pacientes">
          <div
            className="
              bg-gradient-to-r
              from-[#57C5B6]
              to-[#2FA89B]
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

        <Link href="/pequenos-animales/frecuentes">
          <div
            className="
              bg-gradient-to-r
              from-[#49BCAD]
              to-[#23998D]
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