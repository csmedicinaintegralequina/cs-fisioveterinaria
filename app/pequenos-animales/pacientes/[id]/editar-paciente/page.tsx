import PacienteForm from "@/app/components/PacientesForm";

export default async function EditarPaciente({
  params,
}: {
  params: { id: string };
}) {

  return (
    <PacienteForm
      modo="editar"
      especieInicial="Canino"
      pacienteId={params.id}
    />
  );
}