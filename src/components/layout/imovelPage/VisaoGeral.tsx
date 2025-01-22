import { Property } from "@/interfaces/propertyTypes";
import Feedback from "./Feedback";

interface VisaoGeralProps {
  imovel: Property;
}

const VisaoGeral: React.FC<VisaoGeralProps> = ({ imovel }) => {
  const feedbacks = [4, 5, 3.5, 4, 4.5, 4, 5];
  const mediaAvaliacoes = 10

  // Define a cor e a descrição da média de avaliações
  const getCorEDescricao = (media: number) => {
    if (media < 2.5) return { cor: "bg-red-500", descricao: "Péssimo" };
    if (media < 6) return { cor: "bg-orange-500", descricao: "Ruim" };
    if (media < 7.5) return { cor: "bg-yellow-500", descricao: "Bom" };
    if (media < 9) return { cor: "bg-green-400", descricao: "Muito Bom" };
    return { cor: "bg-green-600", descricao: "Excelente" };
  };

  const { cor, descricao } = getCorEDescricao(mediaAvaliacoes);

  const comodidades = [
    { nome: "Espaço para crianças", icone: "child_care" },
    { nome: "Quadra", icone: "sports_tennis" },
    { nome: "Piscina", icone: "pool" },
  ];

  // Monta o endereço completo
  const enderecoCompleto = `${imovel.location} ${imovel.number}, ${imovel.bairro}, ${imovel.city}, PI, 00000-000`;

  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8" id="visao-geral">
      {/* Área principal */}
      <div className="flex-1 space-y-4">
        <h3 className="font-bold text-2xl sm:text-3xl">
          {imovel.name || "Nome do imóvel indisponível"}, {imovel.bairro || "Bairro não informado"}
        </h3>
        <Feedback feedbacks={feedbacks} />
        <p className="text-gray-600">{imovel.description || "Descrição não disponível."}</p>

        {/* Média de Avaliações */}
        <div className="flex items-center space-x-4">
          <div
            className={`w-12 h-12 flex items-center justify-center text-white font-bold rounded ${cor}`}
          >
            {mediaAvaliacoes.toFixed(1)}
          </div>
          <div>
            <p className="font-semibold text-lg">{descricao}</p>
            <p className="text-sm text-gray-600">
              Destaque nas avaliações: Boas relações entre dono e inquilinos.
            </p>
          </div>
        </div>

        {/* Comodidades */}
        <div>
          <h4 id="comodidades" className="font-bold text-lg">Comodidades</h4>
          <div className="grid grid-cols-3 gap-4 w-full mt-2">
            {comodidades.map((comodidade, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="material-icons text-[--green-light]">{comodidade.icone}</span>
                <p>{comodidade.nome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Localização */}
      <div className="w-full sm:w-1/3">
        <h3 className="font-bold text-lg mb-2">Explore a região</h3>
        <div className="relative bg-[--white] flex flex-col justify-center rounded-lg overflow-hidden">
          {/* Representação do mapa */}
          <div
            className="w-full h-[190px] sm:h-[190px]"
            style={{ backgroundColor: "var(--light-gray)" }}
          ></div>
          {/* Informações da localização */}
          <div className="py-4 px-0">
            <p className="text-sm text-gray-600">{enderecoCompleto}</p>
            <a
              href="#"
              className="text-[--green-light] hover:underline text-sm mt-1 inline-block"
            >
              Ver no mapa
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaoGeral;
