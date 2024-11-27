import apiClient from './apiClient';

const getUser = (userId) => {
    return apiClient.get(`/user/${userId}`);
};

// const createUser = (userData) => {
//     return apiClient.post('/users', userData);
// };

// Exporte mais funções conforme necessário
export { getUser };