

function handleFetchState({ loading, error, data, loadingMessage = "Cargando...", emptyMessage = "No hay datos disponibles." }) {
    if (loading) {
      return { content: <p>{loadingMessage}</p>, isValid: false };
    }
  
    if (error) {
      return { content: <p>Error: {error}, vuelve a intentarlo más tarde.</p>, isValid: false };
    }
  
    if (!data || data.length === 0) {
      return { content: <p>{emptyMessage}</p>, isValid: false };
    }
  
    return { content: data, isValid: true };
  }
  

  export default handleFetchState