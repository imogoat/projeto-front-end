import apiClient from "./apiClient"


export const fetchPropertyById = async (id) => {
    try {
        const response = await apiClient.get(`/immobile/${id}`);
        return response.data;  // Retorna os dados do imóvel
    } catch (error) {
        console.error("Erro ao buscar o imóvel pelo ID:", error);
        throw error; // Lança o erro para ser tratado pelo componente
    }
};


// Calcula a distância de Levenshtein entre duas strings
const levenshteinDistance = (a, b) => {
    const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
        Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
    );

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            matrix[i][j] =
                a[i - 1] === b[j - 1]
                    ? matrix[i - 1][j - 1]
                    : Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]) + 1;
        }
    }

    return matrix[a.length][b.length];
};



// Normaliza uma string (remove acentos e espaços desnecessários)
const normalizeString = (str) =>
    str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove acentos
        .replace(/\s+/g, ""); // Remove espaços em branco

// Verifica se a string de entrada é semelhante a uma parte da string alvo
const isSimilarSubstring = (input, target, threshold = 0.8) => {
    const normalizedInput = normalizeString(input);
    const normalizedTarget = normalizeString(target);

    // Verifica todas as substrings do alvo com o mesmo tamanho do input
    for (let i = 0; i <= normalizedTarget.length - normalizedInput.length; i++) {
        const substring = normalizedTarget.slice(i, i + normalizedInput.length);
        const distance = levenshteinDistance(normalizedInput, substring);

        const similarity = 1 - distance / normalizedInput.length;
        if (similarity >= threshold) {
            return true;
        }
    }

    return false;
};



export const fetchPropertyByBairro = async (bairro, tipo) => {
    try {
        // Busca todos os imóveis da API
        const response = await apiClient.get(`/immobile`);

        if (!response.data) {
            throw new Error("Nenhum dado encontrado na resposta da API.");
        }

        // Filtra pelo bairro, verificando similaridade de substrings
        let filteredProperties = response.data.filter(
            (property) =>
                property.bairro &&
                isSimilarSubstring(bairro, property.bairro) // Verifica se "bairro" do usuário está na string do BD
        );

        // Filtra pelo tipo, se fornecido
        if (tipo) {
            filteredProperties = filteredProperties.filter(
                (property) =>
                    property.type &&
                    isSimilarSubstring(tipo, property.type) // Verifica similaridade para o tipo também
            );
        }

        return filteredProperties; // Retorna os imóveis filtrados
    } catch (error) {
        console.error("Erro ao buscar os imóveis:", error);
        throw error; // Propaga o erro para ser tratado pelo chamador
    }
};




// export const getImageImovel = async ()