type ErrorResponse = {
  errors?: { message: string }[];
  error?: string;
};

const customFetch = async (url: string, options: RequestInit) => {
  const headers = options.headers as Record<string, string>;
  // Log the URL to check if it's being formed correctly
  const fullUrl = url.startsWith('https')
    ? url
    : `https://lms-807p.onrender.com${url.startsWith('/') ? url : `/${url}`}`;


  return fetch(fullUrl, {
      ...options,
      headers: {
          ...headers,
          "Content-Type": "application/json",
      },
  });
};

export const fetchWrapper = async (url: string, options: RequestInit) => {
  try {
      const response = await customFetch(url, options);

      // If resource is not found, return a fallback (empty data) instead of throwing an error
      if (!response.ok) {
          if (response.status === 404) {
              // Return an empty object or any other fallback structure your app expects
              return {};
          }
          // For other errors, try to extract error message and throw error.
          const errorData = await response.json() as ErrorResponse;
          throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          return data;
      }

      return response;
  } catch (error) {
      throw error;
  }
};
