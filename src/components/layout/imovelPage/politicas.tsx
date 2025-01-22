const selectedPolicies = {
    depositoSeguranca: { tipo: "fixo", valor: 500 },
    taxaAnimal: { tipo: "com Taxa", valor: 150 },
    politicaFumantes: "áreas Designadas",
    outrasPoliticas: "Horário de silêncio das 22h às 6h.",
  };
  
  const PoliticasTaxasReservas = () => {
    return (
      <div id="politicas-taxas-reservas" className="mt-8 space-y-2">
        <h3 className="font-bold text-2xl">Políticas de Taxas e Reservas</h3>
  
        {/* Depósito de Segurança */}
        {selectedPolicies.depositoSeguranca && (
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 space-x-3 sm:space-y-0">
            <p className="font-semibold">Depósito de Segurança:</p>
            <p>
              {selectedPolicies.depositoSeguranca.tipo === "fixo"
                ? `R$ ${selectedPolicies.depositoSeguranca.valor},00`
                : selectedPolicies.depositoSeguranca.tipo}
            </p>
          </div>
        )}
  
        {/* Taxa para Animais */}
        {selectedPolicies.taxaAnimal && (
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 space-x-3 sm:space-y-0">
            <p className="font-semibold">Aceitação de Animais:</p>
            <p>
              {selectedPolicies.taxaAnimal.tipo === "com Taxa"
                ? `Permitido com taxa de R$ ${selectedPolicies.taxaAnimal.valor},00`
                : selectedPolicies.taxaAnimal.tipo}
            </p>
          </div>
        )}
  
        {/* Política para Fumantes */}
        {selectedPolicies.politicaFumantes && (
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 space-x-3 sm:space-y-0">
            <p className="font-semibold">Política para Fumantes:</p>
            <p>{selectedPolicies.politicaFumantes}</p>
          </div>
        )}
  
        {/* Outras Políticas */}
        {selectedPolicies.outrasPoliticas && (
          <div className="space-y-2">
            <p className="font-semibold">Outras Políticas:</p>
            <p className="text-gray-600">{selectedPolicies.outrasPoliticas}</p>
          </div>
        )}
      </div>
    );
  };
  
  export default PoliticasTaxasReservas;
  