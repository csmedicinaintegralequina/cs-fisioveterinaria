import Link from "next/link";
import EquinosHeader from "@/app/components/EquinosHeader";

export default function Administracion() {
  return (
    <main className="min-h-screen bg-[#F4F1EB] p-6">

      <EquinosHeader
        titulo="Administración"
        subtitulo="Configuración del sistema"
      />

      <div className="max-w-4xl mx-auto mt-8 grid gap-5">

        <Link href="/administracion/estructuras">
          <div className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition-all">
            <h2 className="text-2xl font-bold text-[#0B6A74]">
              🦴 Estructuras anatómicas
            </h2>
          </div>
        </Link>

        <Link href="/administracion/diagnosticos">
          <div className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition-all">
            <h2 className="text-2xl font-bold text-[#0B6A74]">
              🩺 Diagnósticos
            </h2>
          </div>
        </Link>

        <Link href="/administracion/terapias">
          <div className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition-all">
            <h2 className="text-2xl font-bold text-[#0B6A74]">
              💡 Terapias
            </h2>
          </div>
        </Link>

        <Link href="/administracion/parametros">
          <div className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition-all">
            <h2 className="text-2xl font-bold text-[#0B6A74]">
              ⚙️ Parámetros
            </h2>
          </div>
        </Link>
        <Link href="/administracion/protocolos">
          <div className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition-all">
            <h2 className="text-2xl font-bold text-[#0B6A74]">
              📋 Protocolos
            </h2>
          </div>
        </Link>

        <Link href="administracion/lugares">
          <div className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition-all">
            <h2 className="text-2xl font-bold text-[#0B6A74]">
              📍 Lugares de atención
            </h2>
          </div>
        </Link>

        <Link href="/administracion/veterinarios">
          <div className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition-all">
            <h2 className="text-2xl font-bold text-[#0B6A74]">
              👨‍⚕️ Veterinarios actuantes
            </h2>
          </div>
        </Link>

        <Link href="/administracion/razas">
          <div className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition-all">
            <h2 className="text-2xl font-bold text-[#0B6A74]">
              🐴🐶 Razas
            </h2>
          </div>
        </Link>
      </div>

    </main>
  );
}