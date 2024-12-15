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


// export const getImageImovel = async ()