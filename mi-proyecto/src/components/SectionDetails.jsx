import { useState } from "react";
import useFetchLinks from "../hooks/useFechLinks.js";
import api from "../services/url.js";
import handleFetchState from "../utils/handleFetchState";
import { useParams } from "react-router-dom";
import React from "react";


function SectionDetails() {
  const { id } = useParams();
  const { data, loading, error } = useFetchLinks(`${api.getLinkById}${id}`);

  const { content, isValid } = handleFetchState({
    loading,
    error,
    data: data?.enlace,
    loadingMessage: "Espere un momento, estamos cargando los detalles de enlace...",
    emptyMessage: "No se encontró el enlace en este momento."
  });

  // Siempre inicializamos el estado, incluso si `!isValid`
  const [votes, setVotes] = useState(content?.votos || 0);

  // Actualizamos los votos en el estado cuando el contenido cambia
  React.useEffect(() => {
    if (content?.votos !== undefined) {
      setVotes(content.votos);
    }
  }, [content]);

  // Si no es válido, devolvemos el contenido temprano
  if (!isValid) {
    return content;
  }

  const handleVote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api.SumarVotos}${id}`, {
        method: "PATCH",
      });

      if (response.ok) {
        const res = await response.json();
        setVotes(res.enlace.votos); // Actualizamos los votos en el estado
      } else {
        console.error("Error al votar:", response);
      }
    } catch (error) {
      console.error("Ocurrió un error al votar:", error);
    }
  };

  const etiquetasHtml = content.etiquetas?.length > 0
    ? content.etiquetas.map((etiquetaObj) => etiquetaObj.nombre).join(", ")
    : "Sin etiquetas";

  return (
    <>
      <h2>{content.titulo}</h2>
      <details open>
        <summary>Información sobre el enlace</summary>
        <p>{content.descripcion}</p>
        <p>
          <strong>Votos:</strong> <span className="votos-class">{votes}</span>
        </p>
        <p>
          <strong>Etiqueta:</strong> {etiquetasHtml}
        </p>
      </details>
      <button onClick={handleVote}>Votar</button>
    </>
  );
}

export default SectionDetails;
