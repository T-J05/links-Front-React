import { useParams } from "react-router-dom";
import useFetchLinks from "../hooks/useFechLinks";
import { useState } from "react";
import api from "../services/url.js"

function Comments() {
  const { id } = useParams();
  const { data, loading, error, refetch } = useFetchLinks(`${api.CommentsById}${id}`);
  const [newComment, setNewComment] = useState("");

  const handleSendComment = async () => {
    if (!newComment.trim()) {
      alert("El comentario no puede estar vacío.");
      return;
    }

    try {
      const response = await fetch(`${api.Comentar}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contenido: newComment, enlaceId: id }),
      });

      if (!response.ok) {
        throw new Error(`Error al enviar el comentario: ${response.statusText}`);
      }

      setNewComment(""); // Limpiamos el input
      refetch(); // Actualizamos los comentarios
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Cargando comentarios...</p>;
  if (error) return <p>Error al cargar comentarios: {error}</p>;

  return (
    <details open>
      <summary>Comentarios</summary>

      <ul>
        {data?.comentarios?.length > 0 ? (
          data.comentarios.map((comentario, index) => (
            <li key={index}>{comentario.contenido}</li>
          ))
        ) : (
          <li>Sin comentarios</li>
        )}
      </ul>

      <div>
        <input
          type="text"
          placeholder="Escribe tu comentario..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleSendComment}>Enviar</button>
      </div>
    </details>
  );
}

export default Comments;
