const API_URL = "http://localhost:8080";

export async function apiRequest(endpoint, method = "GET", body = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  const config = {
    method,
    headers,
  };

  if (body && method !== "GET") {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Error en la petición");
    }

    return data;
  } catch (error) {
    throw error;
  }
}