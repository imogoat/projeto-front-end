const commonOptions = [
  "Rampas de Acesso",
  "Corrimãos em Escadas e Corredores",
  "Chuveiro sem Degraus (tipo walk-in)",
  "Barras de Apoio em Áreas Estratégicas",
  "Puxadores de Porta do Tipo Alavanca",
  "Pisos Antiderrapantes",
  "Caminhos Livres de Obstáculos",
];

const additionalConsiderations = [
  "Assentos de Chuveiro Retráteis",
  "Janelas de fácil operação",
  "Alarmes de Incêndio com Sinalização Visual (luzes estroboscópicas)",
  "Prateleiras e Armazenamento em Alturas Acessíveis",
  "Sinalização Clara e de Alto Contraste",
  "Áreas de Descanso",
];

const Acessibilidade = () => {
  return (
    <div id="acessibilidade" className="mt-6 space-y-2">
      <h3 className="font-bold text-2xl">Acessibilidade</h3>
      <p className="text-gray-600">
        Se você tiver solicitações de acessibilidade específicas, fale direto com a propriedade
        usando as informações contidas no e-mail de confirmação recebido após a reserva.
      </p>
      <div className="flex flex-row justify-around">
        {/* Opções Comuns */}
        <div>
          <h4 className="font-semibold text-lg">Opções Comuns</h4>
          <ul className="list-disc list-inside mt-2 space-y-2">
            {commonOptions.map((option, index) => (
              <li key={index} className="text-gray-800">
                {option}
              </li>
            ))}
          </ul>
        </div>
        {/* Considerações Adicionais */}
        <div>
          <h4 className="font-semibold text-lg">Considerações Adicionais</h4>
          <ul className="list-disc list-inside mt-2 space-y-2">
            {additionalConsiderations.map((option, index) => (
              <li key={index} className="text-gray-800">
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Acessibilidade;
