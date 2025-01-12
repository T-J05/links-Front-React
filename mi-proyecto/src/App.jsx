import Home from "./pages/Home"
import CreateLinks from "./pages/CreateLinks";
import Details from "./pages/Details";
import { Routes, Route } from 'react-router-dom';
import FilterLinks from "./pages/FilterLinks";


function App() {
  
  return (
    <>
   <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crearEnlace" element={<CreateLinks/>} />
        <Route path="/details/:id" element={<Details/>} />
        <Route path="/filterLinks/:id/:nombre" element={<FilterLinks />} />
   </Routes>
  </>
  )
}
export default App
