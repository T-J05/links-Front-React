
const TODOS = "http://localhost:3001/api/link",//Get
      getLinksByTag = "http://localhost:3001/api/link/",//Get nombreEtiqueta
      getLinksByTitle = "http://localhost:3001/api/link/busqueda?titulo=",//Get query o sea busqueda?titulo=encodenck(loquesea)
      createLink = "http://localhost:3001/api/link", //post
      SumarVotos = "http://localhost:3001/api/link/", // pach // :id
      Etiquetas = "http://localhost:3001/api/tag", // get 
      Comentar = "http://localhost:3001/api/comment", //post
      CommentsById = "http://localhost:3001/api/comment/", //:enlaceId,
      getLinkById = "http://localhost:3001/api/link/enlaceId/"  // get /:id


export default {
    TODOS,
    getLinksByTag,
    getLinksByTitle,
    createLink,
    SumarVotos,
    Etiquetas,
    Comentar,
    CommentsById,
    getLinkById
}