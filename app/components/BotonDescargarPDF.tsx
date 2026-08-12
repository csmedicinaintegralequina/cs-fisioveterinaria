"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type Props = {
  nombrePaciente?: string;
  fecha?: string;
};

export default function BotonDescargarPDF({
  nombrePaciente = "Paciente",
  fecha = "",
}: Props) {

  async function descargarPDF() {
  const hojas = document.querySelectorAll(".pdf-hoja");

  if (!hojas.length) {
    console.error("No se encontraron hojas PDF");
    return;
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  for (let i = 0; i < hojas.length; i++) {
    const hoja = hojas[i] as HTMLElement;

    const canvas = await html2canvas(hoja, {
      scale: 1.5,
      useCORS: true,
      backgroundColor: "#ffffff",

      onclone: (documento) => {
        const estilos = documento.querySelectorAll("*");

        estilos.forEach((el: any) => {
          const estilo = window.getComputedStyle(el);

          if (estilo.color.includes("lab")) {
            el.style.color = "#333333";
          }

          if (estilo.backgroundColor.includes("lab")) {
            el.style.backgroundColor = "#ffffff";
          }

          if (estilo.borderColor.includes("lab")) {
            el.style.borderColor = "#dddddd";
          }
        });
      },
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.95);

    if (i > 0) {
      pdf.addPage();
    }

    pdf.addImage(
      imgData,
      "JPEG",
      0,
      0,
      210,
      297
    );
  }

  const nombreArchivo =
    `${nombrePaciente} - Informe ${fecha || "sesion"}.pdf`
      .replaceAll("/", "-");

  pdf.save(nombreArchivo);
}


  return (
    <button
      onClick={descargarPDF}
      className="
      bg-[#0B6A74]
      text-white
      px-5
      py-3
      rounded-xl
      font-semibold
      shadow
      "
    >
      📄 Descargar PDF
    </button>
  );
}