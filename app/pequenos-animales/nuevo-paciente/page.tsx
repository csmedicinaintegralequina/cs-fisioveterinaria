export default function NuevoPacienteMenu() {
  return (
    <main className="min-h-screen bg-[#F4F1EB] p-8">

     <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-[#0B6A74] mb-8">
          Nuevo paciente
        </h1>

        <div className="grid gap-4">

          <a
            href="/pequenos-animales/nuevo-propietario"
            className="
              bg-[#0B6A74]
              text-white
              p-6
              rounded-2xl
              text-center
              font-bold
            "
          >
            ➕ Nuevo propietario
          </a>

          <a
            href="/pequenos-animales/paciente-existente"
            className="
              border
              border-[#0B6A74]
              text-[#0B6A74]
              p-6
              rounded-2xl
              text-center
              font-bold
            "
          >
            Paciente de propietario existente
          </a>

        </div>

      </div>

    </main>
  );
}