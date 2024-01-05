import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Login } from "./components/Login";
import { LoginLayout } from "./layout/LoginLayout";
import { Home } from "./components/Home";
import { HomeLayout } from "./layout/HomeLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<LoginLayout />}>
      <Route path="/" element={<Login />} />
      <Route element={<HomeLayout />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
