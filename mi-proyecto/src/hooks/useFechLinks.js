import { useState, useEffect } from 'react';

const useFetchLinks = (url, options = {}) => {
  const [data, setData] = useState([]); // Para almacenar los datos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Manejo de errores

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Asigna el método por defecto como GET si no se especifica en `options`.
        const method = options.method || 'GET';

        // Configura los encabezados. Si no se especifica 'Content-Type', se asume 'application/json' por defecto
        const headers = options.headers || { 'Content-Type': 'application/json' };

        // Crea el objeto de configuración para la solicitud
        const config = {
          method,
          headers,
          // Solo se incluye el cuerpo cuando el método no es GET
          body: method !== 'GET' && options.body ? JSON.stringify(options.body) : null,
        };

        const response = await fetch(url, config);

        // Si la respuesta no es OK, lanza un error
        if (!response.ok) {
          const errorDetail = await response.text(); // Obtener el detalle de error
          throw new Error(`Error: ${response.status} - ${errorDetail}`);
        }

        // Solo intentamos parsear la respuesta como JSON si el método es GET
        const result = method === 'GET' ? await response.json() : null;
        setData(result); // Guarda los datos en el estado
      } catch (err) {
        setError(err.message); // Captura el error
      } finally {
        setLoading(false); // Termina el estado de carga
      }
    };

    fetchData();
  }, [url, JSON.stringify(options)]); // Agregar 'options' serializado para evitar el efecto de dependencias innecesarias

  return { data, loading, error };
};

export default useFetchLinks;
