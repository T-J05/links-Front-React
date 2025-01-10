import useFetchLinks from "../hooks/useFechLinks.js";
import api from "../services/url.js";

function SectionLinks() {
  const { data, loading, error } = useFetchLinks(api.TODOS);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  let enlaces = data?.enlaces;
  console.log({ e: enlaces });
  console.log({ sd: enlaces.map((e) => e.etiquetas[0].etiqueta.nombre) });

  return (
    <>
      <h3>LINKS</h3>
      <article>
        {enlaces &&
          enlaces.map((e) => (
            <div key={e.id}> 
              <h4>{e.titulo}</h4>
              <p>Etiqueta: {e.etiquetas[0]?.etiqueta?.nombre || "Sin etiqueta"}</p>
              <p>Votos: {e.votos}</p>
              <a href={e.url}>url</a>
              <br />
              <a href={`#/details/${e.id}`} className="btn btn-primary">
                Más info
              </a>
            </div>
          ))}
      </article>
    </>
  );
}

export default SectionLinks;
