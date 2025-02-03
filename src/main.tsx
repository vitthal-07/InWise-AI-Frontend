import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Layout } from "./Layout/Layout";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import { MatchPage } from "./pages/MatchPage";
import { Upload } from "./pages/Upload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/upload",
        element: <Upload />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/results",
        element: <MatchPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
