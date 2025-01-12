import api from "../services/url";
import useFetchLinks from "../hooks/useFechLinks.js";
import handleFetchState from "../utils/handleFetchState.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormCreateLink() {
  const navigate = useNavigate();
  const { data, loading, error } = useFetchLinks(api.Etiquetas);

  const [formData, setFormData] = useState({
    url: "",
    titulo: "",
    descripcion: "",
    etiquetas: { nombre: "" },
  });

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

  let etiquetas = Array.isArray(data?.etiquetas) ? data.etiquetas : [];

  const handleForm = async (e) => {
    e.preventDefault(); // Corregido
    const url = api.createLink;
    try {
      const fetchData = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Estructura directa
      });
      const response = await fetchData.json();
      if (fetchData.ok) {
        console.log(response);
        navigate("/"); // Redirige al home
      } else {
        console.error("Error en la solicitud:", response);
      }
    } catch (err) {
      console.error("Error de red:", err);
    }
  };

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "select-one" ? { nombre: value } : value,
    }));
  };

  return (
    <>
      <div>
        <form id="formCreateLink" onSubmit={handleForm}>
          <label htmlFor="URL">Url</label>
          <input
            type="url"
            id="URL"
            name="url"
            placeholder="Ej: https://www.google.com"
            required
            value={formData.url}
            onChange={handleChange}
          />
          <br />

          <label htmlFor="tituloo">Titulo</label>
          <input
            type="text"
            id="tituloo"
            name="titulo"
            placeholder="Ej: Enlace a Google"
            required
            maxLength="30"
            value={formData.titulo}
            onChange={handleChange}
          />
          <br />

          <label htmlFor="descripcionn">Descripción</label>
          <textarea
            id="descripcionn"
            name="descripcion"
            required
            maxLength="150"
            placeholder="Ej: Página principal de búsqueda de Google"
            rows={4}
            value={formData.descripcion}
            onChange={handleChange}
          ></textarea>
          <br />

          <label htmlFor="tagSelect">Etiqueta</label>
          <select
            id="tagSelect"
            name="etiquetas"
            required
            value={formData.etiquetas.nombre}
            onChange={handleChange}
          >
            <option value="" disabled>
              Selecciona una etiqueta
            </option>
            {etiquetas.map((etiqueta) => (
              <option key={etiqueta.id} value={etiqueta.nombre}>
                {etiqueta.nombre}
              </option>
            ))}
          </select>
          <br />
          <button type="submit">Guardar enlace</button>
        </form>
      </div>
    </>
  );
}

export default FormCreateLink;
