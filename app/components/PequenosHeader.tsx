import Image from "next/image";
import Link from "next/link";

interface Props {
  titulo: string;
  subtitulo?: string;
}

export default function PequenosHeader({
  titulo,
  subtitulo,
}: Props) {
  return (
    <div className="mx-0 mt-0">
      
      {/* HEADER VISUAL */}
      <div className="relative h-24 md:h-28 overflow-hidden">

        <Image
          src="/patita.jpg"
          alt="Pequeños animales"
          fill
          className="object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* contenido */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">

          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
         {titulo}
          </h1>

          {subtitulo && (
            <p className="text-xs md:text-sm mt-1 opacity-90">
              {subtitulo}
            </p>
          )}

        </div>


      </div>

      {/* barra inferior */}
      <div className="h-2 bg-[#0B6A74]" />
    </div>
  );
}