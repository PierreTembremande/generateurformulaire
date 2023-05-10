import './App.css';
import Caracteristique from "./routes/CaracteristiquesFormulaire";
import Formulaire from "./routes/Formulaire";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Caracteristique />
  }, {
    path: "/form",
    element: <Formulaire />
  }
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
