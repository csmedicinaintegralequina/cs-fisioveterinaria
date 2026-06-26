import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4F1EB] flex flex-col items-center py-16 px-6">

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

      <p className="text-[#6B7280] text-center mb-10 text-base md:text-lg px-4 leading-relaxed">
        Rehabilitación • Fisioterapia • Medicina Integral
      </p>

      <div className="grid gap-8 w-full max-w-2xl">

        <Link href="/equinos">
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer">

            <Image
              src="/caballo1.jpg"
              alt="Equinos"
              width={800}
              height={400}
         className="w-full h-52 md:h-64 object-cover"
            />

           <div className="p-5 md:p-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0B6A74]">
                Equinos
              </h2>
            </div>

          </div>
        </Link>

        <div className="bg-white rounded-3xl overflow-hidden shadow-lg opacity-80">

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

            <p className="text-gray-500 mt-2">
              Próximamente
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}