import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4F1EB] flex flex-col items-center py-10 px-4 md:py-16 md:px-6">

      <Image
        src="/logocs.png"
        alt="CS Fisioveterinaria"
        width={180}
        height={180}
        className="mb-4"
      />

      <h1 className="text-3xl md:text-5xl font-bold text-[#0B6A74] text-center mb-2">
        CS Fisioveterinaria
      </h1>

      <p className="text-[#6B7280] text-center mb-10 text-sm md:text-lg px-4 leading-relaxed">
        Rehabilitación • Fisioterapia • Medicina Integral
      </p>

<div className="grid gap-6 md:gap-8 w-full max-w-2xl">

        <Link href="/equinos">
          <div className="bg-white rounded-3xl overflow-hidden shadow-md md:shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-all cursor-pointer mx-2">

            <Image
              src="/caballo1.jpg"
              alt="Equinos"
              width={800}
              height={400}
         className="w-full h-56 md:h-72 object-cover object-[center_35%]"
            />

           <div className="p-5 md:p-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0B6A74]">
                Equinos
              </h2>
            </div>

          </div>
          </Link>
       <Link href="/pequenos-animales">
  <div className="bg-white rounded-3xl overflow-hidden shadow-md md:shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-all cursor-pointer mx-2">

    <Image
      src="/perro-gato.webp"
      alt="Pequeños animales"
      width={800}
      height={400}
      className="w-full h-52 md:h-64 object-cover"
    />

    <div className="p-5 md:p-6 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0B6A74]">
        Pequeños animales
      </h2>
    </div>

  </div>
</Link>

      </div>
<div className="w-full max-w-2xl mt-8 px-2">

  <Link href="/administracion">
    <div
      className="
        bg-[#4B5563]
        text-white
        rounded-3xl
        p-6
        shadow-md
        hover:shadow-xl
        hover:scale-[1.02]
        transition-all
        cursor-pointer
        text-center
      "
    >
      <div className="text-4xl mb-2">
        ⚙️
      </div>

      <h2 className="text-2xl font-bold">
        Administración
      </h2>

      <p className="text-sm mt-1">
        Configuración del sistema
      </p>

    </div>
  </Link>

</div>
    </main>
  );
}