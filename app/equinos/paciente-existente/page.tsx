import PacienteForm from "@/app/components/PacientesForm";

export default function NuevoPacientePage() {
  return (

    <main className="min-h-screen bg-[#F4F1EB] p-6">

      <PacienteForm
        modo="nuevo"
        especieInicial="Equino"
      />

    </main>
  );
}