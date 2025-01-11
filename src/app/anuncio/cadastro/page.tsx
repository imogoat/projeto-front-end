"use client";

import React, { useState } from "react";
import InformacoesBasicas from "@/components/formSections/InformacoesBasicas";
import FotosImovel from "@/components/formSections/FotosImovel";
import DescricaoDetalhada from "@/components/formSections/DescricaoDetalhada";
import RegrasRestricoes from "@/components/formSections/RegrasRestricoes";
import InformacoesComerciais from "@/components/formSections/InformacoesComerciais";
import TarifasAdicionais from "@/components/formSections/TarifasAdicionais";
import InformacoesProprietario from "@/components/formSections/InformacoesProprietario";
import InformacoesRegulatorias from "@/components/formSections/InformacoesRegulatorias";
import Acessibilidade from "@/components/formSections/Acessibilidade";
import PoliticasReservas from "@/components/formSections/PoliticasReservas";
import Localizacao from "@/components/formSections/Localizacao";
import ValidacaoFinal from "@/components/formSections/ValidacaoFinal";

import { criarImovel, adicionarImagens } from "@/api/imovelService"; // Função para enviar o formulário
import { useAuth } from "@/context/AuthContext";

import apiClient from "@/api/apiClient";
import { getLastCreatedImmobileId } from "@/api/imovelService";


interface FormData {
  nome: string;
  tipo: string;
  quartos: number;
  banheiros: number;
  garagem: boolean;
  metragem: number;
  imagens: File[];
  descricao: string;
  maxHospedes: number;
  permiteFestas: boolean;
  aceitaAnimais: boolean;
  permiteFumar: boolean;
  outrasRegras: string;
  status: string;
  valor: number;
  frequenciaPagamento: string;
  tarifaLimpeza: number;
  outrasTarifas: string;
  nomeProprietario: string;
  contato: string;
  cpfCnpj: string;
  regulacoesLocais: string;
  acessibilidade: string[];
  politicaCancelamento: string;
  pais: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento: string;
  depositoSeguranca: string;
  valorDeposito: number;
  taxaAnimal: string;
  taxaAnimalValor: number;
  politicaFumantes: string;
  politicaFestas: string;
  taxaFestas: string;
  outrasPoliticas: string;
}

