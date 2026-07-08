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

        <Link href="/equinos/administracion/estructuras">
          <div className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition-all">
            <h2 className="text-2xl font-bold text-[#0B6A74]">
              🦴 Estructuras anatómicas
            </h2>
          </div>
        </Link>

        <Link href="/equinos/administracion/diagnosticos">
          <div className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition-all">
            <h2 className="text-2xl font-bold text-[#0B6A74]">
              🩺 Diagnósticos
            </h2>
          </div>
        </Link>

        <Link href="/equinos/administracion/terapias">
          <div className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition-all">
            <h2 className="text-2xl font-bold text-[#0B6A74]">
              💡 Terapias
            </h2>
          </div>
        </Link>

        <Link href="/equinos/administracion/parametros">
          <div className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition-all">
            <h2 className="text-2xl font-bold text-[#0B6A74]">
              ⚙️ Parámetros
            </h2>
          </div>
        </Link>

      </div>

    </main>
  );
}