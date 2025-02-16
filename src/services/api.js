const api = async (endpoint, options = {}) => {
  const { method = "GET", body, ...restOptions } = options;

  const defaultOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_FOODICS_API_KEY}`,
    },
  };

  // Only add body for non-GET requests and if body exists
  if (method !== "GET" && body) {
    defaultOptions.body = JSON.stringify(body);
  }

  const url = `/api/${endpoint}`;
  const response = await fetch(url, {
    ...defaultOptions,
    ...restOptions,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export default api;
