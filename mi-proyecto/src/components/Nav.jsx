import { Link } from "react-router-dom";

function Nav(){
    return(
        <ul>
            <li title="Pagina de Inico"> <Link to="/">Inicio</Link> </li>
            <li title="Formulario de creacion de enlace"><Link to="/crearEnlace">Crear Enlace</Link></li>
        </ul>
    )
}

export default Nav