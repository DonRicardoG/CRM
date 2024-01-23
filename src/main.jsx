import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./Components/Layout";
import NewClient, { action as newClientAction } from "./Pages/NewClient";
import Index, { loader as clientsLoader } from "./Pages/Index";
import ErrorPage from "./Components/ErrorPage";
import EditClient, {
  action,
  action as editClientAction,
  loader as editClientLoader,
} from "./Pages/EditClient";
import { action as destroyClient } from "./Components/Client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clientsLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/clients/new",
        element: <NewClient />,
        action: newClientAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/clients/:clientId/edit",
        element: <EditClient />,
        action: editClientAction,
        loader: editClientLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/clients/:clientId/destroy",
        action: destroyClient,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
