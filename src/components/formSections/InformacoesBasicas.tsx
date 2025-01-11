"use client";

import React from "react";

interface FormData {
  nome: string;
  tipo: string;
  quartos: number;
  banheiros: number;
  garagem: boolean;
  metragem: number;
}

interface InformacoesBasicasProps {
  formData: FormData;
  updateBasicInfo: (data: Partial<FormData>) => void;
}

const InformacoesBasicas: React.FC<InformacoesBasicasProps> = ({ formData, updateBasicInfo }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let parsedValue;
    if (name === "quartos" || name === "banheiros" || name === "metragem") {
      parsedValue = parseFloat(value) || 0;
    } else if (name === "garagem") {
      parsedValue = value === "true";
    } else {
      parsedValue = value;
    }
    updateBasicInfo({ [name]: parsedValue });
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="nome" className="block font-bold mb-2">
          Nome da Propriedade
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          value={formData.nome}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="tipo" className="block font-bold mb-2">
          Tipo de Imóvel
        </label>
        <select
          id="tipo"
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Selecione...</option>
          <option value="apartamento">Apartamento</option>
          <option value="casa">Casa</option>
          <option value="condominio">Condomínio</option>
        </select>
      </div>

      <div>
        <label htmlFor="quartos" className="block font-bold mb-2">
          Quantidade de Quartos
        </label>
        <input
          id="quartos"
          name="quartos"
          type="number"
          value={formData.quartos}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="banheiros" className="block font-bold mb-2">
          Quantidade de Banheiros
        </label>
        <input
          id="banheiros"
          name="banheiros"
          type="number"
          value={formData.banheiros}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <h3 className="font-bold mb-4 flex items-center gap-2">
          Acesso a Garagem?
        </h3>
        <div className="grid gap-2 mx-3">
          {[
            { label: "Sim", value: "true" },
            { label: "não", value: "false" }
          ].map((option) => (
            <div key={option.label} className="flex items-center gap-2">
              <input
                type="radio"
                id={`garagem-${option.label}`}
                name="garagem"
                value={option.value}
                checked={formData.garagem.toString() === option.value}
                onChange={e => handleChange(e)}
                className="cursor-pointer"
              />
              <label htmlFor={`garagem-${option.label}`} className="cursor-pointer capitalize">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="metragem" className="block font-bold mb-2">
          Metragem Quadrada
        </label>
        <input
          id="metragem"
          name="metragem"
          type="number"
          step="0.01"
          value={formData.metragem}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
    </div>
  );
};

export default InformacoesBasicas;
