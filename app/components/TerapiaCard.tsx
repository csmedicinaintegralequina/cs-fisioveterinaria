"use client";

import Select from "react-select";

type Aplicacion = {
  estructuras: string[];
  parametros: Record<string, string>;
  observaciones: string;
};

type Props = {
  terapia: any;
  estructuras: any[];
  parametros: any[];
  opcionesParametros: any[];
  aplicaciones: Aplicacion[];
  onChange: (apps: Aplicacion[]) => void;
};

export default function TerapiaCard({
  terapia,
  estructuras,
  parametros,
  opcionesParametros,
  aplicaciones,
  onChange,
}: Props) {
  return (
    <div>
      {aplicaciones.map((aplicacion, indice) => (
        <div
          key={indice}
          className="ml-8 mt-4 bg-gray-50 rounded-2xl p-5"
        >
          <h3 className="text-lg font-bold text-[#0B6A74]">
            Aplicación {indice + 1}
          </h3>

          <p className="mt-4 font-semibold">
            Estructuras anatómicas
          </p>

          <Select
            isMulti
            options={estructuras.map((estructura) => ({
              value: estructura.Nombre,
              label: estructura.Nombre,
            }))}
            value={aplicacion.estructuras.map((e) => ({
              value: e,
              label: e,
            }))}
            onChange={(selected) =>
              onChange(
                aplicaciones.map((app, i) =>
                  i === indice
                    ? {
                        ...app,
                        estructuras: selected
                          ? selected.map((s: any) => s.value)
                          : [],
                      }
                    : app
                )
              )
            }
            placeholder="Buscar estructuras..."
          />

          {parametros
            .filter((p) => p["Terapia id"] === terapia.id)
            .map((parametro) => (
              <div key={parametro.id} className="mt-4">
                <p className="font-medium">
                  {parametro["Nombre parámetro"]}
                </p>

                <select
                  className="w-full mt-2 p-3 border rounded-xl"
                  value={
                    aplicacion.parametros[parametro.id] || ""
                  }
                  onChange={(e) => {
                    const value = e.target.value;

                    onChange(
                      aplicaciones.map((app, i) =>
                        i === indice
                          ? {
                              ...app,
                              parametros: {
                                ...app.parametros,
                                [parametro.id]: value,
                              },
                            }
                          : app
                      )
                    );
                  }}
                >
                  <option value="">
                    Seleccionar
                  </option>

                  {opcionesParametros
                    .filter(
                      (o) =>
                        o["Parámetro id"] === parametro.id
                    )
                    .map((opcion) => (
                      <option
                        key={opcion.id}
                        value={opcion.Valor}
                      >
                        {opcion.Valor}
                      </option>
                    ))}
                </select>
              </div>
            ))}

          <textarea
            className="w-full mt-4 p-3 border rounded-xl"
            placeholder="Observaciones"
            value={aplicacion.observaciones}
            onChange={(e) => {
              const value = e.target.value;

              onChange(
                aplicaciones.map((app, i) =>
                  i === indice
                    ? {
                        ...app,
                        observaciones: value,
                      }
                    : app
                )
              );
            }}
          />
        </div>
      ))}

      <button
        onClick={() =>
          onChange([
            ...aplicaciones,
            {
              estructuras: [],
              parametros: {},
              observaciones: "",
            },
          ])
        }
        className="
          mt-6
          bg-[#0B6A74]
          text-white
          px-4
          py-2
          rounded-xl
        "
      >
        ➕ Agregar aplicación
      </button>
    </div>
  );
}