// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Personajes } from "./pages/personajes";
import { Planetas } from "./pages/planetas";
import { Vehiculos } from "./pages/vehiculos";
import { PersonajeDetalle } from "./pages/detalles.jsx";
import { PlanetaDetalle } from "./pages/PlanetaDetalles.jsx";
import { VehiculoDetalle } from "./pages/VehiculosDetalles.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/" element={<Home />} />
      <Route path="/personajes" element={<Personajes />} />
      <Route path="/personajes/:uid" element={<PersonajeDetalle />} />
      <Route path="/vehiculos" element={<Vehiculos />} />
      <Route path="/vehiculos/:uid" element={<VehiculoDetalle />} />
      <Route path="/planetas" element={<Planetas />} />
      <Route path="/planetas/:uid" element={<PlanetaDetalle />} />

      <Route path="/single/:theId" element={<Single />} />  {/* Dynamic route for single items */}
      <Route path="/demo" element={<Demo />} />
    </Route>
  )
);