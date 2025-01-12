import { useParams } from "react-router-dom";
import useFetchLinks from "../hooks/useFechLinks.js";
import api from "../services/url.js"
import Article from "./Article.jsx";
import handleFetchState from "../utils/handleFetchState.jsx";

function FilterLinksC(){
    const { id,  nombre } = useParams();
    const { data, loading, error } = useFetchLinks(`${api.getLinksByTag}${id}`);
    console.log({filterLinks:data})

    const { content, isValid } = handleFetchState({
        loading,
        error,
        data: data?.enlaces,
        loadingMessage: "Espere un momento, estamos cargando las etiquetas...",
        emptyMessage: "No se encontraron etiquetas en este momento.",
    });

    if (!isValid) {
        return content;
    }
    content.etiquetas
    return(
        <>
        <Article enlaces={content}/>
        </>
    )


}

export default FilterLinksC 