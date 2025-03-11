import { DataProvider} from "@refinedev/core";
import { fetchWrapper } from "./fetch-wrapper";

// Siddhesh URL 
// export const API_URL = "https://lms-o9sv.onrender.com"; 

//Leon Url
export const API_URL = "https://lms-807p.onrender.com"

//Jigisha Url

// export const API_URL = " "

export const dataProvider: DataProvider = {
    getList: async ({ resource, pagination, filters, sorters, meta }) => {
        const url = `${resource}`;
        const response = await fetchWrapper(url, {
            method: "GET",
        });
        return {
            data: response,
            total: response.length,
        };
    },
    getOne: async ({ resource, id }) => {
        const url = `${resource}?${id}`
        const response = await fetchWrapper(url, {
            method: "GET",
        });
        return {
            data: response,
        };
    },

    create: async ({ resource, variables }) => {
        const url = `${resource}`;
        const response = await fetchWrapper(url, {
            method: "POST",
            body: JSON.stringify(variables),
        });
        return {
            data: response,
        };
    },

    update: async ({ resource, id, variables }) => {
        const url = `${resource}/${id}`;
        const response = await fetchWrapper(url, {
            method: "PUT",
            body: JSON.stringify(variables),
        });
        return {
            data: response,
        };
    },
    deleteMany:async ({resource, ids}) =>{
        const url = `${resource}`;
        const response = await fetchWrapper(url,{
            method:"DELETE",
            body:JSON.stringify(ids)
        });
        return {
            data:response,
        }
    },
    deleteOne: async ({ resource, id }) => {
        const url = `${resource}/${id}`;
        const response = await fetchWrapper(url, {
            method: "DELETE",
        });
        return {
            data: response,
        };
    },


    getApiUrl: () => API_URL,
    
   
};