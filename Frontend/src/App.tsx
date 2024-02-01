import "./App.css";
import "./assets/styles/style.scss";
import "normalize.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/Route";
function App() {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;
