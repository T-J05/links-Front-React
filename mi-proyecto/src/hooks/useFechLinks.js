import { useState, useEffect, useCallback } from 'react';

const useFetchLinks = (url, options = {}, autoFetch = true) => {
  const [data, setData] = useState(null); // Para almacenar los datos
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Manejo de errores

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const method = options.method || 'GET';
      const headers = options.headers || { 'Content-Type': 'application/json' };
      const config = {
        method,
        headers,
        body: method !== 'GET' && options.body ? JSON.stringify(options.body) : null,
      };

      const response = await fetch(url, config);

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(`Error: ${response.status} - ${errorDetail}`);
      }

      const result = method === 'GET' ? await response.json() : null;
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);

  return { data, loading, error, refetch: fetchData }; // Retornamos `refetch` para llamadas manuales
};

export default useFetchLinks;
