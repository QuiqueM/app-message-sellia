// GlobalFetch.ts
// Generador de instancias de fetch para GET y POST

export interface FetchInstance {
  get<T>(endpoint: string, options?: RequestInit): Promise<T>;
  post<T>(endpoint: string, body: Record<string, unknown>, options?: RequestInit): Promise<T>;
}

export function createFetchInstance(baseUrl: string): FetchInstance {
  return {
    async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
      const response = await fetch(baseUrl + endpoint, { ...options, method: 'GET' });
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    },

    async post<T>(endpoint: string, body: Record<string, unknown>, options?: RequestInit): Promise<T> {
      const response = await fetch(baseUrl + endpoint, {
        ...options,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(options?.headers || {})
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    }

    //Feature: Agregar los métodos PUT, DELETE, etc. según sea necesario
  };
}
