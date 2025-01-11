"use client";

import React from "react";

interface FormData {
  pais: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento: string;
}

interface LocalizacaoProps {
  formData: FormData;
  updateLocalizacao: (data: Partial<FormData>) => void;
}

const Localizacao: React.FC<LocalizacaoProps> = ({ formData, updateLocalizacao }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateLocalizacao({ [name]: value }); // Apenas atualiza o estado
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Localização do Imóvel</h2>

      <div>
        <label htmlFor="pais" className="block font-bold mb-2">
          País
        </label>
        <input
          id="pais"
          name="pais"
          type="text"
          placeholder="Digite o país"
          value={formData.pais || ""}
          onChange={(e) => handleChange(e)} // Atualiza apenas os dados
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="estado" className="block font-bold mb-2">
          Estado
        </label>
        <input
          id="estado"
          name="estado"
          type="text"
          placeholder="Digite o estado"
          value={formData.estado || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="cidade" className="block font-bold mb-2">
          Cidade
        </label>
        <input
          id="cidade"
          name="cidade"
          type="text"
          placeholder="Digite a cidade"
          value={formData.cidade || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="bairro" className="block font-bold mb-2">
          Bairro
        </label>
        <input
          id="bairro"
          name="bairro"
          type="text"
          placeholder="Digite o bairro"
          value={formData.bairro || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="rua" className="block font-bold mb-2">
          Rua
        </label>
        <input
          id="rua"
          name="rua"
          type="text"
          placeholder="Digite a rua"
          value={formData.rua || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="numero" className="block font-bold mb-2">
          Número
        </label>
        <input
          id="numero"
          name="numero"
          type="text"
          placeholder="Digite o número"
          value={formData.numero || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="complemento" className="block font-bold mb-2">
          Complemento (Opcional)
        </label>
        <input
          id="complemento"
          name="complemento"
          type="text"
          placeholder="Digite o complemento"
          value={formData.complemento || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
    </div>
  );
};

export default Localizacao;
