import PacientesForm from "@/app/components/PacientesForm";

export default async function EditarPaciente({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  return (
    <PacientesForm
      modo="editar"
      especieInicial="Equino"
      pacienteId={id}
    />
  );
}