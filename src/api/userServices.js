import apiClient from "./apiClient"

export const loginUser = async (email, password) => {
    try {

      const response = await apiClient.post("/login", {
        email,
        password,
      });
      return response.data; // Retorna os dados da API
    } catch (error) {
        console.error("Erro ao fazer login:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || error.message); // Lança o erro tratado
    }
};


export const getUser = async (id) => {
    try{
        const response = await apiClient.get(`/user/${id}`);
        return response.data
    } catch (error) {
        console.error("Erro ao obter os dados do usuário:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Erro ao buscar dados do usuário");
    }
}