export default function Navbar() {
  return (
    <nav
      className="
        bg-[#0B6A74]
        text-white
        px-6
        py-4
        shadow-lg
      "
    >
      <div className="flex gap-3">

  <a href="/">Inicio</a>

  <span>|</span>


  <a href="/equinos/pacientes">
    Pacientes
  </a>

  <span>|</span>

  <a href="/equinos/nuevo-paciente">
    Nuevo paciente
  </a>

</div>
    </nav>
  );
}