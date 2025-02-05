import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Layout } from "./Layout/Layout";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import { MatchFilesPage } from "./pages/MatchFilesPage";
import { Upload } from "./pages/Upload";
import { MatchPage } from "./pages/MatchPage";

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
        element: <MatchFilesPage />,
      },
      {
        path: "/match/:matchId",
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
