import useFetchLinks  from "../hooks/useFechLinks.js"
import api from "../services/url.js"


function NavTags() {
  const { data, loading, error } = useFetchLinks(api.Etiquetas);
  let etiquetas = data?.etiquetas;

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  
  return (
    <ul>
      {etiquetas &&
        etiquetas.map((etiqueta) => (
          <li key={etiqueta.id}>
            <button itemID="botton" className="tag-button">
              {etiqueta.nombre}
            </button>
          </li>
        ))}
    </ul>
  );
}

export default NavTags;
