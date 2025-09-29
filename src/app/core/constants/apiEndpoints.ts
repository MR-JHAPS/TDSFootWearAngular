export const API_ENDPOINTS={

    baseUrl : "http://localhost:8080/api",


    getAllClients : "/client",
    updateClientById: (id :number) => `/client/${id}`,
    deleteClientById : (id :number) => `/client/${id}`,
    getClientById : (id :number) => `/client/${id}`,
    insertNewClient : "/client/insert",
    searchClient : "/client/search"



}