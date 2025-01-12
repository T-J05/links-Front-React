import FormCreateLink from "../components/FormCreateLink"
import Nav from "../components/Nav"


function CreateLinks(){
    return(<>
        <h1 className="AllLinksTitle">AllLinks</h1>
        <Nav/>
        <FormCreateLink />
        </>
    )
}

export default  CreateLinks