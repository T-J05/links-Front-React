import Nav from "./Nav"
import NavTags from "./NavTags"


function Header() {
    return (
        <header id="header" >
            <h1 className="AllLinksTitle">AllLinks</h1>
            {<Nav></Nav>}
            <h2>Etiquetas</h2>
            {<NavTags></NavTags>}
        </header>
    )
}

export default Header