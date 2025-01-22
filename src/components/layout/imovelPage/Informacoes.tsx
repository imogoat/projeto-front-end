import { Property } from "@/interfaces/propertyTypes";

interface InformacoesProps {
  imovel: Property;
}

const Informacoes: React.FC<InformacoesProps> = ({ imovel }) => {
  return (
    <div id="informacoes" className="space-y-4">
      <h3 className="font-semibold text-xl sm:text-2xl">Informações sobre a propriedade</h3>
      <h2 className="font-semibold text-lg sm:text-xl">Cômodos</h2>
      {imovel.numberOfBedrooms > 0 ? (
        <div className="flex items-center space-x-2">
          <span className="material-icons">bed</span>
          <p>{imovel.numberOfBedrooms} quartos</p>
        </div>
      ) : (
        <p>Quartos não disponíveis.</p>
      )}
      {imovel.numberOfBathrooms > 0 ? (
        <div className="flex items-center space-x-2">
          <span className="material-icons">shower</span>
          <p>{imovel.numberOfBathrooms} banheiros</p>
        </div>
      ) : (
        <p>Banheiros não disponíveis.</p>
      )}
    </div>
  );
};

export default Informacoes;
