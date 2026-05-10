export const API_BASE_URL =
  'https://sabor-express-api-jc-ahdnfweyfrgwfqan.centralus-01.azurewebsites.net/api';

export const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return response.json();
  },
};
