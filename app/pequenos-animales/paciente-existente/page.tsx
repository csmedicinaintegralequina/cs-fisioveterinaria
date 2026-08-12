import PacienteForm from "@/app/components/PacientesForm";

export default async function NuevoPacientePage({
  searchParams,
}: {
  searchParams: Promise<{
    propietario?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-[#F4F1EB] p-6">
      <PacienteForm
        modo="nuevo"
        especieInicial="Canino"
        propietarioInicial={params.propietario}
      />
    </main>
  );
}