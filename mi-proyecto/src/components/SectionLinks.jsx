import useFetchLinks from "../hooks/useFechLinks.js";
import api from "../services/url.js";
import Article from "./Article";
import handleFetchState from "../utils/handleFetchState"; // Ruta del archivo donde definiste la función

function SectionLinks() {
  const { data, loading, error } = useFetchLinks(api.TODOS);


  const { content, isValid } = handleFetchState({
    loading,
    error,
    data: data?.enlaces,
    loadingMessage: "Espere un momento, estamos cargando los enlaces...",
    emptyMessage: "No se encontraron enlaces en este momento."
  });
  

  if (!isValid) {
    return content; 
  }

  return <Article enlaces={content} />; 
}

export default SectionLinks;
