import { Link } from "react-router-dom";
import useFetchLinks from "../hooks/useFechLinks.js";
import api from "../services/url.js";
import handleFetchState from "../utils/handleFetchState.jsx";

function NavTags() {
  const { data, loading, error } = useFetchLinks(api.Etiquetas);

  const { content, isValid } = handleFetchState({
    loading,
    error,
    data: data?.etiquetas,
    loadingMessage: "Espere un momento, estamos cargando las etiquetas...",
    emptyMessage: "No se encontraron etiquetas en este momento.",
  });

  if (!isValid) {
    return content;
  }
  const etiquetas = content;

  return (
    <ul>
      {etiquetas &&
        etiquetas.map((etiqueta) => (
          <li key={etiqueta.id}>
            <Link to={`/filterLinks/${etiqueta.id}/${etiqueta.nombre}`}>
              <button className="tag-button">{etiqueta.nombre}</button>
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default NavTags;