const CadastroImovel = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { user, token } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    tipo: "",
    quartos: 0,
    banheiros: 0,
    garagem: false,
    metragem: 0,
    imagens: [],
    descricao: "",
    maxHospedes: 0,
    permiteFestas: false,
    aceitaAnimais: false,
    permiteFumar: false,
    outrasRegras: "",
    status: "",
    valor: 0,
    frequenciaPagamento: "",
    tarifaLimpeza: 0,
    outrasTarifas: "",
    nomeProprietario: "",
    contato: "",
    cpfCnpj: "",
    regulacoesLocais: "",
    acessibilidade: [],
    politicaCancelamento: "",
    outrasPoliticas: "",
    pais: "",
    estado: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
    depositoSeguranca: "",
    valorDeposito: 0,
    taxaAnimal: "",
    taxaAnimalValor: 0,
    politicaFumantes: "",
    politicaFestas: "",
    taxaFestas: "",
  });
  
  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const totalSteps = 13;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);


  const [camposInvalidos, setCamposInvalidos] = useState<
    { etapa: number; mensagem: string }[]
  >([]);

  const camposObrigatoriosPorEtapa = {
    1: ["nome", "tipo", "quartos", "banheiros", "metragem"],
    2: ["imagens"],
    3: ["pais", "estado", "cidade", "bairro", "rua", "numero"],
    4: ["descricao"],
    6: ["valor"],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
  };

  const nextStep = () => {
    if (currentStep === totalSteps - 2) {
      validarCampos();
    } else if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const validarCampos = () => {
    const etapasFaltantes: { etapa: number; mensagem: string }[] = [];

    Object.entries(camposObrigatoriosPorEtapa).forEach(([etapa, campos]) => {
      const etapaTemErro = campos.some((campo) => {
        if (campo === "imagens") {
          // Verifica o comprimento da lista de imagens
          return formData.imagens.length === 0;
        }
        return !formData[campo as keyof typeof formData];
      });

      if (etapaTemErro) {
        etapasFaltantes.push({
          etapa: parseInt(etapa, 10),
          mensagem: `Preencha os campos obrigatórios da etapa ${etapa}.`,
        });
      }
    });

    setCamposInvalidos(etapasFaltantes);

    if (etapasFaltantes.length === 0) {
      setCurrentStep(totalSteps); // Vai para o step de validação final
    } else {
      setCurrentStep(totalSteps - 1);
      console.log("Dados completos:", formData);
    }
  };

  const voltarParaEtapa = (etapa: number) => {
    setCurrentStep(etapa);
  };

  const handleEnviarFormulario = async () => {
    setIsSubmitting(true);
  
    try {
      // Verifica e atualiza o role do usuário para "owner", se necessário
      if (user?.role !== "owner") {
        console.log("Atualizando o usuário para 'owner'...");
        await apiClient.put(`/alter-user/${user?.id}`, { role: "owner" });
        console.log("Usuário atualizado para 'owner'.");
      }
  
      // Preparar os dados do payload para criar o imóvel
      const payload = {
        name: formData.nome,
        number: formData.numero,
        type: formData.tipo,
        location: formData.rua,
        bairro: formData.bairro,
        city: formData.cidade,
        reference: formData.complemento || "",
        value: formData.valor,
        numberOfBedrooms: formData.quartos,
        numberOfBathrooms: formData.banheiros,
        garagem: formData.garagem,
        description: formData.descricao,
        proprietaryId: user?.id, 
      };

      const arquivosValidos = formData.imagens.every((imagem) => {
        const extensao = imagem.name.split(".").pop()?.toLowerCase();
        return ["jpg", "jpeg", "png", "gif"].includes(extensao || "");
      });
      
      if (!arquivosValidos) {
        throw new Error("Arquivos inválidos. Somente imagens são permitidas.");
      } else {
        // Etapa 1: Criar o imóvel
        const response = await criarImovel(payload, token);
        let currentId = response?.id;
      
        if (!currentId) {
          console.warn("API não retornou o ID do imóvel. Buscando o último ID criado...");
          currentId = await getLastCreatedImmobileId();
          if (!currentId) {
            throw new Error("Não foi possível obter o ID do imóvel criado.");
          }
          console.log("Último ID obtido:", currentId);
        } else {
          console.log("ID retornado pela API:", currentId);
        }
      
        // Adiciona imagens ao imóvel
        if (formData.imagens.length > 0 && currentId) {
          console.log("Usando ID para adicionar imagens: ", currentId);
          await adicionarImagens(currentId, formData.imagens, token);
        }
      
    
        // Atualiza o estado para sucesso
        setSubmissionSuccess(true);
        setCurrentStep(totalSteps + 1); // Passa para o step final de confirmação
      }
  
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      alert("Ocorreu um erro ao cadastrar o imóvel. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Cadastro de Imóveis</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        {currentStep === 1 && (
          <InformacoesBasicas formData={formData} updateBasicInfo={updateFormData} />
        )}
        {currentStep === 2 && (
          <FotosImovel
            initialData={formData.imagens}
            updateImages={(images) => updateFormData({ imagens: images })}
          />
        )}
        {currentStep === 3 && (
          <Localizacao
            formData={formData}
            updateLocalizacao={updateFormData}
          />
        )}
        {currentStep === 4 && (
          <DescricaoDetalhada formData={formData} updateDescricao={updateFormData} />
        )}
        {currentStep === 5 && (
          <RegrasRestricoes formData={formData} updateRegras={updateFormData} />
        )}
        {currentStep === 6 && (
          <InformacoesComerciais formData={formData} updateComerciais={updateFormData} />
        )}
        {currentStep === 7 && ( 
          <TarifasAdicionais formData={formData} updateTarifas={updateFormData} />
        )}
        {currentStep === 8 && (
          <InformacoesProprietario formData={formData} updateProprietario={updateFormData} />
        )}
        {currentStep === 9 && (
          <InformacoesRegulatorias formData={formData} updateRegulatorias={updateFormData} />
        )}
        {currentStep === 10 && (
          <Acessibilidade formData={formData} updateAcessibilidade={updateFormData} />
        )}
        {currentStep === 11 && (
          <PoliticasReservas formData={formData} updatePoliticas={updateFormData} />
        )}
        {currentStep === totalSteps - 1 && (
          <ValidacaoFinal
            camposInvalidos={camposInvalidos}
            voltarParaEtapa={voltarParaEtapa}
          />
        )}
        {currentStep === totalSteps && (
          <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Confirme e envie o formulário</h2>
          <button
            onClick={handleEnviarFormulario}
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-lg text-white ${
              isSubmitting ? "bg-gray-400" : "bg-[--green-light] hover:bg-[--green-medium]"
            }`}
          >
            {isSubmitting ? "Enviando..." : "Confirmar e Enviar"}
          </button>
        </div>
      )}
      {currentStep === totalSteps + 1 && submissionSuccess && (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-500 mb-4">Cadastro realizado com sucesso!</h2>
          <p className="text-lg text-gray-700">Seu imóvel agora está ativo na plataforma.</p>
        </div>
      )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={previousStep}
          disabled={currentStep === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={nextStep}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default CadastroImovel;
