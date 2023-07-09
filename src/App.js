import Translate from "./components/Translate"
import {Route,Routes} from "react-router-dom"
function App() {
  return <Routes>
  <Route exact path='/' element={<Translate />} />
</Routes>;
}

export default App;
