import { Link } from "react-router-dom";


function Article({enlaces}){
    console.log(enlaces)
   console.log({ cd: enlaces.map((e) => ( e.etiquetas[0]?.nombre))})
    return(
    <>
    <h3>LINKS</h3>
    <article>
      {enlaces &&
        enlaces.map((e) => (
          <div key={e.id}> 
            <h4>{e.titulo}</h4>
            <p>Etiqueta: {e.etiquetas[0]?.etiqueta?.nombre || e.etiquetas[0]?.nombre || "Sin etiqueta"}</p>
            <p>Votos: {e.votos}</p>
            <a href={e.url}>url</a>
            <br />
            <Link to={`/details/${e.id}`}>Ver detalles</Link>
          </div>
        ))}
    </article>
  </>)
}
export default Article