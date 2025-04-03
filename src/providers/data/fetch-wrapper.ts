type ErrorResponse = {
  errors?: { message: string }[];
  error?: string;
  message?: string;
};

// Siddhesh URL
// export const API_URL = "https://lms-o9sv.onrender.com";

//Leon Url

export const API_URL = "http://localhost:3001";  
//  export const API_URL = "https://lms-807p.onrender.com";

//Jigisha Url

// export const API_URL = "https://lms-8pd1.onrender.com"

const customFetch = async (url: string, options: RequestInit) => {
  const fullUrl = url.startsWith("https")
    ? url
    : `${API_URL}${url.startsWith("/") ? url : `/${url}`}`

  // return fetch(fullUrl, options);
  return fetch(fullUrl, {
    ...options,
    mode: 'cors',
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
    },
  });
};


export const fetchWrapper = async (url: string, options: RequestInit) => {
  try {
    const response = await customFetch(url, options);

    if (response.status === 404) {
      console.warn(`⚠️ API returned 404 for ${url}`);
      return null;
    }

    if (!response.ok) {
      let errorMessage = `HTTP error! Status: ${response.status}`;

      try {
        const errorData = (await response.json()) as ErrorResponse;
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch (jsonError) {
        console.error("Error parsing JSON error response:", jsonError);
      }

      throw new Error(errorMessage);
    }
   
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      try {
        return await response.json();
      } catch (jsonError) {
        console.warn(`⚠️ Empty JSON response from ${url}`);
        return null; 
      }
    }

    return response;
  } catch (error) {
    console.error("🚨 FetchWrapper Error:", error);
    throw error;
  }
};
