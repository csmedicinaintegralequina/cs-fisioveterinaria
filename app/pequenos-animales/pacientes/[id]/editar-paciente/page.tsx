import PacienteForm from "@/app/components/PacientesForm";

export default async function EditarPaciente({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  return (
    <PacienteForm
      modo="editar"
      especieInicial="Canino"
      pacienteId={id}
    />
  );
}