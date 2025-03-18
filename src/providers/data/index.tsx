import { DataProvider } from "@refinedev/core";
import { fetchWrapper, API_URL } from "./fetch-wrapper";

interface CustomDataProvider extends DataProvider {
  putArchive: (params: {
    resource: string;
    value: any;
  }) => Promise<{ data: any }>;
  patchUpdate: (params: {
    resource: string;
    value: any;
  }) => Promise<{ data: any }>;
}

export const dataProvider: CustomDataProvider = {
  getList: async ({ resource, pagination, filters }) => {
    const { current = 1, pageSize = 5 } = pagination ?? {};

    let url = `${resource}?_page=${current}&_limit=${pageSize}`;

    if (filters?.length) {
      const filterParams = filters
        //@ts-ignore
        .map(({ field, operator, value }) => {
          if (!field || value === undefined) return "";
          let query = `${encodeURIComponent(field)}`;
          if (operator === "eq") {
            query += `=${encodeURIComponent(value)}`;
          } else if (operator === "gte") {
            query += `_gte=${encodeURIComponent(value)}`;
          } else if (operator === "lte") {
            query += `_lte=${encodeURIComponent(value)}`;
          } else {
            return ""; // Ignore unsupported operators
          }
          return query;
        })
        .filter(Boolean)
        .join("&");

      url += `&${filterParams}`;
    }

    const response = await fetchWrapper(url, {
      method: "GET",
    });
    return {
      data: response?.data || response,
      total: response,
      pagination: response?.pagination,
    };
  },
  getOne: async ({ resource, id }) => {
    const url = `${resource}?${id}`;
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

  putArchive: async ({ resource, value }) => {
    const url = `${resource}`;
    const response = await fetchWrapper(url, {
      method: "PUT",
      body: JSON.stringify({ value }),
    });
    return {
      data: response,
    };
  },
  patchUpdate: async ({ resource, value }) => {
    const url = `${resource}`;
    const response = await fetchWrapper(url, {
      method: "PATCH",
      body: JSON.stringify({ value }),
    });
    return {
      data: response,
    };
  },
  deleteMany: async ({ resource, ids }) => {
    const url = `${resource}`;
    const response = await fetchWrapper(url, {
      method: "DELETE",
      body: JSON.stringify(ids),
    });
    return {
      data: response,
    };
  },
  // deleteOne: async ({ resource, id }) => {
  //     const url = `${resource}`;
  //     const response = await fetchWrapper(url, {
  //         method: "DELETE",
  //         body:JSON.stringify(id)
  //     });
  //     return {
  //         data: response,
  //     };
  // },
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
