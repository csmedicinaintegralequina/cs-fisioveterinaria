import Image from "next/image";

export default function EquinosHeader({
  titulo,
  subtitulo,
}: {
  titulo: string;
  subtitulo?: string;
}) {
  return (
    <div className="mx-0 mt-0">

      <div className="relative h-24 overflow-hidden">

        <Image
          src="/caballosalto.jpg"
          alt="Equinos"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

       <div className="absolute inset-0 flex flex-col items-center justify-center text-white">

  <h1 className="text-3xl font-bold">
    {titulo}
  </h1>

  {subtitulo && (
    <p className="text-sm mt-1">
      {subtitulo}
    </p>
  )}

</div>

      </div>

      <div className="h-2 bg-[#0B6A74]" />

    </div>
  );
}