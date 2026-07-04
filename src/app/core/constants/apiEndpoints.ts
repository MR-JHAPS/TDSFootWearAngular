export const API_ENDPOINTS={

    baseUrl : "http://localhost:8080/api",


    getAllClients : "/client",
    getAllClientsMonthly : "/client/monthly",
    updateClientById: (id :number) => `/client/${id}`,
    deleteClientById : (id :number) => `/client/${id}`,
    getClientById : (id :number) => `/client/${id}`,
    insertNewClient : "/client/insert",
    searchClient : "/client/search",
    downloadFile : "/client/download/clients",


    getAllKharids : "/kharid",
    getAllKharidMonthly : "/kharid/monthly",
    updateKharidById: (id :number) => `/kharid/${id}`,
    deleteKharidById : (id :number) => `/kharid/${id}`,
    getKharidById : (id :number) => `/kharid/${id}`,
    insertNewKharid : "/kharid/insert",
    searchKharid : "/kharid/search",
    downloadFileKharid : "/kharid/download/kharids",





}