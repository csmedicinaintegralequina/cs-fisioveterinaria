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
    const elemento = document.getElementById("contenido-pdf");

    if (!elemento) {
      console.error("No se encontró contenido-pdf");
      return;
    }

    const canvas = await html2canvas(elemento, {
  scale: 1.2,
  useCORS: true,
  backgroundColor: "#ffffff",

  onclone: (documento) => {

    const estilos =
      documento.querySelectorAll("*");

    estilos.forEach((el: any) => {

      const estilo =
        window.getComputedStyle(el);

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

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });





const margen = 10;

const anchoDisponible =
  210 - margen * 2;

const altoDisponible =
  297 - margen * 2;


const proporcion =
  canvas.height / canvas.width;


const anchoImagen = anchoDisponible;

const altoImagen =
  anchoImagen * proporcion;


// Si entra en una hoja
if (altoImagen <= altoDisponible) {

  pdf.addImage(
    imgData,
    "JPEG",
    margen,
    margen,
    anchoImagen,
    altoImagen
  );

} else {

  let alturaRestante = altoImagen;
  let posicionY = margen;


  pdf.addImage(
    imgData,
    "JPEG",
    margen,
    posicionY,
    anchoImagen,
    altoImagen
  );


  alturaRestante -= altoDisponible;


  while (alturaRestante > 0) {

    pdf.addPage();

    posicionY = margen;

    pdf.addImage(
      imgData,
      "JPEG",
      margen,
      posicionY - altoDisponible,
      anchoImagen,
      altoImagen
    );


    alturaRestante -= altoDisponible;

  }

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