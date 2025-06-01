import { router } from './app/router/routes';
import './styles/App.css'
import {
  RouterProvider,
} from "react-router";


function App() {
  
  return  <RouterProvider router={router} />
}

export default App
